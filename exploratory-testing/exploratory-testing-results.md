# Exploratory Testing Results - SCRUM-101 Checkout Workflow

## Test Execution Summary

**Date:** May 13, 2026
**Tester:** AI Agent
**Application:** SauceDemo (https://www.saucedemo.com)
**Test Credentials:** standard_user / secret_sauce

## Test Scenarios Executed

### 1. Happy Path - Complete Checkout ✅ PASSED

- **Login Process:** Successfully logged in with standard_user/secret_sauce
- **Product Selection:** Added Sauce Labs Backpack ($29.99) and Bike Light ($9.99)
- **Cart Navigation:** Successfully navigated to cart page
- **Checkout Information:** Filled form with John/Doe/12345
- **Order Overview:** Verified totals (Item total: $39.98, Tax: $3.20, Total: $43.18)
- **Order Completion:** Successfully completed order
- **Post-Order:** Returned to products page, cart cleared
- **Result:** All steps executed successfully

### 2. Validation Testing - Empty Fields ✅ PASSED

- **Empty Form Submission:** Clicked Continue without filling any fields
- **Error Message:** Displayed "Error: First Name is required"
- **Form Behavior:** Remained on checkout information page
- **Result:** Validation working as expected

### 3. Cancel Functionality ✅ PASSED

- **Cancel from Info Page:** Successfully returned to cart page
- **Cart Preservation:** Items remained in cart after cancel
- **Result:** Cancel functionality working correctly

### 4. Continue Shopping ✅ PASSED

- **Navigation:** Successfully returned to products page from cart
- **Cart Preservation:** Items remained in cart
- **Result:** Continue shopping functionality working

### 5. Remove Items ✅ PASSED

- **Multiple Items:** Added 3 items to cart
- **Item Removal:** Successfully removed items one by one
- **Cart Update:** Cart count updated correctly after removal
- **Result:** Remove functionality working correctly

### 6. Empty Cart Checkout ⚠️ POTENTIAL BUG

- **Empty Cart State:** Removed all items from cart
- **Checkout Access:** Application allowed proceeding to checkout with empty cart
- **Issue:** This violates business rule "Cart cannot be empty when proceeding to checkout"
- **Severity:** High - Should prevent empty cart checkout
- **Result:** Bug discovered - empty cart checkout permitted

## UI Element Observations

### Login Page

- Clean, simple interface with username/password fields
- Login button clearly visible
- No validation errors displayed initially

### Products Page

- Grid layout with product images, names, prices
- "Add to Cart" buttons change to "Remove" when clicked
- Shopping cart badge shows item count
- Responsive design observed

### Cart Page

- Item details displayed: name, description, price, quantity
- "Continue Shopping" and "Checkout" buttons available
- Remove buttons for each item
- Total price calculation visible

### Checkout Information Page

- Form fields: First Name, Last Name, Zip/Postal Code
- All fields required (validation on empty submission)
- Continue/Cancel buttons
- Error messages displayed for missing fields

### Checkout Overview Page

- Order summary with all items
- Payment info: "SauceCard #31337"
- Shipping info: "Free Pony Express Delivery!"
- Price breakdown: Item total, Tax, Total
- Finish/Cancel buttons

### Order Confirmation Page

- Success message: "Thank you for your order!"
- "Back Home" button to return to products
- Cart automatically cleared

## Selector Analysis for Automation

### Reliable Selectors Identified:

- **Login:** `#user-name`, `#password`, `#login-button`
- **Products:** `#add-to-cart-[product-id]`, `.shopping_cart_link`
- **Cart:** `#checkout`, `#continue-shopping`, `#remove-[product-id]`
- **Checkout Info:** `#first-name`, `#last-name`, `#postal-code`, `#continue`, `#cancel`
- **Checkout Overview:** `#finish`, `#cancel`
- **Confirmation:** `#back-to-products`

### Selector Stability:

- ID-based selectors are stable and reliable
- Class-based selectors (like `.shopping_cart_link`) are consistent
- No dynamic IDs or unstable selectors observed

## Issues Discovered

### Critical Issues:

1. **Empty Cart Checkout Allowed** (High Priority)
   - **Description:** User can proceed to checkout with empty cart
   - **Expected:** Should prevent checkout when cart is empty
   - **Actual:** Allows checkout information entry with no items
   - **Impact:** Could lead to invalid orders, poor user experience

### Minor Issues:

- None identified during exploratory testing

## Recommendations

1. **Implement empty cart validation** before allowing checkout
2. **Add client-side validation** for checkout form fields
3. **Consider adding cart total validation** (minimum order amount)
4. **Test mobile responsiveness** thoroughly
5. **Verify cross-browser compatibility** (Chrome, Firefox, Safari)

## Screenshots Captured

- `login-page.png` - Initial login screen
- `products-page.png` - Product inventory page
- `cart-page.png` - Shopping cart with items
- `checkout-info-page.png` - Checkout information form
- `checkout-overview-page.png` - Order summary page
- `order-confirmation-page.png` - Order completion page
- `validation-error-empty-fields.png` - Form validation error
- `cart-with-multiple-items.png` - Cart with multiple products
- `cart-after-removal.png` - Cart after item removal
- `empty-cart.png` - Empty cart state
- `empty-cart-checkout-allowed.png` - Empty cart checkout (bug)

## Next Steps

1. **Fix empty cart checkout bug** - Add validation to prevent checkout with empty cart
2. **Generate automated test scripts** using discovered selectors
3. **Execute automated tests** and heal any failures
4. **Create comprehensive test report** with all findings
