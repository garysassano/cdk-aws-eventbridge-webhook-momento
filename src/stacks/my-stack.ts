import { SecretValue, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
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
// import {
//   Pipe,
//   FilterPattern,
//   DynamicInput,
//   InputTransformation,
// } from "@aws-cdk/aws-pipes-alpha";
// import { dyna } from "@aws-cdk/aws-pipes-sources-alpha";
// import * as pipes from "@aws-cdk/aws-pipes-alpha";
// import * as sqs from "aws-cdk-lib/aws-sqs";
// import * as iam from "aws-cdk-lib/aws-iam";
// import * as logs from "aws-cdk-lib/aws-logs";

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
     * EVENTBRIDGE CONNECTIONS & API DESTINATIONS
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

    /*
     * EVENTBRIDGE PIPES
     */

    // const source = new DynamodbStreamSource(weatherStatsDemoTable, {
    //   batchSize: 1,
    //   startingPosition: pipes.StartingPosition.LATEST,
    //   maximumRetryAttempts: 0,
    //   onFailure: pipes.SourceFailureMode.SEND_TO_QUEUE,
    //   deadLetterQueue: deadLetterQueue,
    // });

    // // Define the dead letter queue for inspecting failed events to event bridge
    // const deadLetterQueue = new sqs.Queue(this, "DeadLetterQueue", {
    //   queueName: "weather-stats-demo-dlq",
    //   retentionPeriod: Duration.days(14),
    // });

    // // Define the role for the event bridge
    // const role = new iam.Role(
    //   this,
    //   "AmazonEventBridgePipeWeatherStatsDemoEventToMomentoCache",
    //   {
    //     roleName: "AmazonEventBridgePipeWeatherStatsDemoEventToMomentoCache",
    //     assumedBy: new iam.ServicePrincipal("pipes.amazonaws.com"),
    //   },
    // );
    // this.addPolicyForEventBridgeRole(
    //   role,
    //   cachePutApiDestination,
    //   cacheDeleteApiDestination,
    //   topicPublishApiDestination,
    //   weatherStatsDemoTable,
    //   deadLetterQueue,
    // );

    // // Create a log group for the pipes
    // const logGroup = new logs.LogGroup(this, "PipesLogGroup", {
    //   logGroupName: "/aws/pipes/weather-stats-demo",
    //   retention: logs.RetentionDays.TWO_WEEKS,
    //   removalPolicy: RemovalPolicy.DESTROY,
    // });

    // // Define the pipe for the cache put operation
    // const cachePutPipe = new Pipe(this, "WeatherStatsDemoCachePutPipe", {
    //   pipeName: "weather-stats-demo-cache-put-pipe",
    //   source: source,
    //   target: new pipes.ApiDestinationTarget(cachePutApiDestination, {
    //     inputTransformation: InputTransformation.fromObject({
    //       Location: DynamicInput.fromEventPath("$.dynamodb.Keys.Location.S"),
    //       MaxTemp: DynamicInput.fromEventPath("$.dynamodb.NewImage.MaxTemp.N"),
    //       MinTemp: DynamicInput.fromEventPath("$.dynamodb.NewImage.MinTemp.N"),
    //       ChancesOfPrecipitation: DynamicInput.fromEventPath(
    //         "$.dynamodb.NewImage.ChancesOfPrecipitation.N",
    //       ),
    //     }),
    //     httpParameters: {
    //       pathParameterValues: [cacheName],
    //       queryStringParameters: {
    //         key: DynamicInput.fromEventPath("$.dynamodb.Keys.Location.S"),
    //         ttl_seconds: DynamicInput.fromEventPath(
    //           "$.dynamodb.NewImage.TTL.N",
    //         ),
    //       },
    //     },
    //   }),
    //   role: role,
    //   filter: new pipes.Filter([
    //     FilterPattern.fromObject({ eventName: ["INSERT", "MODIFY"] }),
    //   ]),
    // });

    // // Define the pipe for the topic publish operation
    // const topicPublishPipe = new Pipe(
    //   this,
    //   "WeatherStatsDemoTopicPublishPipe",
    //   {
    //     pipeName: "weather-stats-demo-topic-publish-pipe",
    //     source: source,
    //     target: new pipes.ApiDestinationTarget(topicPublishApiDestination, {
    //       inputTransformation: InputTransformation.fromObject({
    //         EventType: DynamicInput.fromEventPath("$.eventName"),
    //         Location: DynamicInput.fromEventPath("$.dynamodb.Keys.Location.S"),
    //         MaxTemp: DynamicInput.fromEventPath(
    //           "$.dynamodb.NewImage.MaxTemp.N",
    //         ),
    //         MinTemp: DynamicInput.fromEventPath(
    //           "$.dynamodb.NewImage.MinTemp.N",
    //         ),
    //         ChancesOfPrecipitation: DynamicInput.fromEventPath(
    //           "$.dynamodb.NewImage.ChancesOfPrecipitation.N",
    //         ),
    //       }),
    //       httpParameters: {
    //         pathParameterValues: [cacheName, topicName],
    //       },
    //     }),
    //     role: role,
    //   },
    // );

    // // Define the pipe for the cache delete operation
    // const cacheDeletePipe = new Pipe(this, "WeatherStatsDemoCacheDeletePipe", {
    //   pipeName: "weather-stats-demo-cache-delete-pipe",
    //   source: source,
    //   target: new pipes.ApiDestinationTarget(cacheDeleteApiDestination, {
    //     httpParameters: {
    //       pathParameterValues: [cacheName],
    //       queryStringParameters: {
    //         key: DynamicInput.fromEventPath("$.dynamodb.Keys.Location.S"),
    //       },
    //     },
    //   }),
    //   role: role,
    //   filter: new pipes.Filter([
    //     FilterPattern.fromObject({ eventName: ["REMOVE"] }),
    //   ]),
    // });

    // // Configure logging for all pipes
    // [cachePutPipe, topicPublishPipe, cacheDeletePipe].forEach((pipe) => {
    //   pipe.addLogDestination(new pipes.CloudWatchLogDestination(logGroup));
    //   pipe.logLevel = pipes.LogLevel.INFO;
    //   pipe.logIncludeExecutionData = [pipes.IncludeExecutionData.ALL];
    // });
  }
}
