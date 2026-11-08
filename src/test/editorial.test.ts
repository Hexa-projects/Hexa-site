import { describe, expect, it } from "vitest";
import { commercialLines, rmStories } from "@/data/editorial";

describe("catálogo editorial", () => {
  it("usa os modelos atuais e fontes de fabricante para RM", () => {
    expect(Object.values(rmStories).map((story) => story.name)).toEqual(["S-scan Open", "O-scan SMART", "G-scan Open"]);
    for (const story of Object.values(rmStories)) {
      expect(story.hero).toMatch(/^\/assets\/esaote\//);
      expect(story.sourceUrl).toMatch(/^https:\/\/www\.esaote\.com\//);
      expect(story.facts.length).toBeGreaterThan(0);
    }
  });

  it("cobre todas as linhas comerciais", () => {
    expect(commercialLines.map((line) => line.slug)).toEqual(["bombas-injetoras", "mindray"]);
  });
});
