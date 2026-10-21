import Link from "next/link";
import { MobileNav } from "./MobileNav";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/recipes", label: "الوصفات" },
  { href: "/about", label: "عن عصرة" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-orange-100 bg-white/90 backdrop-blur">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-orange-700">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-white">ع</span>
          <span>عصرة <span className="text-green-700">| ASRA</span></span>
        </Link>
        <nav aria-label="التنقل الرئيسي" className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
