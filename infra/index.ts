import { createEcr } from "./ecr";
import {
  createGitHubDeployRole,
  createGitHubOidcProvider,
} from "./iam";

const ecr = createEcr();

const githubOidc = createGitHubOidcProvider();

const githubDeploy = createGitHubDeployRole({
  oidcProviderArn: githubOidc.providerArn,
  apiRepositoryArn: ecr.apiRepositoryArn,
});

export const apiRepositoryUrl =
  ecr.apiRepositoryUrl;

export const githubDeployRoleArn =
  githubDeploy.deployRoleArn;