import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { commonTags } from "../tags";

type GitHubDeployRoleArgs = {
  oidcProviderArn: pulumi.Input<string>;
  apiRepositoryArn: pulumi.Input<string>;
};

export function createGitHubDeployRole({
  oidcProviderArn,
  apiRepositoryArn,
}: GitHubDeployRoleArgs) {
  const assumeRolePolicy = pulumi.jsonStringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",

        Principal: {
          Federated: oidcProviderArn,
        },

        Action: "sts:AssumeRoleWithWebIdentity",

        Condition: {
          StringEquals: {
            "token.actions.githubusercontent.com:aud":
              "sts.amazonaws.com",

            "token.actions.githubusercontent.com:sub":
              "repo:maheshnd@63289193/shopflow@1400431487:ref:refs/heads/main",

            "token.actions.githubusercontent.com:repository_id":
              "1400431487",

            "token.actions.githubusercontent.com:repository_owner_id":
              "63289193",

            "token.actions.githubusercontent.com:ref":
              "refs/heads/main",
          },
        },
      },
    ],
  });

  const deployRole = new aws.iam.Role("shopflow-github-deploy-role", {
    name: "shopflow-github-deploy-role",

    assumeRolePolicy,

    description:
      "Role assumed by GitHub Actions to deploy ShopFlow",

    tags: commonTags,
  });

  const ecrPolicy = new aws.iam.RolePolicy(
    "shopflow-github-ecr-push-policy",
    {
      role: deployRole.id,

      policy: pulumi.jsonStringify({
        Version: "2012-10-17",

        Statement: [
          {
            Sid: "GetEcrAuthorizationToken",

            Effect: "Allow",

            Action: [
              "ecr:GetAuthorizationToken",
            ],

            Resource: "*",
          },

          {
            Sid: "PushShopFlowApiImage",

            Effect: "Allow",

            Action: [
              "ecr:BatchCheckLayerAvailability",
              "ecr:GetDownloadUrlForLayer",
              "ecr:BatchGetImage",
              "ecr:InitiateLayerUpload",
              "ecr:UploadLayerPart",
              "ecr:CompleteLayerUpload",
              "ecr:PutImage",
            ],

            Resource: apiRepositoryArn,
          },
        ],
      }),
    },
  );

  return {
    deployRole,
    deployRoleArn: deployRole.arn,
    ecrPolicy,
  };
}