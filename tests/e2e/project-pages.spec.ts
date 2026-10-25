import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const AXE_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

/** adres podstrony pierwszego projektu z indeksu na stronie głównej */
async function firstProjectHref(page: import('@playwright/test').Page, home = '/') {
  await page.goto(home);
  return (await page.locator('[data-project]').first().getAttribute('href'))!;
}

test.describe('podstrona projektu', () => {
  test('nagłówek, powrót do projektów, przyciski i sąsiednie projekty', async ({ page }) => {
    const href = await firstProjectHref(page);
    expect(href).toMatch(/^\/projekty\/[a-z0-9-]+\/$/);
    const res = await page.goto(href);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('a', { hasText: '← Projekty' })).toHaveAttribute(
      'href',
      '/#projekty',
    );
    await expect(page.locator('a', { hasText: 'KOD NA GITHUBIE' })).toHaveAttribute(
      'href',
      /^https:\/\/github\.com\/jakubstachowskii\//,
    );
    const rows = page.locator('nav[aria-label="Inne projekty"] a');
    await expect(rows.first()).toHaveAttribute('href', /^\/projekty\//);
    await rows.last().click();
    await expect(page).toHaveURL(/\/projekty\/[a-z0-9-]+\/$/);
    expect(page.url()).not.toContain(href);
  });

  test('wersja EN pod /en/projects/', async ({ page }) => {
    const href = await firstProjectHref(page, '/en/');
    expect(href).toMatch(/^\/en\/projects\/[a-z0-9-]+\/$/);
    await page.goto(href);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('a', { hasText: '← Projects' })).toHaveAttribute(
      'href',
      '/en/#projekty',
    );
  });

  for (const theme of ['dark', 'light'] as const) {
    test(`brak naruszeń axe, motyw ${theme}`, async ({ page }) => {
      const href = await firstProjectHref(page);
      await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
      await page.goto(href);
      const { violations } = await new AxeBuilder({ page }).withTags(AXE_TAGS).analyze();
      expect(violations).toEqual([]);
    });
  }
});

test.describe('indeks → podstrona', () => {
  test('bez JS wiersz jest zwykłym linkiem do podstrony', async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto('/');
    await page.locator('[data-project]').nth(1).click();
    await expect(page).toHaveURL(/\/projekty\/[a-z0-9-]+\/$/);
    await ctx.close();
  });

  test('desktop: klik w wybrany wiersz otwiera podstronę', async ({ page, isMobile }) => {
    test.skip(isMobile, 'na telefonie stuknięcie przewija do podglądu');
    await page.goto('/');
    const row = page.locator('[data-project]').nth(1);
    await row.hover();
    await expect(row).toHaveAttribute('aria-current', 'true');
    await row.click();
    await expect(page).toHaveURL(/\/projekty\/[a-z0-9-]+\/$/);
  });

  test('podgląd ma link „Szczegóły →” do podstrony', async ({ page }) => {
    await page.goto('/');
    const details = page.locator('[data-preview]:visible a', { hasText: 'Szczegóły' });
    await expect(details).toHaveAttribute('href', /^\/projekty\/[a-z0-9-]+\/$/);
  });
});

test.describe('404', () => {
  test('nieistniejący adres: status 404, komunikat i powrót na start', async ({ page }) => {
    const res = await page.goto('/nie-ma-takiej-strony');
    expect(res?.status()).toBe(404);
    await expect(page.locator('h1')).toHaveText('Tej strony tu nie ma.');
    await page.locator('a', { hasText: 'WRÓĆ NA START' }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('brak naruszeń axe', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/nie-ma-takiej-strony');
    const { violations } = await new AxeBuilder({ page }).withTags(AXE_TAGS).analyze();
    expect(violations).toEqual([]);
  });
});

test.describe('przegląd produkcji: poprawki', () => {
  test('przełącznik języka prowadzi do tej samej strony w drugim języku', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a[hreflang="en"].lang')).toHaveAttribute('href', '/en/');
    const href = (await page.locator('[data-project]').first().getAttribute('href'))!;
    await page.goto(href);
    await page.locator('a.lang').click();
    await expect(page).toHaveURL(/\/en\/projects\/[a-z0-9-]+\/$/);
    await expect(page.locator('a.lang')).toHaveAttribute('href', href);
  });

  test('podstrony mają opis projektu po polsku i po angielsku', async ({ page }) => {
    await page.goto('/');
    const href = (await page.locator('[data-project]').first().getAttribute('href'))!;
    await page.goto(href);
    await expect(page.locator('.prose h2').first()).toBeVisible();
    await page.goto(href.replace('/projekty/', '/en/projects/'));
    await expect(page.locator('.prose h2').first()).toHaveText(/what it does/i);
  });

  test('404 ma linijkę po angielsku', async ({ page }) => {
    await page.goto('/nie-ma-takiej-strony');
    await expect(page.locator('p[lang="en"] a')).toHaveAttribute('href', '/en/');
  });

  test('telefon: kalendarz GitHub pokazuje najnowszy tydzień', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'wąski ekran');
    await page.goto('/');
    const grid = page.locator('#gh [role="img"]');
    if ((await grid.count()) === 0) return; // bez tokenu sekcji nie ma
    await grid.scrollIntoViewIfNeeded();
    const last = grid.locator('span').last();
    const [g, l] = await Promise.all([grid.boundingBox(), last.boundingBox()]);
    expect(l!.x + l!.width).toBeLessThanOrEqual(g!.x + g!.width + 1);
    expect(l!.x).toBeGreaterThanOrEqual(0);
  });
});
