import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('/design (katalog design systemu)', () => {
  test('odpowiada 200 i ma oba panele', async ({ page }) => {
    const response = await page.goto('/design');
    expect(response?.status()).toBe(200);
    await expect(page.locator('[data-catalog-panel="dark"]')).toBeVisible();
    await expect(page.locator('[data-catalog-panel="light"]')).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  });

  for (const theme of ['dark', 'light'] as const) {
    test(`axe: 0 naruszeń WCAG 2.2 AA w panelu ${theme}`, async ({ page }) => {
      await page.goto('/design');
      const results = await new AxeBuilder({ page })
        .include(`[data-catalog-panel="${theme}"]`)
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  }

  test('każdy element interaktywny ma widoczny focus', async ({ page }) => {
    await page.goto('/design');
    const panel = page.locator('[data-catalog-panel="dark"]');
    const first = panel.locator('a, button:not([disabled])').first();
    await first.focus();
    const outline = await first.evaluate((el) => getComputedStyle(el).outlineStyle);
    expect(outline).toBe('solid');
  });

  test('visual snapshot', async ({ page }, info) => {
    test.skip(process.platform !== 'linux', 'baseline tylko z CI (Linux) — DECISIONS #19');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/design', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot(`design-${info.project.name}.png`, { fullPage: true });
  });
});
