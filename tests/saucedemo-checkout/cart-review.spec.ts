// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Cart Review Tests", () => {
  test("Cart Review - View Items and Total", async ({ page }) => {
    // Perform login with standard_user/secret_sauce
    await page.goto("https://www.saucedemo.com");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();

    // Add Sauce Labs Backpack and Bike Light to cart
    await page.locator("#add-to-cart-sauce-labs-backpack").click();
    await page.locator("#add-to-cart-sauce-labs-bike-light").click();

    // Navigate to cart page
    await page.locator(".shopping_cart_link").click();

    // Verify cart page shows both items with correct details
    await expect(page.locator('[data-test="title"]')).toBeVisible();
    await expect(page.locator("body")).toContainText("Sauce Labs Backpack");
    await expect(page.locator("body")).toContainText("Sauce Labs Bike Light");
    await expect(page.locator("body")).toContainText("$29.99");
    await expect(page.locator("body")).toContainText("$9.99");

    // Verify Continue Shopping and Checkout buttons are visible
    await expect(page.locator("#continue-shopping")).toBeVisible();
    await expect(page.locator("#checkout")).toBeVisible();
  });
});
