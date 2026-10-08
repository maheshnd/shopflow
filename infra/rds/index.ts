import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { commonTags } from "../tags";

type CreateRdsArgs = {
  privateSubnetIds: pulumi.Input<string>[];
  rdsSecurityGroupId: pulumi.Input<string>;
  eksNodeSecurityGroupId: pulumi.Input<string>;
};

export function createRds({
  privateSubnetIds,
  rdsSecurityGroupId,
  eksNodeSecurityGroupId,
}: CreateRdsArgs) {
  const config = new pulumi.Config();

  const dbPassword =
    config.requireSecret("dbPassword");

  // 1. Tell RDS which private subnets it may use.
  const dbSubnetGroup = new aws.rds.SubnetGroup(
    "shopflow-db-subnet-group",
    {
      subnetIds: privateSubnetIds,

      tags: {
        ...commonTags,
        Name: "shopflow-db-subnet-group",
      },
    },
  );

  // 2. Allow EKS workloads to reach PostgreSQL.
  const rdsFromEks = new aws.vpc.SecurityGroupIngressRule(
    "shopflow-rds-from-eks",
    {
      securityGroupId: rdsSecurityGroupId,

      referencedSecurityGroupId:
        eksNodeSecurityGroupId,

      fromPort: 5432,
      toPort: 5432,

      ipProtocol: "tcp",

      description:
        "Allow PostgreSQL from EKS worker nodes",
    },
  );

  // 3. Actual PostgreSQL database.
  const database = new aws.rds.Instance(
    "shopflow-postgres",
    {
      identifier: "shopflow-dev-postgres",

      engine: "postgres",

      instanceClass: "db.t3.micro",

      allocatedStorage: 20,
      storageType: "gp3",
      storageEncrypted: true,

      dbName: "shopflow",

      username: "shopflowadmin",
      password: dbPassword,

      dbSubnetGroupName:
        dbSubnetGroup.name,

      vpcSecurityGroupIds: [
        rdsSecurityGroupId,
      ],

      publiclyAccessible: false,

      multiAz: false,

      autoMinorVersionUpgrade: true,

      // DEV only.
      deletionProtection: false,
      skipFinalSnapshot: true,

      tags: {
        ...commonTags,
        Name: "shopflow-dev-postgres",
      },
    },
    {
      dependsOn: [rdsFromEks],
    },
  );

  return {
    database,

    dbAddress: database.address,
    dbPort: database.port,
    dbName: database.dbName,

    dbUsername: database.username,
    dbPassword,
  };
}