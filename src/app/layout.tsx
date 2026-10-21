import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSiteUrl } from "@/lib/site";

const cairo = localFont({
  src: [
    { path: "../../node_modules/@fontsource/cairo/files/cairo-arabic-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../node_modules/@fontsource/cairo/files/cairo-arabic-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../../node_modules/@fontsource/cairo/files/cairo-arabic-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../../node_modules/@fontsource/cairo/files/cairo-arabic-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../../node_modules/@fontsource/cairo/files/cairo-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../node_modules/@fontsource/cairo/files/cairo-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../../node_modules/@fontsource/cairo/files/cairo-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../../node_modules/@fontsource/cairo/files/cairo-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "عصرة | ASRA — وصفات عصائر عربية",
    template: "%s | عصرة",
  },
  description: "اكتشف وصفات عصائر طبيعية وسموذي وميلك شيك وكوكتيل فواكه مع تعليمات تحضير واضحة.",
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: "عصرة | ASRA",
    title: "عصرة | ASRA — وصفات عصائر عربية",
    description: "اكتشف وصفات عصائر طبيعية وسموذي وميلك شيك وكوكتيل فواكه.",
  },
  twitter: {
    card: "summary_large_image",
    title: "عصرة | ASRA",
    description: "وصفات عصائر عربية",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="min-h-screen bg-orange-50 text-gray-800 antialiased" style={{ fontFamily: "var(--font-cairo), Cairo, sans-serif" }}>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:right-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2">
          تخطي إلى المحتوى
        </a>
        <Header />
        <main id="main" className="min-h-[60vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
