import { test, expect } from '@playwright/test';

test.describe('SavingsCalculator (React component)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#calculator');
  });

  test('calculator section is visible', async ({ page }) => {
    await expect(page.getByText('¿Cuánto estás perdiendo hoy?')).toBeVisible();
  });

  test('calculator subtitle is visible', async ({ page }) => {
    await expect(page.getByText('Calculá cuánto te cobran Rappi y PedidosYa vs. lo que pagarías con Runbits.')).toBeVisible();
  });

  test('daily sales label is visible', async ({ page }) => {
    await expect(page.getByText('Ventas diarias (USD)')).toBeVisible();
  });

  test('range slider is rendered', async ({ page }) => {
    const slider = page.locator('input[type="range"]');
    await expect(slider).toBeVisible();
    await expect(slider).toHaveAttribute('min', '50');
    await expect(slider).toHaveAttribute('max', '10000');
  });

  test('default value shows $500', async ({ page }) => {
    await expect(page.getByText('$500')).toBeVisible();
  });

  test('monthly commission label is visible', async ({ page }) => {
    await expect(page.getByText('Comisión mensual que pagás hoy')).toBeVisible();
  });

  test('with runbits label is visible', async ({ page }) => {
    await expect(page.getByText('Con Runbits pagarías')).toBeVisible();
  });

  test('you save label is visible', async ({ page }) => {
    await expect(page.getByText('Ahorrás por mes')).toBeVisible();
  });

  test('ROI label is visible', async ({ page }) => {
    await expect(page.getByText('ROI')).toBeVisible();
  });

  test('Rappi/PedidosYa reference is visible', async ({ page }) => {
    await expect(page.getByText('Rappi / PedidosYa (30%)')).toBeVisible();
  });

  test('default calculation: $500/day → Growth plan at $129', async ({ page }) => {
    // $500/day × 30 = $15,000/month → Growth plan ($129)
    const calculator = page.locator('#calculator');
    await expect(calculator.getByText('Plan Growth')).toBeVisible();
    // Price inside calculator section (not pricing section)
    await expect(calculator.locator('.text-2xl.font-bold.text-brand-700')).toContainText('$129');
  });

  test('slider interaction updates values to Starter plan', async ({ page }) => {
    const slider = page.locator('input[type="range"]');
    const calculator = page.locator('#calculator');
    // Set to minimum (50) → $50 × 30 = $1,500 → Starter plan
    await slider.fill('50');
    await slider.dispatchEvent('input');
    await expect(calculator.getByText('Plan Starter')).toBeVisible();
    await expect(calculator.locator('.text-2xl.font-bold.text-brand-700')).toContainText('$49');
  });

  test('high value slider shows Pro plan', async ({ page }) => {
    const slider = page.locator('input[type="range"]');
    const calculator = page.locator('#calculator');
    // $3000/day × 30 = $90,000 → Pro plan (max)
    await slider.fill('3000');
    await slider.dispatchEvent('input');
    await expect(calculator.getByText('Plan Pro')).toBeVisible();
    await expect(calculator.locator('.text-2xl.font-bold.text-brand-700')).toContainText('$299');
  });
});
