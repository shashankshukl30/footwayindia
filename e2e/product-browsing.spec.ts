import { test, expect } from '@playwright/test';

/**
 * NOTE: These tests require a real Shopify store connected.
 * Update .env.local with your Shopify credentials before running.
 * The products must exist in Shopify Admin:
 *   - Apex Runner Pro (handle: apex-runner-pro) in 'mens' collection
 *   - Luna Comfort Slip (handle: luna-comfort-slip) in 'womens' collection
 *   - Bounce Jr. (handle: bounce-jr) in 'kids' collection
 */

test.describe('Collection pages', () => {
  test('mens collection loads and shows Apex Runner Pro', async ({ page }) => {
    await page.goto('/collections/mens');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText('Apex Runner Pro')).toBeVisible();
  });

  test('womens collection loads and shows Luna Comfort Slip', async ({ page }) => {
    await page.goto('/collections/womens');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText('Luna Comfort Slip')).toBeVisible();
  });

  test('kids collection loads and shows Bounce Jr.', async ({ page }) => {
    await page.goto('/collections/kids');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText('Bounce Jr.')).toBeVisible();
  });

  test('unknown collection shows 404', async ({ page }) => {
    await page.goto('/collections/does-not-exist');
    // Next.js notFound() renders a 404 page with "Not Found" heading
    await expect(page.getByRole('heading', { name: /not found/i })).toBeVisible();
  });
});

test.describe('Product Detail Page', () => {
  test('Apex Runner Pro PDP loads with price and add to cart', async ({ page }) => {
    await page.goto('/products/apex-runner-pro');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Apex Runner Pro');
    await expect(page.getByText(/₹4,999/)).toBeVisible();
    await expect(page.getByRole('button', { name: /Add to Cart|Select a Size/i })).toBeVisible();
  });

  test('PDP shows urgency countdown timer', async ({ page }) => {
    await page.goto('/products/apex-runner-pro');
    // The countdown renders as HH:MM:SS format
    await expect(page.getByText(/\d{2}:\d{2}:\d{2}/)).toBeVisible();
  });

  test('PDP shows viewer count', async ({ page }) => {
    await page.goto('/products/apex-runner-pro');
    await expect(page.getByText(/people.*viewing/i)).toBeVisible();
  });

  test('PDP size selector shows size buttons', async ({ page }) => {
    await page.goto('/products/apex-runner-pro');
    // At least one size button should exist
    const sizeButtons = page.getByRole('button').filter({ hasText: /UK \d+/i });
    await expect(sizeButtons.first()).toBeVisible();
  });

  test('unknown product shows 404', async ({ page }) => {
    await page.goto('/products/this-does-not-exist');
    // Next.js notFound() renders a 404 page with "Not Found" heading
    await expect(page.getByRole('heading', { name: /not found/i })).toBeVisible();
  });
});

test.describe('Search page', () => {
  test('search page loads with form', async ({ page }) => {
    await page.goto('/search');
    await expect(page.getByRole('searchbox')).toBeVisible();
    await expect(page.getByRole('button', { name: /Search/i })).toBeVisible();
  });

  test('search shows all products when no query', async ({ page }) => {
    await page.goto('/search');
    // Should show some products from the store
    await expect(page.getByText('Browse All Products')).toBeVisible();
  });

  test('search with query filters results', async ({ page }) => {
    await page.goto('/search?q=runner');
    await expect(page.getByText(/Results for "runner"/i)).toBeVisible();
  });
});
