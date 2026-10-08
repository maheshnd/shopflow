import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { commonTags } from "../tags";

type CreateInternetGatewayArgs = {
  vpcId: pulumi.Input<string>;
};

export function createInternetGateway({
  vpcId,
}: CreateInternetGatewayArgs) {
  const internetGateway = new aws.ec2.InternetGateway(
    "shopflow-igw",
    {
      vpcId,

      tags: {
        ...commonTags,
        Name: "shopflow-igw",
      },
    },
  );

  return {
    internetGateway,
    internetGatewayId: internetGateway.id,
  };
}