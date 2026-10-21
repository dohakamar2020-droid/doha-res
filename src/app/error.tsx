"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 text-center">
      <h2 className="text-xl font-bold text-gray-900">حدث خطأ غير متوقع</h2>
      <p className="mt-2 text-gray-600">{error.message}</p>
      <button onClick={reset} className="mt-4 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600">
        إعادة المحاولة
      </button>
    </div>
  );
}
