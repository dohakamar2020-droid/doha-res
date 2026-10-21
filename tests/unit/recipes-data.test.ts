import { describe, it, expect } from "vitest";
import recipes from "@/data/recipes.json";
import { validateRecipes } from "@/lib/validate";
import { getAllRecipes, getRecipeBySlug } from "@/lib/recipes";

describe("recipe data integrity", () => {
  it("has at least 12 recipes", () => {
    expect(recipes.length).toBeGreaterThanOrEqual(12);
  });

  it("passes validation", () => {
    const errors = validateRecipes(recipes);
    expect(errors).toEqual([]);
  });

  it("getAllRecipes returns same count", () => {
    expect(getAllRecipes().length).toBe(recipes.length);
  });

  it("getRecipeBySlug finds existing", () => {
    expect(getRecipeBySlug(recipes[0].slug)).toBeDefined();
  });

  it("getRecipeBySlug returns undefined for unknown", () => {
    expect(getRecipeBySlug("does-not-exist")).toBeUndefined();
  });
});
