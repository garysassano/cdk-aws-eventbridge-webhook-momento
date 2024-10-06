import { ILogDestination, Pipe } from "@aws-cdk/aws-pipes-alpha";
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
import { LogGroup, RetentionDays } from "aws-cdk-lib/aws-logs";

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

    const pipeSource = new DynamoDBSource(ddbTable, {
      startingPosition: DynamoDBStartingPosition.LATEST,
      batchSize: 1,
      maximumRetryAttempts: 0,
    });

    const logGroup = new LogGroup(this, "AccessLogs", {
      retention: RetentionDays.THREE_MONTHS,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const cwLogDestination: ILogDestination = {
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

    new Pipe(this, "Pipe", {
      source: pipeSource,
      target: new SqsTarget(queue),
      logDestinations: [cwLogDestination],
    });
  }
}
