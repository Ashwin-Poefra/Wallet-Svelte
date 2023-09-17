import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { StaticSite } from "./website";

export class AppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new StaticSite(this, "PaymentWalletWebsite", {
      domainName: "amuel.org",
      subdomainName: "wallet",
      filePath: "../frontend/build",
    });
  }
}
