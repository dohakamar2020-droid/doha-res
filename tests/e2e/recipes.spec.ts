import { test, expect } from "@playwright/test";

test("search filters recipes", async ({ page }) => {
  await page.goto("/recipes");
  await page.getByPlaceholder("ابحث عن وصفة أو مكون...").fill("برتقال");
  await expect(page.getByText("عصير برتقال طازج")).toBeVisible();
});

test("category filter", async ({ page }) => {
  await page.goto("/recipes?category=smoothie");
  const cards = page.locator("article");
  await expect(cards.first()).toBeVisible();
});

test("clear filters", async ({ page }) => {
  await page.goto("/recipes?q=برتقال");
  await page.getByRole("button", { name: /مسح الفلاتر/ }).click();
  await expect(page).toHaveURL(/\/recipes$/);
});

test("recipe detail and 404", async ({ page }) => {
  await page.goto("/recipes/fresh-orange-juice");
  await expect(page.getByRole("heading", { name: "عصير برتقال طازج" })).toBeVisible();
  await expect(page.getByText("المكونات")).toBeVisible();
  await page.goto("/recipes/unknown-slug");
  await expect(page.getByText("الصفحة غير موجودة")).toBeVisible();
});
