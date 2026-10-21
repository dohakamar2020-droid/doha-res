/**
 * Arabic text normalization utilities for search.
 */

export function normalizeArabic(input: string): string {
  if (!input) return "";
  let text = input;

  // Trim and collapse whitespace
  text = text.trim().replace(/\s+/g, " ");

  // Remove diacritics (tashkeel)
  text = text.replace(/[\u064B-\u065F\u0670]/g, "");

  // Remove tatweel (kashida)
  text = text.replace(/\u0640/g, "");

  // Normalize alef variants
  text = text.replace(/[\u0622\u0623\u0625]/g, "\u0627");

  // Normalize alef maqsura and ya
  text = text.replace(/\u0649/g, "\u064A");

  // Handle ta marbuta variations: normalize to ha? Common approach: treat ta marbuta and ha interchangeably.
  // We normalize ta marbuta to ha for matching flexibility.
  text = text.replace(/\u0629/g, "\u0647");

  // Lowercase (for any latin)
  text = text.toLowerCase();

  return text;
}

export function normalizeForSearch(input: string): string {
  return normalizeArabic(input);
}
