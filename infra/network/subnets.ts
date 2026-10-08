import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { commonTags } from "../tags";

type CreateSubnetsArgs = {
  vpcId: pulumi.Input<string>;
};

export function createSubnets({
  vpcId,
}: CreateSubnetsArgs) {
  const publicSubnetA = new aws.ec2.Subnet(
    "shopflow-public-a",
    {
      vpcId,
      cidrBlock: "10.0.1.0/24",
      availabilityZone: "us-east-1a",

      mapPublicIpOnLaunch: true,

      tags: {
        ...commonTags,
        Name: "shopflow-public-a",
        Type: "public",
        "kubernetes.io/role/elb": "1",
      },
    },
  );

  const publicSubnetB = new aws.ec2.Subnet(
    "shopflow-public-b",
    {
      vpcId,
      cidrBlock: "10.0.2.0/24",
      availabilityZone: "us-east-1b",

      mapPublicIpOnLaunch: true,

      tags: {
        ...commonTags,
        Name: "shopflow-public-b",
        Type: "public",
        "kubernetes.io/role/elb": "1",
      },
    },
  );

  const privateSubnetA = new aws.ec2.Subnet(
    "shopflow-private-a",
    {
      vpcId,
      cidrBlock: "10.0.11.0/24",
      availabilityZone: "us-east-1a",

      mapPublicIpOnLaunch: false,

      tags: {
        ...commonTags,
        Name: "shopflow-private-a",
        Type: "private",
        "kubernetes.io/role/internal-elb": "1",
      },
    },
  );

  const privateSubnetB = new aws.ec2.Subnet(
    "shopflow-private-b",
    {
      vpcId,
      cidrBlock: "10.0.12.0/24",
      availabilityZone: "us-east-1b",

      mapPublicIpOnLaunch: false,

      tags: {
        ...commonTags,
        Name: "shopflow-private-b",
        Type: "private",
        "kubernetes.io/role/internal-elb": "1",
      },
    },
  );

  return {
    publicSubnetA,
    publicSubnetB,
    privateSubnetA,
    privateSubnetB,

    publicSubnetIds: [
      publicSubnetA.id,
      publicSubnetB.id,
    ],

    privateSubnetIds: [
      privateSubnetA.id,
      privateSubnetB.id,
    ],
  };
}