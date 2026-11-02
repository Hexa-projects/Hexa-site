import { describe, expect, it } from "vitest";
import { wdmProducts } from "@/data/wdm";

describe("WDM veterinary campaign routes", () => {
  it("maps one approved final URL to each distinct product", () => {
    expect(wdmProducts).toHaveLength(3);
    expect(new Set(wdmProducts.map((item) => item.slug)).size).toBe(3);
    for (const item of wdmProducts) {
      expect(item.productionUrl).toBe(`https://www.hexamedical.com.br/solucoes/${item.slug}/`);
      expect(item.hero).toMatch(/^\/assets\/wdm\//);
      expect(item.sourceDocument).toMatch(/\.pdf$/);
    }
  });
});
