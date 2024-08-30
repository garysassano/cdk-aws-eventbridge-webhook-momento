import { SecretValue, Stack, StackProps } from "aws-cdk-lib";
import {
  EventAction,
  FilterGroup,
  GitHubSourceCredentials,
  Project,
  Source,
} from "aws-cdk-lib/aws-codebuild";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    // Read GITHUB_TOKEN, GITHUB_REPO, and GITHUB_OWNER from environment variables
    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_REPO;
    const githubOwner = process.env.GITHUB_OWNER;
    if (!githubToken || !githubRepo || !githubOwner) {
      throw new Error(
        "Required environment variables 'GITHUB_TOKEN', 'GITHUB_REPO', or 'GITHUB_OWNER' are missing or undefined",
      );
    }

    const githubTokenSecret = new Secret(this, "GithubTokenSecret", {
      secretName: "github-token",
      secretStringValue: SecretValue.unsafePlainText(githubToken),
    });

    new GitHubSourceCredentials(this, "GithubSourceCredentials", {
      accessToken: SecretValue.secretsManager(githubTokenSecret.secretArn),
    });

    new Project(this, "SampleProject", {
      projectName: "sample-project",
      source: Source.gitHub({
        owner: githubOwner,
        repo: githubRepo,
        webhook: true,
        webhookFilters: [
          FilterGroup.inEventOf(EventAction.WORKFLOW_JOB_QUEUED),
        ],
      }),
    });
  }
}
