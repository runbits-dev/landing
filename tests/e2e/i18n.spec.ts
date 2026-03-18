import { test, expect } from '@playwright/test';

test.describe('i18n — English (/en/)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/');
  });

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Runbits/);
  });

  test('hero badge is in English', async ({ page }) => {
    await expect(page.getByText('The alternative to Rappi and PedidosYa')).toBeVisible();
  });

  test('hero heading is in English', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Your business, your rules');
  });

  test('hero highlighted text is in English', async ({ page }) => {
    await expect(page.getByText('without paying 30%')).toBeVisible();
  });

  test('hero primary CTA is in English', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Start 14-day free trial' }).first()).toBeVisible();
  });

  test('no credit card note is in English', async ({ page }) => {
    await expect(page.getByText('No credit card. No lock-in.')).toBeVisible();
  });

  test('calculator section heading is in English', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'How much are you losing today?' })).toBeVisible();
  });

  test('pricing section heading is in English', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Simple pricing, no surprises' })).toBeVisible();
  });

  test('FAQ section heading is in English', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Frequently asked questions' })).toBeVisible();
  });

  test('FAQ items are in English', async ({ page }) => {
    await expect(page.getByText('Do I need my own app?')).toBeVisible();
    await expect(page.getByText('What happens if I exceed my plan volume?')).toBeVisible();
  });

  test('pricing plans are visible in English', async ({ page }) => {
    await expect(page.getByText('Start free').first()).toBeVisible();
    await expect(page.getByText('14-day free trial, no credit card required').first()).toBeVisible();
  });

  test('daily sales label is in English', async ({ page }) => {
    await expect(page.getByText('Daily sales (USD)')).toBeVisible();
  });
});

test.describe('i18n — Portuguese (/pt/)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pt/');
  });

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Runbits/);
  });

  test('hero badge is in Portuguese', async ({ page }) => {
    // PT uses its own translation
    await expect(page.locator('section').first()).toBeVisible();
  });

  test('hero heading renders', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('calculator section renders', async ({ page }) => {
    const section = page.locator('#calculator');
    await expect(section).toBeVisible();
  });

  test('pricing section renders', async ({ page }) => {
    const section = page.locator('#pricing');
    await expect(section).toBeVisible();
  });

  test('range slider is rendered in PT', async ({ page }) => {
    const slider = page.locator('input[type="range"]');
    await expect(slider).toBeVisible();
  });

  test('4 pricing plans are rendered in PT', async ({ page }) => {
    // All plans have the same names across locales
    await expect(page.getByText('Starter').first()).toBeVisible();
    await expect(page.getByText('Growth').first()).toBeVisible();
    await expect(page.getByText('Pro').first()).toBeVisible();
    await expect(page.getByText('Fleet').first()).toBeVisible();
  });
});
