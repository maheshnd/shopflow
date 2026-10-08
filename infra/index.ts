import { createEcr } from "./ecr";
import {
    createGitHubDeployRole,
    createGitHubOidcProvider,
} from "./iam";
import { createNetwork } from "./network";
import { createEks } from "./eks";
import { createRds } from "./rds";

const ecr = createEcr();

const githubOidc = createGitHubOidcProvider();

const githubDeploy = createGitHubDeployRole({
    oidcProviderArn: githubOidc.providerArn,
    apiRepositoryArn: ecr.apiRepositoryArn,
});

const network = createNetwork();

const eksCluster = createEks({
    vpcId: network.vpcId,
    publicSubnetIds: network.publicSubnetIds,
    privateSubnetIds: network.privateSubnetIds,
    githubDeployRoleArn: githubDeploy.deployRoleArn,
});

const database = createRds({
    privateSubnetIds:
        network.privateSubnetIds,

    rdsSecurityGroupId:
        network.rdsSecurityGroupId,

    eksNodeSecurityGroupId:
        eksCluster.nodeSecurityGroupId,
});

export const apiRepositoryUrl =
    ecr.apiRepositoryUrl;

export const githubDeployRoleArn =
    githubDeploy.deployRoleArn;

export const vpcId =
    network.vpcId;

export const publicSubnetIds =
    network.publicSubnetIds;

export const privateSubnetIds =
    network.privateSubnetIds;

export const eksClusterName =
    eksCluster.clusterName;

export const databaseAddress =
    database.dbAddress;

export const databasePort =
    database.dbPort;