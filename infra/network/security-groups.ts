import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { commonTags } from "../tags";

type CreateSecurityGroupsArgs = {
  vpcId: pulumi.Input<string>;
};

export function createSecurityGroups({
  vpcId,
}: CreateSecurityGroupsArgs) {
  const albSecurityGroup = new aws.ec2.SecurityGroup(
    "shopflow-alb-sg",
    {
      name: "shopflow-alb-sg",
      description: "Security group for ShopFlow public ALB",
      vpcId,

      tags: {
        ...commonTags,
        Name: "shopflow-alb-sg",
      },
    },
  );

  const apiSecurityGroup = new aws.ec2.SecurityGroup(
    "shopflow-api-sg",
    {
      name: "shopflow-api-sg",
      description: "Security group for ShopFlow API",
      vpcId,

      tags: {
        ...commonTags,
        Name: "shopflow-api-sg",
      },
    },
  );

  const rdsSecurityGroup = new aws.ec2.SecurityGroup(
    "shopflow-rds-sg",
    {
      name: "shopflow-rds-sg",
      description: "Security group for ShopFlow PostgreSQL",
      vpcId,

      tags: {
        ...commonTags,
        Name: "shopflow-rds-sg",
      },
    },
  );

  // Internet -> ALB HTTP
  new aws.vpc.SecurityGroupIngressRule(
    "shopflow-alb-http-in",
    {
      securityGroupId: albSecurityGroup.id,
      cidrIpv4: "0.0.0.0/0",
      fromPort: 80,
      toPort: 80,
      ipProtocol: "tcp",
      description: "Allow HTTP from internet",
    },
  );

  // Internet -> ALB HTTPS
  new aws.vpc.SecurityGroupIngressRule(
    "shopflow-alb-https-in",
    {
      securityGroupId: albSecurityGroup.id,
      cidrIpv4: "0.0.0.0/0",
      fromPort: 443,
      toPort: 443,
      ipProtocol: "tcp",
      description: "Allow HTTPS from internet",
    },
  );

  // ALB -> API
  new aws.vpc.SecurityGroupIngressRule(
    "shopflow-api-from-alb",
    {
      securityGroupId: apiSecurityGroup.id,
      referencedSecurityGroupId: albSecurityGroup.id,
      fromPort: 4000,
      toPort: 4000,
      ipProtocol: "tcp",
      description: "Allow Fastify traffic from ALB",
    },
  );

  // // API -> RDS
  // new aws.vpc.SecurityGroupIngressRule(
  //   "shopflow-rds-from-api",
  //   {
  //     securityGroupId: rdsSecurityGroup.id,
  //     referencedSecurityGroupId: apiSecurityGroup.id,
  //     fromPort: 5432,
  //     toPort: 5432,
  //     ipProtocol: "tcp",
  //     description: "Allow PostgreSQL traffic from API",
  //   },
  // );

  // ALB may send traffic only to API:4000
  new aws.vpc.SecurityGroupEgressRule(
    "shopflow-alb-to-api",
    {
      securityGroupId: albSecurityGroup.id,
      referencedSecurityGroupId: apiSecurityGroup.id,
      fromPort: 4000,
      toPort: 4000,
      ipProtocol: "tcp",
      description: "Allow ALB to reach API",
    },
  );

  // DEV: allow API outbound traffic for DB, AWS APIs,
  // external services, DNS-related flows through the platform, etc.
  new aws.vpc.SecurityGroupEgressRule(
    "shopflow-api-all-out",
    {
      securityGroupId: apiSecurityGroup.id,
      cidrIpv4: "0.0.0.0/0",
      ipProtocol: "-1",
      description: "Allow API outbound traffic in dev",
    },
  );

  return {
    albSecurityGroup,
    albSecurityGroupId: albSecurityGroup.id,

    apiSecurityGroup,
    apiSecurityGroupId: apiSecurityGroup.id,

    rdsSecurityGroup,
    rdsSecurityGroupId: rdsSecurityGroup.id,
  };
}