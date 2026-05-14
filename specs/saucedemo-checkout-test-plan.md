# SauceDemo Checkout Test Plan

## Application Overview

This comprehensive test plan covers the complete e-commerce checkout workflow for the SauceDemo application based on user story SCRUM-101. It includes happy path scenarios, negative testing for validation errors and invalid data, edge cases such as empty cart checkout and item removal, navigation flow tests including back buttons and cancel options, and UI element validation to ensure all required components are present and functional.

## Test Scenarios

### 1. Checkout Flow Tests

**Seed:** `tests/seed.spec.ts`

#### 1.1. Happy Path - Complete Checkout

**File:** `tests/checkout/happy-path.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com
    - expect: User is redirected to the products page
    - expect: Login form is no longer visible
  2. Enter 'standard_user' in the username field
    - expect: Username field is filled with 'standard_user'
  3. Enter 'secret_sauce' in the password field
    - expect: Password field is filled with 'secret_sauce'
  4. Click the 'Login' button
    - expect: User is logged in and redirected to the inventory page
    - expect: Products are displayed
  5. Click 'Add to cart' for Sauce Labs Backpack
    - expect: 'Add to cart' button for Sauce Labs Backpack changes to 'Remove'
  6. Click 'Add to cart' for Sauce Labs Bike Light
    - expect: 'Add to cart' button for Sauce Labs Bike Light changes to 'Remove'
    - expect: Cart badge shows '2'
  7. Click the shopping cart icon
    - expect: Cart page displays with 2 items
    - expect: Items show name, description, price, quantity
  8. Click the 'Checkout' button
    - expect: User is redirected to checkout information page
    - expect: Form fields for First Name, Last Name, Zip/Postal Code are visible
  9. Enter 'John' in First Name field
    - expect: First Name field is filled
  10. Enter 'Doe' in Last Name field
    - expect: Last Name field is filled
  11. Enter '12345' in Zip/Postal Code field
    - expect: Zip/Postal Code field is filled
  12. Click the 'Continue' button
    - expect: User is redirected to checkout overview page
    - expect: Order summary is displayed
  13. Verify order overview details
    - expect: Overview shows items, payment info 'SauceCard #31337', shipping 'Free Pony Express Delivery!', item total '$39.98', tax '$3.20', total '$43.18'
  14. Click the 'Finish' button
    - expect: User is redirected to order confirmation page
    - expect: 'Thank you for your order!' message is displayed
    - expect: Cart is cleared (no badge)
  15. Click 'Back Home' button
    - expect: User is redirected back to products page

#### 1.2. Cart Review - View Items and Total

**File:** `tests/checkout/cart-review.spec.ts`

**Steps:**
  1. Perform login with standard_user/secret_sauce
    - expect: User is on products page
  2. Add Sauce Labs Backpack and Bike Light to cart
    - expect: Items added to cart
  3. Navigate to cart page
    - expect: Cart page shows both items with correct details
    - expect: Continue Shopping and Checkout buttons are visible
  4. Verify item information in cart
    - expect: Item details match: names, descriptions, prices ($29.99 and $9.99)

#### 1.3. Checkout Validation - Empty Required Fields

**File:** `tests/checkout/checkout-validation-empty.spec.ts`

**Steps:**
  1. Login and add items to cart
    - expect: User is logged in with items in cart
  2. Navigate to checkout from cart
    - expect: Checkout information page is displayed
  3. Click 'Continue' without filling any fields
    - expect: Error message 'Error: First Name is required' is displayed
    - expect: User remains on checkout information page
  4. Verify validation messages for First Name, Last Name, Zip/Postal Code
    - expect: Error message appears for each empty field

#### 1.4. Checkout Validation - Invalid Data

**File:** `tests/checkout/checkout-validation-invalid.spec.ts`

**Steps:**
  1. Login, add items, navigate to checkout
    - expect: Checkout information page is displayed
  2. Enter special characters and numbers in name fields (e.g., '123!@#' in First Name)
    - expect: Fields accept input without validation errors
  3. Click 'Continue' with invalid data
    - expect: Form accepts invalid data and proceeds to overview
  4. Document that no format validation occurs
    - expect: Note: SauceDemo does not validate data format, only presence

#### 1.5. Cancel Checkout from Information Page

**File:** `tests/checkout/cancel-checkout-info.spec.ts`

**Steps:**
  1. Login, add items, navigate to checkout
    - expect: Checkout information page is displayed
  2. Click 'Cancel' button on checkout information page
    - expect: User is redirected back to cart page
  3. Verify items still in cart
    - expect: Cart contents are preserved

#### 1.6. Cancel Checkout from Overview Page

**File:** `tests/checkout/cancel-overview.spec.ts`

**Steps:**
  1. Login, add items, fill checkout info, proceed to overview
    - expect: Checkout overview page is displayed
  2. Click 'Cancel' button on overview page
    - expect: User is redirected back to cart page
  3. Verify items still in cart
    - expect: Cart contents are preserved

#### 1.7. Continue Shopping from Cart

**File:** `tests/checkout/continue-shopping.spec.ts`

**Steps:**
  1. Login and add items to cart
    - expect: Cart page is displayed with items
  2. Click 'Continue Shopping' button from cart
    - expect: User is redirected back to products page
  3. Verify return to inventory page
    - expect: Products page is displayed
    - expect: Cart contents are preserved

#### 1.8. Remove Item from Cart

**File:** `tests/checkout/remove-item.spec.ts`

**Steps:**
  1. Login and add 3 items to cart
    - expect: Multiple items in cart
  2. Click 'Remove' button for one item in cart
    - expect: Item count decreases
    - expect: Removed item no longer appears
  3. Verify cart contents after removal
    - expect: Cart shows remaining items correctly

#### 1.9. Edge Case - Checkout with Empty Cart

**File:** `tests/checkout/empty-cart-checkout.spec.ts`

**Steps:**
  1. Login to application
    - expect: User is logged in
  2. Ensure cart is empty
    - expect: Cart is empty (no badge)
  3. Click cart icon then 'Checkout'
    - expect: User can access checkout information page
  4. Document that empty cart checkout is permitted
    - expect: Note: Application allows checkout with empty cart - potential bug

#### 1.10. Navigation - Back Buttons and Browser Navigation

**File:** `tests/checkout/navigation-back-buttons.spec.ts`

**Steps:**
  1. Navigate through checkout flow
    - expect: Various pages accessible
  2. Use browser back button at different steps
    - expect: Back navigation works correctly
  3. Test all 'Cancel' and 'Go back' buttons
    - expect: Cancel buttons return to appropriate pages

#### 1.11. UI Elements Validation

**File:** `tests/checkout/ui-elements-validation.spec.ts`

**Steps:**
  1. Navigate through all checkout pages
    - expect: All required elements are present and functional
  2. Verify presence of headers, buttons, form fields, images, links
    - expect: Buttons are clickable, forms are fillable, text is readable
  3. Check for proper alignment and styling
    - expect: Layout is consistent across pages
