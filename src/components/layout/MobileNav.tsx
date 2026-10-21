"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/recipes", label: "الوصفات" },
  { href: "/about", label: "عن عصرة" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="rounded-lg p-2 text-gray-700 hover:bg-orange-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {open ? (
            <path d="M6 6l12 12M6 18L18 6" />
          ) : (
            <>
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </>
          )}
        </svg>
      </button>
      {open && (
        <div className="absolute inset-x-0 top-full z-50 border-t border-orange-100 bg-white shadow-lg">
          <nav aria-label="التنقل mobile" className="flex flex-col p-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-orange-50"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
