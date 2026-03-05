import { test, expect } from '@playwright/test';

/**
 * Cart E2E tests.
 * Requires Shopify store to be connected and products to exist.
 */

test.describe('Cart page', () => {
  test('empty cart shows empty state', async ({ page }) => {
    // Clear all storage and reload so Zustand re-hydrates with null cartId
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    await page.goto('/cart');
    await expect(page.getByText(/cart is empty/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /Continue Shopping/i })).toBeVisible();
  });
});

test.describe('Add to cart flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear all storage and reload so Zustand re-hydrates with null cartId
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('can select size and add product to cart', async ({ page }) => {
    await page.goto('/products/apex-runner-pro');

    // Select first available size
    const sizeButton = page.getByRole('button').filter({ hasText: /UK \d+/i }).first();
    await expect(sizeButton).toBeVisible();
    await sizeButton.click();

    // Add to cart button should now be active
    const addBtn = page.getByRole('button', { name: /Add to Cart/i });
    await expect(addBtn).toBeEnabled();

    // Wait for the cart API response before navigating
    await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/cart') && r.status() === 200),
      addBtn.click(),
    ]);

    // Navigate to cart page to verify
    await page.goto('/cart');
    await expect(page.getByText('Apex Runner Pro')).toBeVisible();
  });

  test('cart persists across page navigation', async ({ page }) => {
    await page.goto('/products/bounce-jr');

    // Select first available size
    const sizeButton = page.getByRole('button').filter({ hasText: /UK \d+/i }).first();
    await expect(sizeButton).toBeVisible();
    await sizeButton.click();

    const addBtn = page.getByRole('button', { name: /Add to Cart/i });
    await expect(addBtn).toBeEnabled();

    await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/cart') && r.status() === 200),
      addBtn.click(),
    ]);

    // Navigate to homepage and back to cart
    await page.goto('/');
    await page.goto('/cart');

    // Item should still be in cart (Shopify cart persists via cartId in localStorage)
    await expect(page.getByText('Bounce Jr.')).toBeVisible();
  });

  test('can remove item from cart', async ({ page }) => {
    // First add an item
    await page.goto('/products/luna-comfort-slip');

    const sizeButton = page.getByRole('button').filter({ hasText: /UK \d+/i }).first();
    await expect(sizeButton).toBeVisible();
    await sizeButton.click();

    const addBtn = page.getByRole('button', { name: /Add to Cart/i });
    await expect(addBtn).toBeEnabled();

    await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/cart') && r.status() === 200),
      addBtn.click(),
    ]);

    await page.goto('/cart');
    await expect(page.getByText('Luna Comfort Slip')).toBeVisible();

    // Remove the item
    const removeBtn = page.getByRole('button', { name: /Remove Luna Comfort Slip from cart/i });
    await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/cart') && r.status() === 200),
      removeBtn.click(),
    ]);

    // Cart should be empty
    await expect(page.getByText(/cart is empty/i)).toBeVisible();
  });

  test('checkout button links to Shopify checkout', async ({ page }) => {
    await page.goto('/products/apex-runner-pro');

    const sizeButton = page.getByRole('button').filter({ hasText: /UK \d+/i }).first();
    await expect(sizeButton).toBeVisible();
    await sizeButton.click();

    await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/cart') && r.status() === 200),
      page.getByRole('button', { name: /Add to Cart/i }).click(),
    ]);

    await page.goto('/cart');

    const checkoutBtn = page.getByRole('link', { name: /Proceed to Checkout/i });
    await expect(checkoutBtn).toBeVisible();
    // Checkout URL should be a Shopify hosted URL
    const href = await checkoutBtn.getAttribute('href');
    expect(href).toContain('myshopify.com');
  });
});
