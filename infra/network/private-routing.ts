import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { commonTags } from "../tags";

type CreatePrivateRoutingArgs = {
  vpcId: pulumi.Input<string>;
  natGatewayId: pulumi.Input<string>;
  privateSubnetAId: pulumi.Input<string>;
  privateSubnetBId: pulumi.Input<string>;
};

export function createPrivateRouting({
  vpcId,
  natGatewayId,
  privateSubnetAId,
  privateSubnetBId,
}: CreatePrivateRoutingArgs) {
  const privateRouteTable = new aws.ec2.RouteTable(
    "shopflow-private-rt",
    {
      vpcId,

      tags: {
        ...commonTags,
        Name: "shopflow-private-rt",
      },
    },
  );

  const natRoute = new aws.ec2.Route(
    "shopflow-private-internet-route",
    {
      routeTableId: privateRouteTable.id,

      destinationCidrBlock: "0.0.0.0/0",

      natGatewayId,
    },
  );

  const privateSubnetAAssociation =
    new aws.ec2.RouteTableAssociation(
      "shopflow-private-a-rt-association",
      {
        subnetId: privateSubnetAId,
        routeTableId: privateRouteTable.id,
      },
    );

  const privateSubnetBAssociation =
    new aws.ec2.RouteTableAssociation(
      "shopflow-private-b-rt-association",
      {
        subnetId: privateSubnetBId,
        routeTableId: privateRouteTable.id,
      },
    );

  return {
    privateRouteTable,
    natRoute,
    privateSubnetAAssociation,
    privateSubnetBAssociation,
  };
}