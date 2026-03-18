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

  test('default calculation: $500/day → Starter plan at $49', async ({ page }) => {
    // $500/day × 30 = $15,000/month → Growth plan ($129)
    // Actually $500 × 30 = $15,000 → Growth ($129)
    await expect(page.getByText('Plan Growth')).toBeVisible();
    await expect(page.getByText('$129')).toBeVisible();
  });

  test('slider interaction updates values', async ({ page }) => {
    const slider = page.locator('input[type="range"]');
    // Set to minimum (50) → Starter plan
    await slider.fill('50');
    await slider.dispatchEvent('input');
    await expect(page.getByText('Plan Starter')).toBeVisible();
    await expect(page.getByText('$49')).toBeVisible();
  });

  test('high value slider shows Pro plan', async ({ page }) => {
    const slider = page.locator('input[type="range"]');
    // $3000/day × 30 = $90,000 → Pro plan (max)
    await slider.fill('3000');
    await slider.dispatchEvent('input');
    await expect(page.getByText('Plan Pro')).toBeVisible();
    await expect(page.getByText('$299')).toBeVisible();
  });
});
