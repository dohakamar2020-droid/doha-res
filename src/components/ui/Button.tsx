import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const variants: Record<string, string> = {
  primary: "bg-orange-500 text-gray-900 hover:bg-orange-600 focus-visible:outline-orange-500",
  secondary: "bg-green-700 text-white hover:bg-green-800 focus-visible:outline-green-700",
  ghost: "bg-white text-gray-800 border border-gray-200 hover:bg-orange-50 focus-visible:outline-orange-500",
};

export function Button({ children, href, variant = "primary", className = "", type = "button", onClick }: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
