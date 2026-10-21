import { RecipeCard } from "@/components/recipes/RecipeCard";
import { getLatestRecipes } from "@/lib/recipes";

export function LatestRecipes() {
  const recipes = getLatestRecipes(6);
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-900">أحدث الوصفات</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((r) => (
          <RecipeCard key={r.id} recipe={r} />
        ))}
      </div>
    </section>
  );
}
