import Link from "next/link";
import { RecipeCard } from "@/components/recipes/RecipeCard";
import { getFeaturedRecipes } from "@/lib/recipes";

export function FeaturedRecipes() {
  const recipes = getFeaturedRecipes();
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-bold text-gray-900">وصفات مميزة</h2>
        <Link href="/recipes" className="text-sm font-medium text-orange-700 hover:underline">عرض الكل</Link>
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((r) => (
          <RecipeCard key={r.id} recipe={r} />
        ))}
      </div>
    </section>
  );
}
