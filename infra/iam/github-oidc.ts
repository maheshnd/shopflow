import * as aws from "@pulumi/aws";
import { commonTags } from "../tags";

export function createGitHubOidcProvider() {
  const provider = new aws.iam.OpenIdConnectProvider("github-oidc", {
    url: "https://token.actions.githubusercontent.com",

    clientIdLists: [
      "sts.amazonaws.com",
    ],

    tags: commonTags,
  });

  return {
    provider,
    providerArn: provider.arn,
  };
}