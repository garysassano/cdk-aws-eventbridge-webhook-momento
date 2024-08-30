import {
  SecretValue,
  RemovalPolicy,
  Stack,
  StackProps,
  Duration,
} from "aws-cdk-lib";
import {
  AttributeType,
  StreamViewType,
  TableV2,
} from "aws-cdk-lib/aws-dynamodb";
import {
  Connection,
  Authorization,
  ApiDestination,
  HttpMethod,
} from "aws-cdk-lib/aws-events";
import { Construct } from "constructs";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";
import {
  Pipe,
  FilterPattern,
  DynamicInput,
  input,
} from "aws-cdk-lib/aws-pipes-alpha";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as logs from "aws-cdk-lib/aws-logs";

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    // Read MOMENTO_API_KEY and MOMENTO_API_ENDPOINT from environment variables
    const momentoApiKey = process.env.MOMENTO_API_KEY;
    const momentoApiEndpoint = process.env.MOMENTO_API_ENDPOINT;
    if (!momentoApiKey || !momentoApiEndpoint) {
      throw new Error(
        "Required environment variables 'MOMENTO_API_KEY' or 'MOMENTO_API_ENDPOINT' are missing or undefined",
      );
    }

    const momentoApiKeySecret = new Secret(this, "MomentoApiKeySecret", {
      secretName: "momento-api-key-secret",
      secretStringValue: SecretValue.unsafePlainText(momentoApiKey),
    });

    /*
     * DYNAMODB
     */

    new TableV2(this, "WeatherStatsTable", {
      tableName: "weather-stats-table",
      partitionKey: { name: "Location", type: AttributeType.STRING },
      dynamoStream: StreamViewType.NEW_AND_OLD_IMAGES,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    /*
     * EVENTBRIDGE
     */

    const momentoConnection = new Connection(this, "MomentoConnection", {
      connectionName: "momento-connection",
      authorization: Authorization.apiKey(
        "Momento API Key",
        SecretValue.secretsManager(momentoApiKeySecret.secretName),
      ),
    });

    new ApiDestination(this, "MomentoCachePutApiDestination", {
      apiDestinationName: "momento-cache-put-api-destination",
      connection: momentoConnection,
      endpoint: `${momentoApiEndpoint}/cache/*`,
      httpMethod: HttpMethod.PUT,
    });

    new ApiDestination(this, "MomentoCacheDeleteApiDestination", {
      apiDestinationName: "momento-cache-delete-api-destination",
      connection: momentoConnection,
      endpoint: `${momentoApiEndpoint}/cache/*`,
      httpMethod: HttpMethod.DELETE,
    });

    new ApiDestination(this, "MomentoTopicsPostApiDestination", {
      apiDestinationName: "momento-topics-post-api-destination",
      connection: momentoConnection,
      endpoint: `${momentoApiEndpoint}/topics/*/*`,
      httpMethod: HttpMethod.POST,
    });

    // Dead Letter Queue
    const deadLetterQueue = new sqs.Queue(this, "DeadLetterQueue", {
      queueName: "weather-stats-demo-dlq",
      retentionPeriod: Duration.days(14),
    });

    // Log Group
    const logGroup = new logs.LogGroup(this, "PipeLogsGroup", {
      logGroupName: "/aws/vendedlogs/pipes/weather-stats-demo-logs",
      retention: logs.RetentionDays.TWO_WEEKS,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    // IAM Role
    const role = new iam.Role(
      this,
      "AmazonEventBridgePipeWeatherStatsDemoEventToMomentoCache",
      {
        roleName: "AmazonEventBridgePipeWeatherStatsDemoEventToMomentoCache",
        assumedBy: new iam.ServicePrincipal("pipes.amazonaws.com"),
      },
    );

    // Add necessary permissions to the role
    weatherStatsTable.grantStreamRead(role);
    deadLetterQueue.grantSendMessages(role);
    logGroup.grantWrite(role);
    cachePutApiDestination.grantPutEvents(role);
    cacheDeleteApiDestination.grantPutEvents(role);
    topicPublishApiDestination.grantPutEvents(role);

    // Cache Put Pipe
    new Pipe(this, "WeatherStatsDemoCachePutPipe", {
      pipeName: "weather-stats-demo-cache-put-pipe",
      source: weatherStatsTable,
      sourceParameters: {
        dynamoDbStreamParameters: {
          startingPosition: "LATEST",
          batchSize: 1,
          maximumRetryAttempts: 0,
          deadLetterConfig: {
            queue: deadLetterQueue,
          },
        },
        filterCriteria: {
          filters: [
            FilterPattern.fromObject({ eventName: ["INSERT", "MODIFY"] }),
          ],
        },
      },
      target: cachePutApiDestination,
      targetParameters: {
        inputTemplate: JSON.stringify({
          Location: DynamicInput.fromEventPath("$.dynamodb.Keys.Location.S"),
          MaxTemp: DynamicInput.fromEventPath("$.dynamodb.NewImage.MaxTemp.N"),
          MinTemp: DynamicInput.fromEventPath("$.dynamodb.NewImage.MinTemp.N"),
          ChancesOfPrecipitation: DynamicInput.fromEventPath(
            "$.dynamodb.NewImage.ChancesOfPrecipitation.N",
          ),
        }),
        httpParameters: {
          pathParameterValues: [cacheName],
          queryStringParameters: {
            key: DynamicInput.fromEventPath("$.dynamodb.Keys.Location.S"),
            ttl_seconds: DynamicInput.fromEventPath(
              "$.dynamodb.NewImage.TTL.N",
            ),
          },
        },
      },
      role,
      logConfiguration: {
        level: "INFO",
        cloudwatchLogsLogDestination: logGroup,
        includeExecutionData: ["ALL"],
      },
    });

    // Topic Publish Pipe
    new Pipe(this, "WeatherStatsDemoTopicPublishPipe", {
      pipeName: "weather-stats-demo-topic-publish-pipe",
      source: weatherStatsTable,
      sourceParameters: {
        dynamoDbStreamParameters: {
          startingPosition: "LATEST",
          batchSize: 1,
          maximumRetryAttempts: 0,
          deadLetterConfig: {
            queue: deadLetterQueue,
          },
        },
      },
      target: topicPublishApiDestination,
      targetParameters: {
        inputTemplate: JSON.stringify({
          EventType: DynamicInput.fromEventPath("$.eventName"),
          Location: DynamicInput.fromEventPath("$.dynamodb.Keys.Location.S"),
          MaxTemp: DynamicInput.fromEventPath("$.dynamodb.NewImage.MaxTemp.N"),
          MinTemp: DynamicInput.fromEventPath("$.dynamodb.NewImage.MinTemp.N"),
          ChancesOfPrecipitation: DynamicInput.fromEventPath(
            "$.dynamodb.NewImage.ChancesOfPrecipitation.N",
          ),
        }),
        httpParameters: {
          pathParameterValues: [cacheName, topicName],
        },
      },
      role,
      logConfiguration: {
        level: "INFO",
        cloudwatchLogsLogDestination: logGroup,
        includeExecutionData: ["ALL"],
      },
    });

    // Cache Delete Pipe
    new Pipe(this, "WeatherStatsDemoCacheDeletePipe", {
      pipeName: "weather-stats-demo-cache-delete-pipe",
      source: weatherStatsTable,
      sourceParameters: {
        dynamoDbStreamParameters: {
          startingPosition: "LATEST",
          batchSize: 1,
          maximumRetryAttempts: 0,
          deadLetterConfig: {
            queue: deadLetterQueue,
          },
        },
        filterCriteria: {
          filters: [FilterPattern.fromObject({ eventName: ["REMOVE"] })],
        },
      },
      target: cacheDeleteApiDestination,
      targetParameters: {
        httpParameters: {
          pathParameterValues: [cacheName],
          queryStringParameters: {
            key: DynamicInput.fromEventPath("$.dynamodb.Keys.Location.S"),
          },
        },
      },
      role,
      logConfiguration: {
        level: "INFO",
        cloudwatchLogsLogDestination: logGroup,
        includeExecutionData: ["ALL"],
      },
    });
  }
}
