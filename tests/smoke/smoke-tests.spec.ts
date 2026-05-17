// Smoke Test Suite - Critical Path Testing
// Purpose: Quick validation of critical application features

import { test, expect } from "@playwright/test";

test.describe("Smoke Tests - SauceDemo Checkout", () => {
  test("1. Application Availability - App loads without errors", async ({
    page,
  }) => {
    // Navigate to application
    await page.goto("https://www.saucedemo.com");

    // Verify page loaded
    await expect(page).toHaveTitle("Swag Labs");

    // Verify login page is visible
    await expect(page.locator("#user-name")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
    await expect(page.locator("#login-button")).toBeVisible();

    console.log("✅ Application loaded successfully");
  });

  test("2. User Authentication - Login works correctly", async ({ page }) => {
    // Navigate to application
    await page.goto("https://www.saucedemo.com");

    // Perform login
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();

    // Verify successful login
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page.locator('[data-test="title"]')).toContainText("Products");

    console.log("✅ User authentication successful");
  });

  test("3. Browse Products - Products display correctly", async ({ page }) => {
    // Login
    await page.goto("https://www.saucedemo.com");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();

    // Verify products are displayed
    const productItems = await page
      .locator('[data-test="inventory-item"]')
      .count();
    await expect(productItems).toBeGreaterThanOrEqual(6);

    // Verify product details are visible
    await expect(page.locator(".inventory_item_name").first()).toBeVisible();
    await expect(page.locator(".inventory_item_price").first()).toBeVisible();

    console.log(
      `✅ Products displayed successfully - ${productItems} items found`,
    );
  });

  test("4. Add to Cart - Cart functionality works", async ({ page }) => {
    // Login
    await page.goto("https://www.saucedemo.com");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();

    // Add item to cart
    await page.locator("#add-to-cart-sauce-labs-backpack").click();
    await page.locator("#add-to-cart-sauce-labs-bike-light").click();

    // Verify cart badge shows correct count
    await expect(page.locator(".shopping_cart_badge")).toHaveText("2");

    // Navigate to cart
    await page.locator(".shopping_cart_link").click();

    // Verify items in cart
    await expect(page.locator('[data-test="title"]')).toContainText(
      "Your Cart",
    );
    await expect(page.locator("body")).toContainText("Sauce Labs Backpack");
    await expect(page.locator("body")).toContainText("Sauce Labs Bike Light");

    console.log("✅ Add to cart functionality works");
  });

  test("5. Complete Checkout Flow - Entire checkout process works", async ({
    page,
  }) => {
    // Login
    await page.goto("https://www.saucedemo.com");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();

    // Add items and go to cart
    await page.locator("#add-to-cart-sauce-labs-backpack").click();
    await page.locator("#add-to-cart-sauce-labs-bike-light").click();
    await page.locator(".shopping_cart_link").click();

    // Checkout
    await page.locator("#checkout").click();

    // Fill checkout information
    await page.locator("#first-name").fill("John");
    await page.locator("#last-name").fill("Doe");
    await page.locator("#postal-code").fill("12345");
    await page.locator("#continue").click();

    // Verify order overview
    await expect(page.locator('[data-test="title"]')).toContainText(
      "Checkout: Overview",
    );
    await expect(page.locator("body")).toContainText("Sauce Labs Backpack");
    await expect(page.locator("body")).toContainText("Sauce Labs Bike Light");

    // Complete order
    await page.locator("#finish").click();

    console.log("✅ Checkout flow completed successfully");
  });

  test("6. Order Confirmation - Order completes with confirmation", async ({
    page,
  }) => {
    // Login
    await page.goto("https://www.saucedemo.com");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();

    // Add items and complete checkout
    await page.locator("#add-to-cart-sauce-labs-backpack").click();
    await page.locator(".shopping_cart_link").click();
    await page.locator("#checkout").click();
    await page.locator("#first-name").fill("Jane");
    await page.locator("#last-name").fill("Smith");
    await page.locator("#postal-code").fill("54321");
    await page.locator("#continue").click();
    await page.locator("#finish").click();

    // Verify confirmation page
    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-complete.html",
    );
    await expect(page.locator('[data-test="complete-header"]')).toBeVisible();
    await expect(page.locator("body")).toContainText(
      "Thank you for your order!",
    );

    // Verify cart is cleared
    await expect(page.locator(".shopping_cart_badge")).not.toBeVisible();

    // Return to home
    await page.locator("#back-to-products").click();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    console.log("✅ Order confirmation successful");
  });
});
