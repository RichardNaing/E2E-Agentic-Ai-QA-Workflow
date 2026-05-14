// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Navigation and Item Management Tests", () => {
  test("Continue Shopping from Cart", async ({ page }) => {
    // Login and add items to cart
    await page.goto("https://www.saucedemo.com");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();
    await page.locator("#add-to-cart-sauce-labs-backpack").click();

    // Navigate to cart page
    await page.locator(".shopping_cart_link").click();
    await expect(page.locator('[data-test="title"]')).toContainText(
      "Your Cart",
    );

    // Click 'Continue Shopping' button from cart
    await page.locator("#continue-shopping").click();

    // Verify return to inventory page
    await expect(page.locator('[data-test="title"]')).toContainText("Products");

    // Verify cart contents are preserved
    await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
  });

  test("Remove Item from Cart", async ({ page }) => {
    // Login and add 3 items to cart
    await page.goto("https://www.saucedemo.com");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();

    await page.locator("#add-to-cart-sauce-labs-backpack").click();
    await page.locator("#add-to-cart-sauce-labs-bike-light").click();
    await page.locator("#add-to-cart-sauce-labs-bolt-t-shirt").click();

    // Verify multiple items in cart
    await expect(page.locator(".shopping_cart_badge")).toHaveText("3");

    // Navigate to cart
    await page.locator(".shopping_cart_link").click();

    // Click 'Remove' button for one item in cart
    await page.locator("#remove-sauce-labs-bike-light").click();

    // Verify cart contents after removal
    await expect(page.locator(".shopping_cart_badge")).toHaveText("2");
    await expect(page.locator("body")).toContainText("Sauce Labs Backpack");
    await expect(page.locator("body")).toContainText("Sauce Labs Bolt T-Shirt");
    await expect(page.locator("body")).not.toContainText(
      "Sauce Labs Bike Light",
    );
  });
});
