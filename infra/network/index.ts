import { createVpc } from "./vpc";
import { createSubnets } from "./subnets";
import { createInternetGateway } from "./internet-gateway";
import { createPublicRouting } from "./public-routing";
import { createNatGateway } from "./nat-gateway";
import { createPrivateRouting } from "./private-routing";
import { createSecurityGroups } from "./security-groups";

export function createNetwork() {
  const vpc = createVpc();

  const subnets = createSubnets({
    vpcId: vpc.vpcId,
  });

  const internetGateway = createInternetGateway({
    vpcId: vpc.vpcId,
  });

  const publicRouting = createPublicRouting({
    vpcId: vpc.vpcId,
    internetGatewayId: internetGateway.internetGatewayId,
    publicSubnetAId: subnets.publicSubnetA.id,
    publicSubnetBId: subnets.publicSubnetB.id,
  });

  const nat = createNatGateway({
    publicSubnetAId: subnets.publicSubnetA.id,
    internetGateway: internetGateway.internetGateway,
  });

  const privateRouting = createPrivateRouting({
    vpcId: vpc.vpcId,
    natGatewayId: nat.natGatewayId,
    privateSubnetAId: subnets.privateSubnetA.id,
    privateSubnetBId: subnets.privateSubnetB.id,
  });

  const securityGroups = createSecurityGroups({
  vpcId: vpc.vpcId,
});

  return {
    ...vpc,
    ...subnets,
    ...internetGateway,
    ...publicRouting,
    ...nat,
    ...privateRouting,
    ...securityGroups,
  };
}