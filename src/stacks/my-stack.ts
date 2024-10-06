import {
  Pipe,
  Filter,
  FilterPattern,
  InputTransformation,
  LogLevel,
  ILogDestination,
  IncludeExecutionData,
} from "@aws-cdk/aws-pipes-alpha";
import {
  DynamoDBSource,
  DynamoDBStartingPosition,
} from "@aws-cdk/aws-pipes-sources-alpha";
import { ApiDestinationTarget } from "@aws-cdk/aws-pipes-targets-alpha";
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
import { LogGroup, RetentionDays } from "aws-cdk-lib/aws-logs";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";
import { Queue } from "aws-cdk-lib/aws-sqs";
import { Construct } from "constructs";

const cacheName: string = "momento-eventbridge-cache";
const topicName: string = "momento-eventbridge-topic";

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    // Read environment variables
    const momentoApiKey = this.getEnvVariable("MOMENTO_API_KEY");
    const momentoApiEndpoint = this.getEnvVariable("MOMENTO_API_ENDPOINT");

    //==============================================================================
    // SECRETS MANAGER
    //==============================================================================

    const momentoApiKeySecret = new Secret(this, "MomentoApiKeySecret", {
      secretName: "momento-api-key-secret",
      secretStringValue: SecretValue.unsafePlainText(momentoApiKey),
    });

    //==============================================================================
    // DYNAMODB
    //==============================================================================

    const weatherStatsTable = new TableV2(this, "WeatherStatsTable", {
      tableName: "weather-stats-table",
      partitionKey: {
        name: "Location",
        type: AttributeType.STRING,
      },
      dynamoStream: StreamViewType.NEW_AND_OLD_IMAGES,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    //==============================================================================
    // SQS
    //==============================================================================

    const weatherStatsTableDlq = new Queue(this, "WeatherStatsTableDlq", {
      queueName: "weather-stats-table-dlq",
      retentionPeriod: Duration.days(14),
    });

    //==============================================================================
    // CLOUDWATCH LOGS
    //==============================================================================

    const logGroup = new LogGroup(this, "AccessLogs", {
      retention: RetentionDays.THREE_MONTHS,
      logGroupName: `weather-stats-demo-logs-${this.region}`,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const logDestination = this.createLogDestination(logGroup);

    //==============================================================================
    // EVENTBRIDGE
    //==============================================================================

    // Connections
    const momentoConnection = this.createMomentoConnection(momentoApiKeySecret);

    // API Destinations
    const apiDestinations = this.createApiDestinations(
      momentoConnection,
      momentoApiEndpoint,
    );

    // Pipes
    this.createMomentoPipes(
      weatherStatsTable,
      weatherStatsTableDlq,
      apiDestinations,
      logDestination,
    );
  }

  private getEnvVariable(name: string): string {
    const value = process.env[name];
    if (!value) {
      throw new Error(
        `Required environment variable '${name}' is missing or undefined`,
      );
    }
    return value;
  }

  private createLogDestination(logGroup: LogGroup): ILogDestination {
    return {
      bind: () => ({
        parameters: {
          cloudwatchLogsLogDestination: {
            logGroupArn: logGroup.logGroupArn,
          },
        },
      }),
      grantPush: (grantee) => {
        logGroup.grantWrite(grantee);
      },
    };
  }

  private createMomentoConnection(apiKeySecret: Secret): Connection {
    return new Connection(this, "MomentoConnection", {
      connectionName: "momento-connection",
      authorization: Authorization.apiKey(
        "Momento API Key",
        SecretValue.secretsManager(apiKeySecret.secretName),
      ),
    });
  }

  private createApiDestinations(connection: Connection, endpoint: string) {
    return {
      cachePut: new ApiDestination(this, "MomentoCachePutApiDestination", {
        apiDestinationName: "momento-cache-put-api-destination",
        connection,
        endpoint: `${endpoint}/cache/*`,
        httpMethod: HttpMethod.PUT,
      }),
      cacheDelete: new ApiDestination(
        this,
        "MomentoCacheDeleteApiDestination",
        {
          apiDestinationName: "momento-cache-delete-api-destination",
          connection,
          endpoint: `${endpoint}/cache/*`,
          httpMethod: HttpMethod.DELETE,
        },
      ),
      topicsPost: new ApiDestination(this, "MomentoTopicsPostApiDestination", {
        apiDestinationName: "momento-topics-post-api-destination",
        connection,
        endpoint: `${endpoint}/topics/*/*`,
        httpMethod: HttpMethod.POST,
      }),
    };
  }

  private createMomentoPipes(
    table: TableV2,
    dlq: Queue,
    apiDestinations: ReturnType<typeof this.createApiDestinations>,
    logDestination: ILogDestination,
  ) {
    const commonSourceConfig = {
      startingPosition: DynamoDBStartingPosition.LATEST,
      batchSize: 1,
      maximumRetryAttempts: 0,
      deadLetterTarget: dlq,
    };

    const commonPipeConfig = {
      logDestinations: [logDestination],
      logLevel: LogLevel.INFO,
      logIncludeExecutionData: [IncludeExecutionData.ALL],
    };

    // Cache Put Pipe
    new Pipe(this, "MomentoCachePutPipe", {
      pipeName: "momento-cache-put-pipe",
      source: new DynamoDBSource(table, commonSourceConfig),
      filter: new Filter([
        FilterPattern.fromObject({ eventName: ["INSERT", "MODIFY"] }),
      ]),
      target: new ApiDestinationTarget(apiDestinations.cachePut, {
        pathParameterValues: [cacheName],
        queryStringParameters: {
          key: "$.dynamodb.Keys.Location.S",
          ttl_seconds: "$.dynamodb.NewImage.TTL.N",
        },
        inputTransformation: InputTransformation.fromObject({
          Location: "$.dynamodb.Keys.Location.S",
          MaxTemp: "$.dynamodb.NewImage.MaxTemp.N",
          MinTemp: "$.dynamodb.NewImage.MinTemp.N",
          ChancesOfPrecipitation:
            "$.dynamodb.NewImage.ChancesOfPrecipitation.N",
        }),
      }),
      ...commonPipeConfig,
    });

    // Cache Delete Pipe
    new Pipe(this, "MomentoCacheDeletePipe", {
      pipeName: "momento-cache-delete-pipe",
      source: new DynamoDBSource(table, commonSourceConfig),
      filter: new Filter([FilterPattern.fromObject({ eventName: ["REMOVE"] })]),
      target: new ApiDestinationTarget(apiDestinations.cacheDelete, {
        pathParameterValues: [cacheName],
        queryStringParameters: {
          key: "$.dynamodb.Keys.Location.S",
        },
      }),
      ...commonPipeConfig,
    });

    // Topics Post Pipe
    new Pipe(this, "MomentoTopicsPostPipe", {
      pipeName: "momento-topics-post-pipe",
      source: new DynamoDBSource(table, commonSourceConfig),
      target: new ApiDestinationTarget(apiDestinations.topicsPost, {
        pathParameterValues: [cacheName, topicName],
        inputTransformation: InputTransformation.fromObject({
          EventType: "$.eventName",
          Location: "$.dynamodb.Keys.Location.S",
          MaxTemp: "$.dynamodb.NewImage.MaxTemp.N",
          MinTemp: "$.dynamodb.NewImage.MinTemp.N",
          ChancesOfPrecipitation:
            "$.dynamodb.NewImage.ChancesOfPrecipitation.N",
        }),
      }),
      ...commonPipeConfig,
    });
  }
}
