import { ResourceGroup, type ResourceGroupConfig } from "@cdktf/provider-azurerm/lib/resource-group";
import type { Construct } from "constructs";


export class L2ResourceGroup extends ResourceGroup {
    constructor(scope: Construct, id: string, props: Omit<ResourceGroupConfig, "name">) {
        super(scope, `rg-${id}`, {
            ...props,
            name: `rg-${id}`,
        });
    }
}
