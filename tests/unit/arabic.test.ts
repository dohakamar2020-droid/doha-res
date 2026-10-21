import { describe, it, expect } from "vitest";
import { normalizeArabic } from "@/lib/arabic";

describe("arabic normalization", () => {
  it("removes diacritics", () => {
    expect(normalizeArabic("عَصِير")).toBe("عصير");
  });
  it("removes tatweel", () => {
    expect(normalizeArabic("عـصير")).toBe("عصير");
  });
  it("normalizes alef variants", () => {
    expect(normalizeArabic("أنا إبراهيم آ")).toBe("انا ابراهيم ا");
  });
  it("normalizes alef maqsura and ya", () => {
    expect(normalizeArabic("على")).toBe("علي");
  });
  it("handles ta marbuta variations", () => {
    expect(normalizeArabic("تفاحة")).toBe("تفاحه");
  });
  it("trims and collapses whitespace", () => {
    expect(normalizeArabic("  عصير   برتقال  ")).toBe("عصير برتقال");
  });
});
