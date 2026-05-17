# Smoke Test Plan - SauceDemo Checkout

**Date:** May 17, 2026
**Application:** SauceDemo (https://www.saucedemo.com)
**Purpose:** Quick validation that critical application features are working

## Smoke Test Scope

Smoke tests cover the most critical user journeys. Each test is quick and high-level.

## Smoke Test Scenarios

### 1. Application Availability

**Objective:** Verify the application loads without errors
**Steps:**

1. Navigate to https://www.saucedemo.com
2. Wait for page to load
   **Expected Result:**

- Application loads successfully
- Login page displays
- No 500 errors or critical failures

---

### 2. User Authentication

**Objective:** Verify user login functionality
**Steps:**

1. Navigate to application
2. Enter username: standard_user
3. Enter password: secret_sauce
4. Click Login button
   **Expected Result:**

- User successfully logged in
- Redirected to products page
- Products are visible

---

### 3. Browse Products

**Objective:** Verify product inventory displays
**Steps:**

1. Log in as standard_user
2. Verify products are displayed on inventory page
3. Check product information (name, price, image)
   **Expected Result:**

- At least 6 products visible
- Product images load
- Prices display correctly

---

### 4. Add to Cart Functionality

**Objective:** Verify adding items to cart works
**Steps:**

1. Log in as standard_user
2. Click "Add to Cart" for first product
3. Verify cart badge shows count
4. Navigate to cart page
   **Expected Result:**

- Item added to cart
- Cart badge displays item count
- Item visible in cart page

---

### 5. Complete Checkout Flow

**Objective:** Verify entire checkout process works end-to-end
**Steps:**

1. Log in as standard_user
2. Add 2 items to cart
3. Go to cart page
4. Click Checkout
5. Fill in information (First Name, Last Name, Zip)
6. Click Continue
7. Verify order overview
8. Click Finish
   **Expected Result:**

- All pages load correctly
- Form validation works
- Order completes successfully

---

### 6. Order Confirmation

**Objective:** Verify order confirmation page displays
**Steps:**

1. Complete checkout flow from above
2. Observe confirmation page
3. Verify success message
4. Click "Back Home"
   **Expected Result:**

- Confirmation page displays "Thank you for your order"
- Cart is cleared
- Return to products page works

---

## Test Data Required

- **Username:** standard_user
- **Password:** secret_sauce
- **Test Items:** Sauce Labs Backpack, Sauce Labs Bike Light

## Success Criteria

- All 6 smoke tests pass
- No critical errors encountered
- Application is ready for further testing

## Pass/Fail Threshold

- **PASS:** 6/6 tests pass (100%)
- **FAIL:** Any critical test fails
