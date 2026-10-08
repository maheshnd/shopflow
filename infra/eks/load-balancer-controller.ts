import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as k8s from "@pulumi/kubernetes";

type CreateLoadBalancerControllerArgs = {
    kubeconfig: pulumi.Input<string>;
    clusterName: pulumi.Input<string>;
    vpcId: pulumi.Input<string>;
    roleArn: pulumi.Input<string>;
    dependsOn: pulumi.Resource[];
};

export function createLoadBalancerController({
    kubeconfig,
    clusterName,
    vpcId,
    roleArn,
    dependsOn,
}: CreateLoadBalancerControllerArgs) {
    const provider = new k8s.Provider(
        "shopflow-k8s-provider",
        {
            kubeconfig,
        },
    );

    const controller = new k8s.helm.v3.Release(
        "aws-load-balancer-controller",
        {
            chart: "aws-load-balancer-controller",

            repositoryOpts: {
                repo:
                    "https://aws.github.io/eks-charts",
            },

            namespace: "kube-system",

            version: "1.14.0",

            values: {
                clusterName,

                region: aws.getRegionOutput().name,

                vpcId,

                serviceAccount: {
                    create: true,

                    name:
                        "aws-load-balancer-controller",

                    annotations: {
                        "eks.amazonaws.com/role-arn":
                            roleArn,
                    },
                },
            },
        },
        {
            provider,
            dependsOn,
        },
    );

    return {
        controller,
    };
}
