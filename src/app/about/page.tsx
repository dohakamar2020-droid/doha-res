import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "عن عصرة",
  description: "تعرف على عصرة | ASRA — موقع عربي لوصفات العصائر.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">عن عصرة</h1>
      <p className="mt-4 text-gray-700">
        عصرة | ASRA هو موقع عربي مخصص لمشاركة وصفات العصائر والسموذي والميلك شيك وكوكتيل الفواكه.
        نهدف إلى تقديم وصفات بسيطة وواضحة مع تعليمات تحضير دقيقة ومكونات متوفرة.
      </p>
      <p className="mt-4 text-gray-700">
        تم تصميم الموقع ليكون سريعاً وسهل الاستخدام على جميع الأجهزة، مع دعم كامل للغة العربية واتجاه RTL.
      </p>
    </div>
  );
}
