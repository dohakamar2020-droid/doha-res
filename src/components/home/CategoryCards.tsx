import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/types/recipe";

export function CategoryCards() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-900">التصنيفات</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((c) => (
          <Link
            key={c.id}
            href={`/recipes?category=${c.id}`}
            className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-orange-100 transition hover:shadow-md"
          >
            <div className="relative h-36 w-full overflow-hidden">
              <Image src={c.image} alt={c.label} fill className="object-cover transition group-hover:scale-105" sizes="(max-width:768px) 100vw, 25vw" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">{c.label}</h3>
              <p className="mt-1 text-sm text-gray-600">{c.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
