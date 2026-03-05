import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders announcement bar with free shipping text', async ({ page }) => {
    // The bar rotates through messages — check at least one is visible on load
    await expect(page.getByText(/Free Shipping/i)).toBeVisible();
  });

  test('renders hero headline', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Excellence/i);
  });

  test('hero has Shop Mens CTA that links to collection', async ({ page }) => {
    const cta = page.getByRole('link', { name: /Shop Men/i });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', '/collections/mens');
  });

  test('hero has Shop Womens CTA', async ({ page }) => {
    const cta = page.getByRole('link', { name: /Shop Women/i });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', '/collections/womens');
  });

  test('shows 3 collection cards', async ({ page }) => {
    await expect(page.getByText("Men's Footwear")).toBeVisible();
    await expect(page.getByText("Women's Footwear")).toBeVisible();
    await expect(page.getByText("Children's Footwear")).toBeVisible();
  });

  test('shows social proof stats', async ({ page }) => {
    await expect(page.getByText('2,000+')).toBeVisible();
    await expect(page.getByText('4.8★')).toBeVisible();
  });

  test('shows customer reviews', async ({ page }) => {
    await expect(page.getByText('Rahul M.')).toBeVisible();
    await expect(page.getByText('Priya S.')).toBeVisible();
    await expect(page.getByText('Ankit K.')).toBeVisible();
  });

  test('navbar shows FOOTWAY INDIA logo linking to /', async ({ page }) => {
    const logo = page.getByRole('link', { name: /FOOTWAY INDIA/i }).first();
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('href', '/');
  });

  test('footer shows trust badges', async ({ page }) => {
    await page.locator('footer').scrollIntoViewIfNeeded();
    await expect(page.getByText(/30-Day Returns/i).first()).toBeVisible();
    await expect(page.getByText(/Secure Payments/i)).toBeVisible();
  });
});
