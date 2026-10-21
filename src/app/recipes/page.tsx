import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllRecipes } from "@/lib/recipes";
import { RecipeExplorer } from "@/components/recipes/RecipeExplorer";

export const metadata: Metadata = {
  title: "الوصفات",
  description: "تصفح جميع وصفات العصائر والسموذي والميلك شيك وكوكتيل الفواكه.",
  alternates: { canonical: "/recipes" },
};

export default function RecipesPage() {
  const recipes = getAllRecipes();
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">الوصفات</h1>
      <p className="mt-2 text-gray-600">ابحث وفلتر ورتّب الوصفات حسب تفضيلك.</p>
      <div className="mt-6">
        <Suspense fallback={<div>جارٍ التحميل...</div>}>
          <RecipeExplorer recipes={recipes} />
        </Suspense>
      </div>
    </div>
  );
}
