import { StaticWebApp, type StaticWebAppConfig } from "@cdktf/provider-azurerm/lib/static-web-app";
import type { Construct } from "constructs";


export class L2StaticWebApp extends StaticWebApp {
    constructor(scope: Construct, id: string, config: Omit<StaticWebAppConfig, 'name'|'skuTier'|'skuSize'>) {
        super(scope, `stapp-${id}`, {
            ...config,
            name: `stapp-${id}`,
            skuTier: "Free",
            skuSize: "Free",
        });
    }
}
