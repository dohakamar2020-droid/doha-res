import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-orange-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold text-orange-700">عصرة | ASRA</h3>
            <p className="mt-2 text-sm text-gray-600">
              موقع عربي لوصفات العصائر والسموذي والميلك شيك وكوكتيل الفواكه.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">روابط</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li><Link href="/" className="text-gray-600 hover:text-orange-700">الرئيسية</Link></li>
              <li><Link href="/recipes" className="text-gray-600 hover:text-orange-700">الوصفات</Link></li>
              <li><Link href="/about" className="text-gray-600 hover:text-orange-700">عن عصرة</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">تواصل</h4>
            <p className="mt-2 text-sm text-gray-600">جميع الحقوق محفوظة © عصرة</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
