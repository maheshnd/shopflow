import * as aws from "@pulumi/aws";
import { commonTags } from "../tags";

export function createEcr() {
  const apiRepository = new aws.ecr.Repository("shopflow-api", {
    name: "shopflow-api",

    imageTagMutability: "IMMUTABLE",

    imageScanningConfiguration: {
      scanOnPush: true,
    },

    encryptionConfigurations: [
      {
        encryptionType: "AES256",
      },
    ],

    tags: commonTags
  });

  return {
   apiRepository,
  apiRepositoryArn: apiRepository.arn,
  apiRepositoryUrl: apiRepository.repositoryUrl,
  };
}