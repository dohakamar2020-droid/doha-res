import recipesData from "@/data/recipes.json";
import type { Recipe, RecipeCategory } from "@/types/recipe";
import { validateRecipes } from "./validate";
import { normalizeArabic } from "./arabic";

const recipes = recipesData as Recipe[];

// Validate at module load in development
if (process.env.NODE_ENV !== "production") {
  const errors = validateRecipes(recipes);
  if (errors.length) {
    console.warn("Recipe validation errors:", errors);
  }
}

export function getAllRecipes(): Recipe[] {
  return recipes;
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return recipes.find((r) => r.slug === slug);
}

export function getFeaturedRecipes(): Recipe[] {
  return recipes.filter((r) => r.featured);
}

export function getLatestRecipes(limit = 6): Recipe[] {
  return [...recipes]
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .slice(0, limit);
}

export function getRecipesByCategory(category: RecipeCategory): Recipe[] {
  return recipes.filter((r) => r.category === category);
}

export function getRelatedRecipes(recipe: Recipe, limit = 3): Recipe[] {
  return recipes
    .filter((r) => r.id !== recipe.id && r.category === recipe.category)
    .slice(0, limit);
}

export function getAllSlugs(): string[] {
  return recipes.map((r) => r.slug);
}

export function searchRecipes(
  query: string,
  category: RecipeCategory | "all",
  sort: "title" | "prepTime"
): Recipe[] {
  const q = normalizeArabic(query);
  let result = recipes.filter((r) => {
    if (category !== "all" && r.category !== category) return false;
    if (!q) return true;
    const haystack = normalizeArabic(
      [r.title, r.description, r.tags.join(" "), r.ingredients.map((i) => i.name).join(" ")].join(" ")
    );
    return haystack.includes(q);
  });

  if (sort === "title") {
    result = [...result].sort((a, b) => a.title.localeCompare(b.title, "ar"));
  } else if (sort === "prepTime") {
    result = [...result].sort((a, b) => a.prepMinutes - b.prepMinutes);
  }
  return result;
}
