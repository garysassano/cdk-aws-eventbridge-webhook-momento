import { Pipe } from "@aws-cdk/aws-pipes-alpha";
import {
  DynamoDBSource,
  DynamoDBStartingPosition,
} from "@aws-cdk/aws-pipes-sources-alpha";
import { SqsTarget } from "@aws-cdk/aws-pipes-targets-alpha";
import { RemovalPolicy, Stack, StackProps, Duration } from "aws-cdk-lib";
import {
  AttributeType,
  StreamViewType,
  TableV2,
} from "aws-cdk-lib/aws-dynamodb";
import { Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";

// import { CfnPipe } from "aws-cdk-lib/aws-pipes";

import { Queue } from "aws-cdk-lib/aws-sqs";
import { Construct } from "constructs";

export class TestStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);
    const ddbTable = new TableV2(this, "DDBTable", {
      tableName: "ddb-table",
      partitionKey: {
        name: "Location",
        type: AttributeType.STRING,
      },
      dynamoStream: StreamViewType.NEW_AND_OLD_IMAGES,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const queue = new Queue(this, "Queue", {
      retentionPeriod: Duration.days(14),
    });

    const dlq = new Queue(this, "DLQ", {
      retentionPeriod: Duration.days(14),
    });

    const pipeSource = new DynamoDBSource(ddbTable, {
      startingPosition: DynamoDBStartingPosition.LATEST,
      batchSize: 1,
      maximumRetryAttempts: 0,
      deadLetterTarget: dlq,
    });

    const pipeRole = new Role(this, "EventbridgeRole", {
      roleName: "eventbridge-role",
      assumedBy: new ServicePrincipal("pipes.amazonaws.com"),
    });

    ddbTable.grantFullAccess(pipeRole);
    queue.grantSendMessages(pipeRole);
    dlq.grantSendMessages(pipeRole);

    new Pipe(this, "Pipe", {
      source: pipeSource,
      target: new SqsTarget(queue),
      role: pipeRole,
    });
  }
}
