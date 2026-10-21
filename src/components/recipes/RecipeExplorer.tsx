"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { RecipeCard } from "./RecipeCard";
import type { Recipe, RecipeCategory } from "@/types/recipe";
import { CATEGORY_LABELS, VALID_CATEGORIES } from "@/types/recipe";
import { normalizeArabic } from "@/lib/arabic";

type SortOption = "title" | "prepTime";

export function RecipeExplorer({ recipes }: { recipes: Recipe[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState<RecipeCategory | "all">(
    (searchParams.get("category") as RecipeCategory | "all") ?? "all"
  );
  const [sort, setSort] = useState<SortOption>(
    (searchParams.get("sort") as SortOption) ?? "title"
  );

  // Sync state from URL on param change
  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
    setCategory((searchParams.get("category") as RecipeCategory | "all") ?? "all");
    setSort((searchParams.get("sort") as SortOption) ?? "title");
  }, [searchParams]);

  // Update URL when filters change
  const updateUrl = (q: string, cat: string, s: string) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (cat && cat !== "all") params.set("category", cat);
    if (s && s !== "title") params.set("sort", s);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const filtered = useMemo(() => {
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
    } else {
      result = [...result].sort((a, b) => a.prepMinutes - b.prepMinutes);
    }
    return result;
  }, [recipes, query, category, sort]);

  const handleQuery = (v: string) => {
    setQuery(v);
    updateUrl(v, category, sort);
  };
  const handleCategory = (v: RecipeCategory | "all") => {
    setCategory(v);
    updateUrl(query, v, sort);
  };
  const handleSort = (v: SortOption) => {
    setSort(v);
    updateUrl(query, category, v);
  };
  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setSort("title");
    router.replace(pathname, { scroll: false });
  };

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="sr-only" htmlFor="search">بحث</label>
        <input
          id="search"
          type="search"
          value={query}
          onChange={(e) => handleQuery(e.target.value)}
          placeholder="ابحث عن وصفة أو مكون..."
          className="flex-1 rounded-full border border-orange-200 bg-white px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
        />
        <select
          value={category}
          onChange={(e) => handleCategory(e.target.value as RecipeCategory | "all")}
          aria-label="التصنيف"
          className="rounded-full border border-orange-200 bg-white px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
        >
          <option value="all">جميع التصنيفات</option>
          {VALID_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_LABELS[c]}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => handleSort(e.target.value as SortOption)}
          aria-label="الترتيب"
          className="rounded-full border border-orange-200 bg-white px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
        >
          <option value="title">الترتيب حسب الاسم</option>
          <option value="prepTime">الترتيب حسب وقت التحضير</option>
        </select>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <span>{filtered.length} وصفة</span>
        {(query || category !== "all" || sort !== "title") && (
          <button onClick={clearFilters} className="text-orange-700 hover:underline">
            مسح الفلاتر
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-12 rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-orange-100">
          <p className="text-gray-600">لا توجد وصفات مطابقة. جرّب كلمات أخرى أو امسح الفلاتر.</p>
          <button onClick={clearFilters} className="mt-4 text-orange-700 hover:underline">
            مسح الفلاتر
          </button>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      )}
    </div>
  );
}
