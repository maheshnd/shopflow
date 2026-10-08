import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as eks from "@pulumi/eks";
import { commonTags } from "../tags";
import { createLoadBalancerControllerIam } from "./load-balancer-controller-iam";
import { createLoadBalancerController } from "./load-balancer-controller";

type CreateEksArgs = {
  vpcId: pulumi.Input<string>;
  publicSubnetIds: pulumi.Input<string>[];
  privateSubnetIds: pulumi.Input<string>[];
  githubDeployRoleArn: pulumi.Input<string>;
};

export function createEks({
  vpcId,
  publicSubnetIds,
  privateSubnetIds,
  githubDeployRoleArn,
}: CreateEksArgs) {
  // 1. Kubernetes control plane
  const cluster = new eks.Cluster("shopflow-eks", {
    vpcId,

    publicSubnetIds,
    privateSubnetIds,

    // We want an AWS-managed node group below,
    // not Pulumi's default node group.
    skipDefaultNodeGroup: true,

    // Modern EKS access management.
    authenticationMode: eks.AuthenticationMode.Api,

    // Needed later for IAM permissions at Pod/ServiceAccount level.
    createOidcProvider: true,

    tags: {
      ...commonTags,
      Name: "shopflow-eks",
    },
  });

  const loadBalancerControllerIam =
    createLoadBalancerControllerIam({
      oidcProviderArn: cluster.oidcProviderArn,
      oidcProviderUrl: cluster.oidcProviderUrl,
    });

  // 2. IAM role assumed by EC2 worker nodes
  const nodeRole = new aws.iam.Role("shopflow-eks-node-role", {
    assumeRolePolicy: JSON.stringify({
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Action: "sts:AssumeRole",
          Principal: {
            Service: "ec2.amazonaws.com",
          },
        },
      ],
    }),

    tags: commonTags,
  });

  // Allows node to participate in EKS.
  const workerPolicy = new aws.iam.RolePolicyAttachment(
    "shopflow-eks-worker-policy",
    {
      role: nodeRole.name,
      policyArn:
        "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy",
    },
  );

  // Allows Kubernetes VPC networking.
  const cniPolicy = new aws.iam.RolePolicyAttachment(
    "shopflow-eks-cni-policy",
    {
      role: nodeRole.name,
      policyArn:
        "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy",
    },
  );

  // Allows worker nodes to pull our API image from ECR.
  const ecrPolicy = new aws.iam.RolePolicyAttachment(
    "shopflow-eks-ecr-policy",
    {
      role: nodeRole.name,
      policyArn:
        "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly",
    },
  );

  // 3. Actual worker machines
  const nodeGroup = new eks.ManagedNodeGroup(
    "shopflow-eks-nodes",
    {
      cluster,
      nodeRole,

      // Very important:
      // EC2 workers live ONLY in private subnets.
      subnetIds: privateSubnetIds,

      instanceTypes: ["t3.small"],

      scalingConfig: {
        minSize: 1,
        desiredSize: 1,
        maxSize: 2,
      },

      tags: {
        ...commonTags,
        Name: "shopflow-eks-node",
      },
    },
    {
      dependsOn: [
        workerPolicy,
        cniPolicy,
        ecrPolicy,
      ],
    },
  );

  const loadBalancerController =
    createLoadBalancerController({
      kubeconfig: cluster.kubeconfigJson,
      clusterName: cluster.eksCluster.name,
      vpcId,
      roleArn: loadBalancerControllerIam.roleArn,
      dependsOn: [
        loadBalancerControllerIam.controllerPolicyAttachment,
        nodeGroup,
      ],
    });

  // 4. Allow GitHub Actions to access this EKS cluster
  const githubAccessEntry = new aws.eks.AccessEntry(
    "shopflow-github-eks-access",
    {
      clusterName: cluster.eksCluster.name,

      principalArn: githubDeployRoleArn,

      type: "STANDARD",
    },
  );

  const githubAccessPolicy =
    new aws.eks.AccessPolicyAssociation(
      "shopflow-github-eks-access-policy",
      {
        clusterName: cluster.eksCluster.name,

        principalArn: githubDeployRoleArn,

        policyArn:
          "arn:aws:eks::aws:cluster-access-policy/AmazonEKSAdminPolicy",

        accessScope: {
          type: "namespace",
          namespaces: ["shopflow"],
        },
      },
      {
        dependsOn: [githubAccessEntry],
      },
    );

  return {
    cluster,
    nodeGroup,

    clusterName: cluster.eksCluster.name,
    kubeconfig: cluster.kubeconfigJson,

    nodeSecurityGroupId: cluster.nodeSecurityGroupId,

    oidcProviderArn: cluster.oidcProviderArn,
    oidcProviderUrl: cluster.oidcProviderUrl,

    loadBalancerControllerRoleArn:
      loadBalancerControllerIam.roleArn,

    loadBalancerController
  };
}

