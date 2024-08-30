import { awscdk, javascript } from "projen";

const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: "2.173.4",
  defaultReleaseBranch: "main",
  depsUpgradeOptions: { workflow: false },
  eslint: true,
  minNodeVersion: "22.12.0",
  name: "cdk-aws-eventbridge-webhooks-momento",
  packageManager: javascript.NodePackageManager.PNPM,
  pnpmVersion: "9",
  prettier: true,
  projenrcTs: true,

  deps: [
    "@aws-cdk/aws-pipes-alpha",
    "@aws-cdk/aws-pipes-enrichments-alpha",
    "@aws-cdk/aws-pipes-sources-alpha",
    "@aws-cdk/aws-pipes-targets-alpha",
  ],
  devDeps: ["zod"],
});

// PROJEN TASKS
project.addTask("demo:cli", {
  description: "Run the demo CLI app",
  cwd: "src/demo/cli",
  steps: [{ exec: "pnpm install" }, { exec: "pnpm start" }],
});
project.addTask("demo:web", {
  description: "Run the demo web app",
  cwd: "src/demo/web",
  steps: [{ exec: "pnpm install" }, { exec: "pnpm dev" }],
});

project.synth();
