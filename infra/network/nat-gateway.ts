import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { commonTags } from "../tags";

type CreateNatGatewayArgs = {
  publicSubnetAId: pulumi.Input<string>;
  internetGateway: aws.ec2.InternetGateway;
};

export function createNatGateway({
  publicSubnetAId,
  internetGateway,
}: CreateNatGatewayArgs) {
  const natEip = new aws.ec2.Eip("shopflow-nat-eip", {
    domain: "vpc",

    tags: {
      ...commonTags,
      Name: "shopflow-nat-eip",
    },
  });

  const natGateway = new aws.ec2.NatGateway(
    "shopflow-nat-a",
    {
      subnetId: publicSubnetAId,
      allocationId: natEip.id,

      tags: {
        ...commonTags,
        Name: "shopflow-nat-a",
      },
    },
    {
      dependsOn: [internetGateway],
    },
  );

  return {
    natEip,
    natGateway,
    natGatewayId: natGateway.id,
  };
}