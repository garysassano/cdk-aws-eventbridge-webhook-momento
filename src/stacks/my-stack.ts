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
import { CfnPipe } from "aws-cdk-lib/aws-pipes";
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
     * TO MODIFY FROM HERE
     */
  }
}
