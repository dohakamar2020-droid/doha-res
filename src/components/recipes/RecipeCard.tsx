import Link from "next/link";
import Image from "next/image";
import type { Recipe } from "@/types/recipe";
import { CATEGORY_LABELS } from "@/types/recipe";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-orange-100 transition hover:shadow-md">
      <Link href={`/recipes/${recipe.slug}`} className="block">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={recipe.image}
            alt={recipe.imageAlt}
            fill
            className="object-cover transition hover:scale-105"
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <span className="inline-block rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {CATEGORY_LABELS[recipe.category]}
          </span>
          <h3 className="mt-2 text-lg font-semibold text-gray-900">{recipe.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-gray-600">{recipe.description}</p>
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-3">
              <span>⏱ {recipe.prepMinutes} دقيقة</span>
              <span>🍽 {recipe.servings} حصة</span>
            </div>
            <span className="font-semibold text-orange-700">{recipe.price} ر.س</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
