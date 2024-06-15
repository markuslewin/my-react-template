import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/my react template/i);
});

test("receives data from function", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByTestId("server-message")).toHaveText("Hello, world!");
});
