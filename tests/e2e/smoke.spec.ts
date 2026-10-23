import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = [
  { path: '/', lang: 'pl' },
  { path: '/en/', lang: 'en' },
] as const;

for (const { path, lang } of routes) {
  test.describe(`trasa ${path}`, () => {
    test('odpowiada 200 i ma poprawny <html lang>', async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect(page.locator('main')).toHaveCount(1);
      await expect(page.locator('h1')).toHaveCount(1);
    });

    for (const theme of ['dark', 'light'] as const) {
      // reduced motion: axe mierzy kontrast stanu końcowego, nie klatki wejścia (opacity 0 → 1)
      test(`nie ma naruszeń axe (WCAG 2.2 AA), motyw ${theme}`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
        await page.goto(path);
        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
          .analyze();
        expect(results.violations).toEqual([]);
      });
    }
  });
}
