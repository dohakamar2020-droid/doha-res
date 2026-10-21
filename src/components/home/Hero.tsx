import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-bl from-orange-100 to-orange-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
            اكتشف عالم العصائر الطازجة
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            وصفات عربية بسيطة ولذيذة للعصائر والسموذي والميلك شيك وكوكتيل الفواكه، مع تعليمات تحضير واضحة.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/recipes" variant="primary">تصفح الوصفات</Button>
            <Button href="/about" variant="ghost">عن عصرة</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
