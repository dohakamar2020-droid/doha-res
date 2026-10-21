import { describe, it, expect } from "vitest";
import { searchRecipes } from "@/lib/recipes";

describe("search behavior", () => {
  it("returns all when query empty", () => {
    const r = searchRecipes("", "all", "title");
    expect(r.length).toBeGreaterThan(0);
  });

  it("searches by title", () => {
    const r = searchRecipes("برتقال", "all", "title");
    expect(r.some((x) => x.title.includes("برتقال"))).toBe(true);
  });

  it("searches by ingredient", () => {
    const r = searchRecipes("زنجبيل", "all", "title");
    expect(r.length).toBeGreaterThan(0);
  });

  it("normalizes arabic in query", () => {
    const r = searchRecipes("عَصير", "all", "title");
    expect(r.length).toBeGreaterThan(0);
  });

  it("category filter", () => {
    const r = searchRecipes("", "smoothie", "title");
    expect(r.every((x) => x.category === "smoothie")).toBe(true);
  });

  it("sorting by prep time", () => {
    const r = searchRecipes("", "all", "prepTime");
    for (let i = 1; i < r.length; i++) {
      expect(r[i].prepMinutes).toBeGreaterThanOrEqual(r[i - 1].prepMinutes);
    }
  });

  it("combined filtering", () => {
    const r = searchRecipes("توت", "smoothie", "title");
    expect(r.every((x) => x.category === "smoothie")).toBe(true);
    expect(r.every((x) => x.title.includes("توت") || x.tags.includes("توت") || x.ingredients.some((i) => i.name.includes("توت")))).toBe(true);
  });

  it("empty result for nonsense", () => {
    const r = searchRecipes("zzzzqqqq", "all", "title");
    expect(r.length).toBe(0);
  });
});
