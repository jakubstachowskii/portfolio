import { expect, test } from '@playwright/test';

const sections = ['top', 'tasma', 'projekty', 'gh', 'o-mnie', 'stack', 'kontakt'];

test.describe('strona główna', () => {
  test('wszystkie sekcje wzorca w kolejności', async ({ page }) => {
    await page.goto('/');
    const ids = await page.locator('main > [id]').evaluateAll((els) => els.map((el) => el.id));
    expect(ids).toEqual(sections);
  });

  test('pierwszy projekt wybrany, reszta podglądów ukryta', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-project]').first()).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('[data-preview]:visible')).toHaveCount(1);
  });

  for (const width of [360, 768, 1280, 1920]) {
    for (const theme of ['dark', 'light'] as const) {
      test(`brak poziomego scrolla: ${width}px, ${theme}`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: theme });
        await page.setViewportSize({ width, height: 900 });
        await page.goto('/');
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow).toBeLessThanOrEqual(0);
      });
    }
  }
});
