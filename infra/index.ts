import * as aws from "@pulumi/aws";
import { createEcr } from "./ecr";

const ecr = createEcr();

export const apiRepositoryUrl = ecr.apiRepositoryUrl;