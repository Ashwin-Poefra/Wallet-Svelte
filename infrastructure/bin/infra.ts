#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { AppStack } from "../lib/app-stack";

const app = new cdk.App();
new AppStack(app, "InfraStack", {
  env: { account: "582250362323", region: "us-east-1" },
});
