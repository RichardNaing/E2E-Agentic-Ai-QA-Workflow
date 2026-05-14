// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Checkout Flow Tests", () => {
  test("Happy Path - Complete Checkout", async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com
    await page.goto("https://www.saucedemo.com");

    // 2. Enter 'standard_user' in the username field
    await page.locator("#user-name").fill("standard_user");
    await expect(page.locator("#user-name")).toHaveValue("standard_user");

    // 3. Enter 'secret_sauce' in the password field
    await page.locator("#password").fill("secret_sauce");
    await expect(page.locator("#password")).toHaveValue("secret_sauce");

    // 4. Click the 'Login' button
    await page.locator("#login-button").click();
    await expect(page.locator('[data-test="title"]')).toBeVisible();

    // 5. Click 'Add to cart' for Sauce Labs Backpack
    await page.locator("#add-to-cart-sauce-labs-backpack").click();
    await expect(
      page.locator('[data-test="remove-sauce-labs-backpack"]'),
    ).toBeVisible();

    // 6. Click 'Add to cart' for Sauce Labs Bike Light
    await page.locator("#add-to-cart-sauce-labs-bike-light").click();
    await expect(
      page.locator('[data-test="remove-sauce-labs-bike-light"]'),
    ).toBeVisible();
    await expect(page.locator(".shopping_cart_badge")).toHaveText("2");

    // 7. Click the shopping cart icon
    await page.locator(".shopping_cart_link").click();
    await expect(page.locator('[data-test="title"]')).toContainText(
      "Your Cart",
    );
    await expect(page.locator("body")).toContainText("Sauce Labs Backpack");
    await expect(page.locator("body")).toContainText("Sauce Labs Bike Light");

    // 8. Click the 'Checkout' button
    await page.locator("#checkout").click();
    await expect(page.locator('[data-test="title"]')).toBeVisible();
    await expect(page.locator('[data-test="firstName"]')).toBeVisible();

    // 9. Enter 'John' in First Name field
    await page.locator("#first-name").fill("John");
    await expect(page.locator("#first-name")).toHaveValue("John");

    // 10. Enter 'Doe' in Last Name field
    await page.locator("#last-name").fill("Doe");
    await expect(page.locator("#last-name")).toHaveValue("Doe");

    // 11. Enter '12345' in Zip/Postal Code field
    await page.locator("#postal-code").fill("12345");
    await expect(page.locator("#postal-code")).toHaveValue("12345");

    // 12. Click the 'Continue' button
    await page.locator("#continue").click();
    await expect(page.locator('[data-test="title"]')).toBeVisible();

    // 13. Verify order overview details
    await expect(
      page.locator('[data-test="payment-info-value"]'),
    ).toBeVisible();
    await expect(page.locator("body")).toContainText(
      "Free Pony Express Delivery!",
    );
    await expect(page.locator("body")).toContainText("$39.98");
    await expect(page.locator("body")).toContainText("$3.20");
    await expect(page.locator("body")).toContainText("$43.18");

    // 14. Click the 'Finish' button
    await page.locator("#finish").click();
    await expect(page.locator('[data-test="title"]')).toBeVisible();
    await expect(page.locator('[data-test="complete-header"]')).toBeVisible();
    await expect(page.locator(".shopping_cart_badge")).not.toBeVisible();

    // 15. Click 'Back Home' button
    await page.locator("#back-to-products").click();
    await expect(page.locator('[data-test="title"]')).toBeVisible();
  });
});
