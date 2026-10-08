import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { commonTags } from "../tags";

type CreateLoadBalancerControllerIamArgs = {
    oidcProviderArn: pulumi.Input<string>;
    oidcProviderUrl: pulumi.Input<string>;
};

export function createLoadBalancerControllerIam({
    oidcProviderArn,
    oidcProviderUrl,
}: CreateLoadBalancerControllerIamArgs) {
    const assumeRolePolicy = pulumi
        .all([oidcProviderArn, oidcProviderUrl])
        .apply(([providerArn, providerUrl]) => {
            const issuer = providerUrl.replace(
                "https://",
                "",
            );

            return JSON.stringify({
                Version: "2012-10-17",

                Statement: [
                    {
                        Effect: "Allow",

                        Principal: {
                            Federated: providerArn,
                        },

                        Action:
                            "sts:AssumeRoleWithWebIdentity",

                        Condition: {
                            StringEquals: {
                                [`${issuer}:aud`]:
                                    "sts.amazonaws.com",

                                [`${issuer}:sub`]:
                                    "system:serviceaccount:kube-system:aws-load-balancer-controller",
                            },
                        },
                    },
                ],
            });
        });

    const role = new aws.iam.Role(
        "shopflow-alb-controller-role",
        {
            name: "shopflow-alb-controller-role",

            assumeRolePolicy,

            tags: commonTags,
        },
    );

    const controllerPolicyDocument = JSON.stringify(
        require("./aws-load-balancer-controller-policy.json"),
    );

    const controllerPolicy = new aws.iam.Policy(
        "shopflow-alb-controller-policy",
        {
            name: "shopflow-alb-controller-policy",

            policy: controllerPolicyDocument,

            tags: commonTags,
        },
    );

    const controllerPolicyAttachment =
        new aws.iam.RolePolicyAttachment(
            "shopflow-alb-controller-policy-attachment",
            {
                role: role.name,
                policyArn: controllerPolicy.arn,
            },
        );

    return {
        role,
        roleArn: role.arn,
        controllerPolicy,
        controllerPolicyAttachment,
    };
}