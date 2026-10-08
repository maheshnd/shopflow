import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { commonTags } from "../tags";

type CreatePublicRoutingArgs = {
  vpcId: pulumi.Input<string>;
  internetGatewayId: pulumi.Input<string>;
  publicSubnetAId: pulumi.Input<string>;
  publicSubnetBId: pulumi.Input<string>;
};

export function createPublicRouting({
  vpcId,
  internetGatewayId,
  publicSubnetAId,
  publicSubnetBId,
}: CreatePublicRoutingArgs) {
  const publicRouteTable = new aws.ec2.RouteTable(
    "shopflow-public-rt",
    {
      vpcId,

      tags: {
        ...commonTags,
        Name: "shopflow-public-rt",
      },
    },
  );

  const internetRoute = new aws.ec2.Route(
    "shopflow-public-internet-route",
    {
      routeTableId: publicRouteTable.id,

      destinationCidrBlock: "0.0.0.0/0",

      gatewayId: internetGatewayId,
    },
  );

  const publicSubnetAAssociation =
    new aws.ec2.RouteTableAssociation(
      "shopflow-public-a-rt-association",
      {
        subnetId: publicSubnetAId,
        routeTableId: publicRouteTable.id,
      },
    );

  const publicSubnetBAssociation =
    new aws.ec2.RouteTableAssociation(
      "shopflow-public-b-rt-association",
      {
        subnetId: publicSubnetBId,
        routeTableId: publicRouteTable.id,
      },
    );

  return {
    publicRouteTable,
    internetRoute,
    publicSubnetAAssociation,
    publicSubnetBAssociation,
  };
}