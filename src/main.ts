import { App } from "aws-cdk-lib";
// import { MyStack } from "./stacks/my-stack";
import { TestStack } from "./stacks/test-stack";

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new TestStack(app, "cdk-aws-webhook-momento-dev", { env: devEnv });

app.synth();
