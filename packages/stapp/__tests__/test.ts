import { Testing } from "cdktf";
import "cdktf/lib/testing/adapters/jest";
import { L2StaticWebApp } from "../src/stapp";

describe("L2StaticWebApp", () => {
  test("name に stapp- プレフィックスを付け、Free プランを設定する", () => {
    // CDKTF のテストユーティリティを使用して、Stackをメモリ上で合成
    const synth = Testing.synthScope((scope) => {
      new L2StaticWebApp(scope, "myapp", {
        resourceGroupName: "rg-example",
        location: "japaneast",
      });
    });

    expect(synth).toHaveResourceWithProperties(L2StaticWebApp, {
        name: "stapp-myapp",
        location: "japaneast",
        resource_group_name: "rg-example",
        sku_tier: "Free",
        sku_size: "Free",
    })
  });
});
