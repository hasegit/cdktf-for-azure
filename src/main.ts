import { AzurermProvider } from "@cdktf/provider-azurerm/lib/provider";
import { L2ResourceGroup } from "@tmp/core/src/resources/resource-group";
import { L2StaticWebApp } from "@tmp/stapp";
import { App, TerraformStack } from "cdktf";
import type { Construct } from "constructs";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new AzurermProvider(this, "AzureRm", {
      subscriptionId: "34932de5-79b8-4623-9881-e78e9af3e187",
      features: [{}],
    })

    // define resources here
    const rg = new L2ResourceGroup(this, "sandbox", {
      location: "Japan East",
    })

    new L2StaticWebApp(this, "sandbox", {
      resourceGroupName: rg.name,
      location: rg.location,
    })

  }
}

const app = new App();
new MyStack(app, "tmp");
app.synth();
