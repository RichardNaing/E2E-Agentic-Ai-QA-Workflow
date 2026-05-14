// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Cancel Checkout Tests", () => {
  test("Cancel Checkout from Information Page", async ({ page }) => {
    // Login, add items, navigate to checkout
    await page.goto("https://www.saucedemo.com");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();
    await page.locator("#add-to-cart-sauce-labs-backpack").click();
    await page.locator(".shopping_cart_link").click();
    await page.locator("#checkout").click();

    // Click 'Cancel' button on checkout information page
    await page.locator("#cancel").click();

    // Verify user is redirected back to cart page
    await expect(page.locator('[data-test="title"]')).toContainText(
      "Your Cart",
    );
    await expect(page.locator("body")).toContainText("Sauce Labs Backpack");

    // Verify items still in cart
    await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
  });

  test("Cancel Checkout from Overview Page", async ({ page }) => {
    // Login, add items, fill checkout info, proceed to overview
    await page.goto("https://www.saucedemo.com");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();
    await page.locator("#add-to-cart-sauce-labs-backpack").click();
    await page.locator(".shopping_cart_link").click();
    await page.locator("#checkout").click();

    // Fill checkout information
    await page.locator("#first-name").fill("John");
    await page.locator("#last-name").fill("Doe");
    await page.locator("#postal-code").fill("12345");
    await page.locator("#continue").click();

    // Click 'Cancel' button on overview page
    await page.locator("#cancel").click();

    // Verify user is redirected back to products page (not cart)
    await expect(page.locator('[data-test="title"]')).toContainText("Products");
    await expect(page.locator("body")).toContainText("Sauce Labs Backpack");

    // Verify items still in cart
    await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
  });
});
