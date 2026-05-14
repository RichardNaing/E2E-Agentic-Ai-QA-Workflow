// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Edge Case Tests", () => {
  test("Edge Case - Checkout with Empty Cart", async ({ page }) => {
    // Login to application
    await page.goto("https://www.saucedemo.com");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();

    // Ensure cart is empty
    await expect(page.locator(".shopping_cart_badge")).not.toBeVisible();

    // Click cart icon then 'Checkout'
    await page.locator(".shopping_cart_link").click();
    await page.locator("#checkout").click();

    // Document that empty cart checkout is permitted
    await expect(page.locator('[data-test="title"]')).toContainText(
      "Checkout: Your Information",
    );
    await expect(page.locator("#first-name")).toBeVisible();

    // Note: Application allows checkout with empty cart - potential bug
  });
});
