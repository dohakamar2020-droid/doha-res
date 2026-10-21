# عصرة | ASRA

موقع عربي لوصفات العصائر والسموذي والميلك شيك وكوكتيل الفواكه.

## التقنيات

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Vitest + React Testing Library
- Playwright

## التثبيت والتشغيل

```bash
npm install
npm run dev
```

افتح http://localhost:3000

## السكربتات

- `npm run dev` — تشغيل بيئة التطوير
- `npm run build` — بناء الإنتاج
- `npm run start` — تشغيل بناء الإنتاج
- `npm run lint` — فحص ESLint
- `npm run typecheck` — فحص TypeScript
- `npm run test` — اختبارات الوحدة
- `npm run test:e2e` — اختبارات E2E

## تعديل المحتوى

الوصفات مخزنة في `src/data/recipes.json`. أضف أو عدّل وصفة مع التأكد من:
- عدم تكرار `id` أو `slug`
- استخدام تصنيفات صحيحة: `natural`, `smoothie`, `milkshake`, `cocktail`
- وجود ملف الصورة في `public/images/recipes`

## النشر على Vercel

1. ارفع المشروع إلى GitHub.
2. استورد المستودع في Vercel.
3. اضبط متغير البيئة `NEXT_PUBLIC_SITE_URL` على رابط الإنتاج.
4. Vercel سيكتشف Next.js تلقائياً.

## GitHub Actions

يتم تشغيل فحوصات CI على كل push و pull request (lint, typecheck, tests, build, E2E).

## ملاحظات

- لا توجد قاعدة بيانات أو خدمات مدفوعة.
- الصور محلية في `public/images/recipes`.
