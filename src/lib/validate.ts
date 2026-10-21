import fs from "node:fs";
import path from "node:path";
import type { RecipeCategory } from "@/types/recipe";
import { VALID_CATEGORIES } from "@/types/recipe";

export interface ValidationError {
  message: string;
}

export function validateRecipes(recipes: unknown): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!Array.isArray(recipes)) {
    errors.push({ message: "Recipes must be an array" });
    return errors;
  }

  const ids = new Set<string>();
  const slugs = new Set<string>();

  recipes.forEach((r, index) => {
    const prefix = `Recipe #${index + 1}`;
    if (!r || typeof r !== "object") {
      errors.push({ message: `${prefix}: must be an object` });
      return;
    }
    const rec = r as Record<string, unknown>;

    const requiredFields = [
      "id",
      "slug",
      "title",
      "description",
      "category",
      "image",
      "imageAlt",
      "prepMinutes",
      "servings",
      "price",
      "ingredients",
      "steps",
      "featured",
      "publishedAt",
      "tags",
    ];
    for (const field of requiredFields) {
      if (rec[field] === undefined || rec[field] === null) {
        errors.push({ message: `${prefix}: missing field "${field}"` });
      }
    }

    // id
    if (typeof rec.id !== "string" || !rec.id.trim()) {
      errors.push({ message: `${prefix}: invalid id` });
    } else {
      if (ids.has(rec.id)) errors.push({ message: `${prefix}: duplicate id "${rec.id}"` });
      ids.add(rec.id);
    }

    // slug
    if (typeof rec.slug !== "string" || !rec.slug.trim()) {
      errors.push({ message: `${prefix}: invalid slug` });
    } else {
      if (slugs.has(rec.slug)) errors.push({ message: `${prefix}: duplicate slug "${rec.slug}"` });
      slugs.add(rec.slug);
    }

    // category
    if (!VALID_CATEGORIES.includes(rec.category as RecipeCategory)) {
      errors.push({ message: `${prefix}: invalid category "${String(rec.category)}"` });
    }

    // image reference
    if (typeof rec.image === "string") {
      // check file exists in public
      const publicPath = path.join(process.cwd(), "public", rec.image.replace(/^\//, ""));
      if (!fs.existsSync(publicPath)) {
        errors.push({ message: `${prefix}: broken image reference "${rec.image}"` });
      }
    }

    // ingredients
    if (!Array.isArray(rec.ingredients) || rec.ingredients.length === 0) {
      errors.push({ message: `${prefix}: ingredients must be non-empty array` });
    } else {
      rec.ingredients.forEach((ing, i) => {
        if (!ing || typeof ing !== "object") {
          errors.push({ message: `${prefix}: ingredient #${i + 1} invalid` });
          return;
        }
        const ingRec = ing as Record<string, unknown>;
        if (typeof ingRec.name !== "string" || !ingRec.name.trim()) {
          errors.push({ message: `${prefix}: ingredient #${i + 1} missing name` });
        }
        if (typeof ingRec.quantity !== "number") {
          errors.push({ message: `${prefix}: ingredient #${i + 1} invalid quantity` });
        }
        if (typeof ingRec.unit !== "string" || !ingRec.unit.trim()) {
          errors.push({ message: `${prefix}: ingredient #${i + 1} missing unit` });
        }
      });
    }

    // steps
    if (!Array.isArray(rec.steps) || rec.steps.length === 0) {
      errors.push({ message: `${prefix}: steps must be non-empty array` });
    } else {
      rec.steps.forEach((s, i) => {
        if (typeof s !== "string" || !s.trim()) {
          errors.push({ message: `${prefix}: step #${i + 1} invalid` });
        }
      });
    }

    // tips optional
    if (rec.tips !== undefined) {
      if (!Array.isArray(rec.tips)) {
        errors.push({ message: `${prefix}: tips must be array` });
      }
    }

    // prepMinutes
    if (typeof rec.prepMinutes !== "number" || rec.prepMinutes < 0) {
      errors.push({ message: `${prefix}: invalid prepMinutes` });
    }
    // servings
    if (typeof rec.servings !== "number" || rec.servings < 1) {
      errors.push({ message: `${prefix}: invalid servings` });
    }
    // price
    if (typeof rec.price !== "number" || rec.price < 0) {
      errors.push({ message: `${prefix}: invalid price` });
    }
    // featured
    if (typeof rec.featured !== "boolean") {
      errors.push({ message: `${prefix}: invalid featured` });
    }
    // publishedAt
    if (typeof rec.publishedAt !== "string" || isNaN(Date.parse(rec.publishedAt))) {
      errors.push({ message: `${prefix}: invalid publishedAt` });
    }
    // tags
    if (!Array.isArray(rec.tags)) {
      errors.push({ message: `${prefix}: tags must be array` });
    }
    // title/description
    if (typeof rec.title !== "string" || !rec.title.trim()) {
      errors.push({ message: `${prefix}: invalid title` });
    }
    if (typeof rec.description !== "string" || !rec.description.trim()) {
      errors.push({ message: `${prefix}: invalid description` });
    }
    if (typeof rec.imageAlt !== "string" || !rec.imageAlt.trim()) {
      errors.push({ message: `${prefix}: invalid imageAlt` });
    }
  });

  return errors;
}
