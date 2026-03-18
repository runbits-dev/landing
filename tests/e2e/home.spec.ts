import { test, expect } from '@playwright/test';

test.describe('Home page (ES)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Runbits/);
  });

  test('hero badge is visible', async ({ page }) => {
    await expect(page.getByText('La alternativa a Rappi y PedidosYa')).toBeVisible();
  });

  test('hero heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Tu negocio, tus reglas');
  });

  test('hero highlighted text is visible', async ({ page }) => {
    await expect(page.getByText('sin pagar el 30%')).toBeVisible();
  });

  test('hero primary CTA links to register', async ({ page }) => {
    const cta = page.getByRole('link', { name: 'Empezar 14 días gratis' }).first();
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', 'https://app.runbits.io/register');
  });

  test('hero secondary CTA links to calculator section', async ({ page }) => {
    const cta = page.getByRole('link', { name: 'Ver cómo funciona' });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', '#calculator');
  });

  test('no credit card note is visible', async ({ page }) => {
    await expect(page.getByText('Sin tarjeta de crédito. Sin permanencia.')).toBeVisible();
  });

  test('social proof section is visible', async ({ page }) => {
    await expect(page.getByText('Comercios que ya usan Runbits')).toBeVisible();
  });

  test('calculator section heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '¿Cuánto estás perdiendo hoy?' })).toBeVisible();
  });

  test('pricing section heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Precios simples, sin sorpresas' })).toBeVisible();
  });

  test('FAQ section heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Preguntas frecuentes' })).toBeVisible();
  });

  test('FAQ items are rendered', async ({ page }) => {
    await expect(page.getByText('¿Necesito tener mi propia app?')).toBeVisible();
    await expect(page.getByText('¿Qué pasa si supero el volumen del plan?')).toBeVisible();
    await expect(page.getByText('¿Puedo usar Runbits junto con Rappi?')).toBeVisible();
    await expect(page.getByText('¿Cómo funciona el plan Fleet para caderías?')).toBeVisible();
  });

  test('final CTA section is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Empezá hoy, gratis.' })).toBeVisible();
    await expect(page.getByText('14 días sin costo. Sin tarjeta. Sin permanencia.')).toBeVisible();
  });

  test('final CTA links to register', async ({ page }) => {
    const links = page.getByRole('link', { name: 'Empezar 14 días gratis' });
    // There are two: hero + final CTA
    await expect(links).toHaveCount(2);
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute('href', 'https://app.runbits.io/register');
    }
  });

  test('enterprise contact link is visible', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Hablemos' });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'mailto:hola@runbits.io');
  });
});
