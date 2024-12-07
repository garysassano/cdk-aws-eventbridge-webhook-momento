import { awscdk, javascript } from "projen";

const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: "2.172.0",
  defaultReleaseBranch: "main",
  depsUpgradeOptions: { workflow: false },
  eslint: true,
  minNodeVersion: "22.11.0",
  name: "cdk-aws-webhook-momento",
  packageManager: javascript.NodePackageManager.PNPM,
  pnpmVersion: "9",
  prettier: true,
  projenrcTs: true,

  deps: [
    "@aws-cdk/aws-pipes-alpha",
    "@aws-cdk/aws-pipes-enrichments-alpha",
    "@aws-cdk/aws-pipes-sources-alpha",
    "@aws-cdk/aws-pipes-targets-alpha",
    "zod",
  ],
});

project.synth();
