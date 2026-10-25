import { expect, test } from '@playwright/test';

const sections = ['top', 'tasma', 'projekty', 'gh', 'o-mnie', 'stack', 'kontakt'];

test.describe('strona główna', () => {
  test('wszystkie sekcje wzorca w kolejności', async ({ page }) => {
    await page.goto('/');
    const ids = await page.locator('main > [id]').evaluateAll((els) => els.map((el) => el.id));
    // sekcja GitHub jest tylko z danymi z API (token): bez niej reszta w tej samej kolejności
    expect(ids).toEqual(ids.includes('gh') ? sections : sections.filter((id) => id !== 'gh'));
  });

  test('sekcja GitHub: prawdziwe dane albo brak sekcji (bez szkieletu)', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('[Tu pojawi się')).toHaveCount(0);
    const gh = page.locator('#gh');
    if ((await gh.count()) === 0) return;
    const grid = gh.locator('[role="img"]');
    await expect(grid).toHaveAttribute(
      'aria-label',
      /^Kalendarz kontrybucji: \d+ w ostatnich \d+ tygodniach$/,
    );
    const cells = await grid.locator('span').count();
    expect(cells).toBeGreaterThan(0);
    expect(cells).toBeLessThanOrEqual(44 * 7);
    await expect(gh.locator('a', { hasText: /publiczn/ })).toHaveAttribute(
      'href',
      /jakubstachowskii/,
    );
  });

  test('pierwszy projekt wybrany, reszta podglądów ukryta', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-project]').first()).toHaveAttribute('aria-current', 'true');
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
