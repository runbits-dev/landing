import { test, expect } from '@playwright/test';

test.describe('Pricing section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#pricing');
  });

  test('pricing section heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Precios simples, sin sorpresas' })).toBeVisible();
  });

  test('pricing subtitle is visible', async ({ page }) => {
    await expect(page.getByText('Un precio fijo mensual. Sin comisiones por pedido. Sin letra chica.')).toBeVisible();
  });

  test('Starter plan is visible with correct price', async ({ page }) => {
    const pricing = page.locator('#pricing');
    await expect(pricing.getByText('Starter').first()).toBeVisible();
    await expect(pricing.getByText('$49').first()).toBeVisible();
  });

  test('Growth plan is visible with correct price', async ({ page }) => {
    const pricing = page.locator('#pricing');
    await expect(pricing.getByText('Growth').first()).toBeVisible();
    await expect(pricing.getByText('$129').first()).toBeVisible();
  });

  test('Pro plan is visible with correct price', async ({ page }) => {
    const pricing = page.locator('#pricing');
    await expect(pricing.getByText('Pro').first()).toBeVisible();
    await expect(pricing.getByText('$299').first()).toBeVisible();
  });

  test('Fleet plan is visible with correct price', async ({ page }) => {
    const pricing = page.locator('#pricing');
    await expect(pricing.getByText('Fleet').first()).toBeVisible();
    await expect(pricing.getByText('$199').first()).toBeVisible();
  });

  test('Starter plan description is visible', async ({ page }) => {
    await expect(page.getByText('Para comercios que están arrancando con delivery propio.')).toBeVisible();
  });

  test('Growth plan description is visible', async ({ page }) => {
    await expect(page.getByText('Para comercios con volumen medio que quieren crecer sin límites.')).toBeVisible();
  });

  test('Pro plan description is visible', async ({ page }) => {
    await expect(page.getByText('Para negocios grandes que necesitan escala y control total.')).toBeVisible();
  });

  test('Fleet plan description is visible', async ({ page }) => {
    await expect(page.getByText('Para caderías y flotas de reparto independientes.')).toBeVisible();
  });

  test('Starter volume limit is visible', async ({ page }) => {
    await expect(page.getByText('Hasta $8.000 USD/mes en pedidos')).toBeVisible();
  });

  test('Growth volume limit is visible', async ({ page }) => {
    await expect(page.getByText('Hasta $25.000 USD/mes en pedidos')).toBeVisible();
  });

  test('Fleet unlimited orders is visible', async ({ page }) => {
    await expect(page.getByText('Sin límite de pedidos')).toBeVisible();
  });

  test('all plan CTA buttons in pricing section link to register', async ({ page }) => {
    // Scope to #pricing section to avoid counting nav CTA
    const pricing = page.locator('#pricing');
    const ctaLinks = pricing.getByRole('link', { name: 'Empezar gratis' });
    // 4 plans × 1 CTA each
    await expect(ctaLinks).toHaveCount(4);
    for (const link of await ctaLinks.all()) {
      await expect(link).toHaveAttribute('href', 'https://app.runbits.io/register');
    }
  });

  test('trial note is visible on each plan', async ({ page }) => {
    const trialNotes = page.getByText('14 días gratis, sin tarjeta de crédito');
    await expect(trialNotes).toHaveCount(4);
  });

  test('enterprise volume note is visible', async ({ page }) => {
    await expect(page.getByText(/Volumen mayor a \$80\.000 USD\/mes/)).toBeVisible();
  });
});
