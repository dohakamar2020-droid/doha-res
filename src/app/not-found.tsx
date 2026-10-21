import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-900">404</h1>
      <p className="mt-2 text-gray-600">الصفحة غير موجودة.</p>
      <Link href="/" className="mt-4 inline-block text-orange-700 hover:underline">العودة للرئيسية</Link>
    </div>
  );
}
