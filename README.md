# cdk-aws-eventbridge-webhooks-momento

CDK app that demonstrates how to use Amazon EventBridge to send webhook events to Momento.

## Prerequisites

- **_AWS:_**
  - Must have authenticated with [Default Credentials](https://docs.aws.amazon.com/cdk/v2/guide/cli.html#cli_auth) in your local environment.
  - Must have completed the [CDK bootstrapping](https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html) for the target AWS environment.
- **_Momento:_**
  - Must have set the `MOMENTO_API_KEY` and `MOMENTO_API_ENDPOINT` variables in your local environment.
  - Must have created a cache named `momento-eventbridge-cache` in your Momento account.
- **_Node.js + npm:_**
  - Must be [installed](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) in your system.

## Installation

```sh
npx projen install
```

## Deployment

```sh
npx projen deploy
```

## Usage

### CLI App

```sh
npx projen demo:cli
```

### Web App

```sh
npx projen demo:web
```

## Cleanup

```sh
npx projen destroy
```

## Architecture Diagram

![Architecture Diagram](./src/assets/arch-diagram.svg)
