import { RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { Table, AttributeType, StreamViewType } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    // Define the DynamoDB table for the weather stats demo
    const weatherStatsDemoTable = new Table(this, "weather-stats-demo-table", {
      tableName: "weather-stats-demo",
      partitionKey: { name: "Location", type: AttributeType.STRING },
      stream: StreamViewType.NEW_AND_OLD_IMAGES,
      removalPolicy: RemovalPolicy.DESTROY,
    });
  }
}
