import { test, expect } from "@playwright/test";

test("homepage loads and has CTA", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /اكتشف عالم العصائر/ })).toBeVisible();
  await page.getByRole("link", { name: /تصفح الوصفات/ }).click();
  await expect(page).toHaveURL(/\/recipes/);
});

test("mobile navigation works", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/");
  await page.getByRole("button", { name: /فتح القائمة/ }).click();
  await page.getByRole("link", { name: "الوصفات" }).click();
  await expect(page).toHaveURL(/\/recipes/);
});
