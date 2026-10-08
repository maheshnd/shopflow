import * as aws from "@pulumi/aws";
import { commonTags } from "../tags";

export function createVpc() {
  const vpc = new aws.ec2.Vpc("shopflow-vpc", {
    cidrBlock: "10.0.0.0/16",

    enableDnsSupport: true,
    enableDnsHostnames: true,

    tags: {
      ...commonTags,
      Name: "shopflow-vpc",
    },
  });

  return {
    vpc,
    vpcId: vpc.id,
    vpcCidrBlock: vpc.cidrBlock,
  };
}