import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getRecipeBySlug, getRelatedRecipes, getAllSlugs } from "@/lib/recipes";
import { CATEGORY_LABELS } from "@/types/recipe";
import { getSiteUrl } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) return {};
  const url = getSiteUrl();
  return {
    title: recipe.title,
    description: recipe.description,
    alternates: { canonical: `/recipes/${recipe.slug}` },
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      type: "article",
      url: `${url}/recipes/${recipe.slug}`,
      images: [{ url: recipe.image, alt: recipe.imageAlt }],
    },
  };
}

export default async function RecipeDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) notFound();

  const related = getRelatedRecipes(recipe);
  const url = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.description,
    image: `${url}${recipe.image}`,
    prepTime: `PT${recipe.prepMinutes}M`,
    recipeYield: `${recipe.servings} حصة`,
    recipeCategory: CATEGORY_LABELS[recipe.category],
    recipeIngredient: recipe.ingredients.map((i) => `${i.quantity} ${i.unit} ${i.name}`),
    recipeInstructions: recipe.steps.map((s, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      text: s,
    })),
    keywords: recipe.tags.join(", "),
    inLanguage: "ar",
  };

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/recipes" className="text-sm text-orange-700 hover:underline">← العودة إلى الوصفات</Link>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="mt-4 text-3xl font-bold text-gray-900">{recipe.title}</h1>
      <p className="mt-2 text-gray-600">{recipe.description}</p>

      <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
        <span>⏱ وقت التحضير: {recipe.prepMinutes} دقيقة</span>
        <span>🍽 عدد الحصص: {recipe.servings}</span>
        <span>📂 {CATEGORY_LABELS[recipe.category]}</span>
        <span className="font-semibold text-orange-700">💰 السعر: {recipe.price} ر.س</span>
      </div>

      <div className="relative mt-6 h-72 w-full overflow-hidden rounded-2xl sm:h-96">
        <Image
          src={recipe.image}
          alt={recipe.imageAlt}
          fill
          priority
          className="object-cover"
          sizes="(max-width:768px) 100vw, 800px"
        />
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-gray-900">المكونات</h2>
        <ul className="mt-3 space-y-2">
          {recipe.ingredients.map((ing, idx) => (
            <li key={idx} className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-sm ring-1 ring-orange-100">
              <span className="font-medium text-orange-700">{ing.quantity} {ing.unit}</span>
              <span>{ing.name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-gray-900">طريقة التحضير</h2>
        <ol className="mt-3 space-y-3">
          {recipe.steps.map((step, idx) => (
            <li key={idx} className="flex gap-3 rounded-lg bg-white p-3 shadow-sm ring-1 ring-orange-100">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                {idx + 1}
              </span>
              <span className="text-gray-700">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {recipe.tips && recipe.tips.length > 0 && (
        <section className="mt-8 rounded-2xl bg-green-50 p-5 ring-1 ring-green-200">
          <h2 className="text-xl font-bold text-green-800">نصائح</h2>
          <ul className="mt-3 list-disc space-y-1 pr-5 text-gray-700">
            {recipe.tips.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-900">وصفات ذات صلة</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/recipes/${r.slug}`}
                className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-orange-100 hover:shadow-md"
              >
                <div className="relative h-32 w-full overflow-hidden rounded-lg">
                  <Image src={r.image} alt={r.imageAlt} fill className="object-cover" sizes="33vw" />
                </div>
                <p className="mt-2 font-medium text-gray-900">{r.title}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
