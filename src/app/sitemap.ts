import type { MetadataRoute } from "next";
import { getAllRecipes } from "@/lib/recipes";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const recipes = getAllRecipes();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/recipes`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];
  const recipeRoutes: MetadataRoute.Sitemap = recipes.map((r) => ({
    url: `${base}/recipes/${r.slug}`,
    lastModified: new Date(r.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  return [...staticRoutes, ...recipeRoutes];
}
