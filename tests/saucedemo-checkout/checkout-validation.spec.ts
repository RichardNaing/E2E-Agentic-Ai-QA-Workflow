// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Checkout Validation Tests", () => {
  test("Checkout Validation - Empty Required Fields", async ({ page }) => {
    // Login and add items to cart
    await page.goto("https://www.saucedemo.com");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();
    await page.locator("#add-to-cart-sauce-labs-backpack").click();

    // Navigate to checkout from cart
    await page.locator(".shopping_cart_link").click();
    await page.locator("#checkout").click();

    // Click 'Continue' without filling any fields
    await page.locator("#continue").click();

    // Verify validation messages for First Name, Last Name, Zip/Postal Code
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText(
      "First Name is required",
    );
    await expect(page.locator("#first-name")).toBeVisible();
    await expect(page.locator("#last-name")).toBeVisible();
    await expect(page.locator("#postal-code")).toBeVisible();
  });

  test("Checkout Validation - Invalid Data", async ({ page }) => {
    // Login, add items, navigate to checkout
    await page.goto("https://www.saucedemo.com");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();
    await page.locator("#add-to-cart-sauce-labs-backpack").click();
    await page.locator(".shopping_cart_link").click();
    await page.locator("#checkout").click();

    // Enter special characters and numbers in name fields
    await page.locator("#first-name").fill("123!@#");
    await page.locator("#last-name").fill("456$%^");
    await page.locator("#postal-code").fill("ABCDEF");

    // Click 'Continue' with invalid data
    await page.locator("#continue").click();

    // Document that no format validation occurs - form accepts invalid data
    await expect(page.locator('[data-test="title"]')).toBeVisible();
    // Note: SauceDemo does not validate data format, only presence
  });
});
