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
import { CfnPipe } from "aws-cdk-lib/aws-pipes";
import { Queue } from "aws-cdk-lib/aws-sqs";
import { Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";
import { LogGroup, RetentionDays } from "aws-cdk-lib/aws-logs";
import { PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";
import * as cdk from "aws-cdk-lib";

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

    const weatherStatsTable = new TableV2(this, "WeatherStatsTable", {
      tableName: "weather-stats-table",
      partitionKey: { name: "Location", type: AttributeType.STRING },
      dynamoStream: StreamViewType.NEW_AND_OLD_IMAGES,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    /*
     * EVENTBRIDGE CONNECTIONS & API DESTINATIONS
     */

    const momentoConnection = new Connection(this, "MomentoConnection", {
      connectionName: "momento-connection",
      authorization: Authorization.apiKey(
        "Momento API Key",
        SecretValue.secretsManager(momentoApiKeySecret.secretName),
      ),
    });

    const momentoCachePutApiDestination = new ApiDestination(
      this,
      "MomentoCachePutApiDestination",
      {
        apiDestinationName: "momento-cache-put-api-destination",
        connection: momentoConnection,
        endpoint: `${momentoApiEndpoint}/cache/*`,
        httpMethod: HttpMethod.PUT,
      },
    );

    const momentoCacheDeleteApiDestination = new ApiDestination(
      this,
      "MomentoCacheDeleteApiDestination",
      {
        apiDestinationName: "momento-cache-delete-api-destination",
        connection: momentoConnection,
        endpoint: `${momentoApiEndpoint}/cache/*`,
        httpMethod: HttpMethod.DELETE,
      },
    );

    const momentoTopicsPostApiDestination = new ApiDestination(
      this,
      "MomentoTopicsPostApiDestination",
      {
        apiDestinationName: "momento-topics-post-api-destination",
        connection: momentoConnection,
        endpoint: `${momentoApiEndpoint}/topics/*/*`,
        httpMethod: HttpMethod.POST,
      },
    );

    /*
     * TO MODIFY FROM HERE
     */

    // Define the dead letter queue for inspecting failed events to event bridge
    const deadLetterQueue = new Queue(this, "DeadLetterQueue", {
      queueName: "weather-stats-demo-dlq",
      retentionPeriod: Duration.days(14),
    });

    // Define the role for the event bridge
    const role = new Role(
      this,
      "AmazonEventBridgePipeWeatherStatsDemoEventToMomentoCache",
      {
        roleName: "AmazonEventBridgePipeWeatherStatsDemoEventToMomentoCache",
        assumedBy: new ServicePrincipal("pipes.amazonaws.com"),
      },
    );

    // Add permissions to the role
    role.addToPolicy(
      new PolicyStatement({
        actions: ["events:InvokeApiDestination"],
        resources: [
          momentoCachePutApiDestination.apiDestinationArn,
          momentoCacheDeleteApiDestination.apiDestinationArn,
          momentoTopicsPostApiDestination.apiDestinationArn,
        ],
        effect: Effect.ALLOW,
      }),
    );

    role.addToPolicy(
      new PolicyStatement({
        actions: [
          "dynamodb:DescribeStream",
          "dynamodb:GetRecords",
          "dynamodb:GetShardIterator",
          "dynamodb:ListStreams",
        ],
        resources: [weatherStatsTable.tableStreamArn!],
        effect: Effect.ALLOW,
      }),
    );

    role.addToPolicy(
      new PolicyStatement({
        actions: [
          "sqs:SendMessage",
          "sqs:ReceiveMessage",
          "sqs:DeleteMessage",
          "sqs:GetQueueAttributes",
          "sqs:GetQueueUrl",
        ],
        resources: [deadLetterQueue.queueArn],
        effect: Effect.ALLOW,
      }),
    );

    // Define the log group for the access logs
    const logGroup = new LogGroup(this, "AccessLogs", {
      retention: RetentionDays.THREE_MONTHS,
      logGroupName: cdk.Fn.sub(`weather-stats-demo-logs-\${AWS::Region}`),
      removalPolicy: RemovalPolicy.DESTROY,
    });

    // Define the pipe for the cache put operation
    const cachePutCfnPipe = new CfnPipe(
      this,
      "weather-stats-demo-cache-put-pipe",
      {
        name: "weather-stats-demo-cache-put-pipe",
        desiredState: "RUNNING",
        source: weatherStatsTable.tableStreamArn!,
        sourceParameters: {
          dynamoDbStreamParameters: {
            batchSize: 1,
            startingPosition: "LATEST",
            maximumRetryAttempts: 0,
            deadLetterConfig: {
              arn: deadLetterQueue.queueArn,
            },
          },
          filterCriteria: {
            filters: [
              {
                pattern: '{"eventName": ["INSERT", "MODIFY"]}',
              },
            ],
          },
        },
        target: momentoCachePutApiDestination.apiDestinationArn!,
        roleArn: role.roleArn,
        logConfiguration: {
          cloudwatchLogsLogDestination: {
            logGroupArn: logGroup.logGroupArn,
          },
          level: "INFO",
          includeExecutionData: ["ALL"],
        },
      },
    );

    // Define the pipe for the topic publish operation
    const topicPublishCfnPipe = new CfnPipe(
      this,
      "weather-stats-demo-topic-publish-pipe",
      {
        name: "weather-stats-demo-topic-publish-pipe",
        desiredState: "RUNNING",
        source: weatherStatsTable.tableStreamArn!,
        sourceParameters: {
          dynamoDbStreamParameters: {
            batchSize: 1,
            startingPosition: "LATEST",
            maximumRetryAttempts: 0,
            deadLetterConfig: {
              arn: deadLetterQueue.queueArn,
            },
          },
        },
        target: momentoTopicsPostApiDestination.apiDestinationArn!,
        roleArn: role.roleArn,
        logConfiguration: {
          cloudwatchLogsLogDestination: {
            logGroupArn: logGroup.logGroupArn,
          },
          level: "INFO",
          includeExecutionData: ["ALL"],
        },
      },
    );

    // Define the pipe for the cache delete operation
    const cacheDeleteCfnPipe = new CfnPipe(
      this,
      "weather-stats-demo-cache-delete-pipe",
      {
        name: "weather-stats-demo-cache-delete-pipe",
        desiredState: "RUNNING",
        source: weatherStatsTable.tableStreamArn!,
        sourceParameters: {
          dynamoDbStreamParameters: {
            batchSize: 1,
            startingPosition: "LATEST",
            maximumRetryAttempts: 0,
            deadLetterConfig: {
              arn: deadLetterQueue.queueArn,
            },
          },
          filterCriteria: {
            filters: [
              {
                pattern: '{"eventName": ["REMOVE"]}',
              },
            ],
          },
        },
        target: momentoCacheDeleteApiDestination.apiDestinationArn!,
        roleArn: role.roleArn,
        logConfiguration: {
          cloudwatchLogsLogDestination: {
            logGroupArn: logGroup.logGroupArn,
          },
          level: "INFO",
          includeExecutionData: ["ALL"],
        },
      },
    );

    // Add target parameters to the pipes
    cachePutCfnPipe.targetParameters = {
      inputTemplate:
        '{\n  "Location": <$.dynamodb.Keys.Location.S>, \n  "MaxTemp": <$.dynamodb.NewImage.MaxTemp.N>,\n  "MinTemp": <$.dynamodb.NewImage.MinTemp.N>, \n  "ChancesOfPrecipitation": <$.dynamodb.NewImage.ChancesOfPrecipitation.N>\n}',
      httpParameters: {
        pathParameterValues: [cacheName],
        queryStringParameters: {
          key: "$.dynamodb.Keys.Location.S",
          ttl_seconds: "$.dynamodb.NewImage.TTL.N",
        },
      },
    };

    topicPublishCfnPipe.targetParameters = {
      inputTemplate:
        '{\n "EventType": <$.eventName>,  "Location": <$.dynamodb.Keys.Location.S>, \n  "MaxTemp": <$.dynamodb.NewImage.MaxTemp.N>,\n  "MinTemp": <$.dynamodb.NewImage.MinTemp.N>, \n  "ChancesOfPrecipitation": <$.dynamodb.NewImage.ChancesOfPrecipitation.N>\n}',
      httpParameters: {
        pathParameterValues: [cacheName, topicName],
      },
    };

    cacheDeleteCfnPipe.targetParameters = {
      httpParameters: {
        pathParameterValues: [cacheName],
        queryStringParameters: {
          key: "$.dynamodb.Keys.Location.S",
        },
      },
    };

    // Add dependencies to the pipes
    cachePutCfnPipe.node.addDependency(weatherStatsTable);
    cachePutCfnPipe.node.addDependency(momentoCachePutApiDestination);
    topicPublishCfnPipe.node.addDependency(weatherStatsTable);
    topicPublishCfnPipe.node.addDependency(momentoTopicsPostApiDestination);
    cacheDeleteCfnPipe.node.addDependency(weatherStatsTable);
    cacheDeleteCfnPipe.node.addDependency(momentoCacheDeleteApiDestination);
  }
}
