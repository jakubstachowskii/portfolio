import { expect, test, type Page } from '@playwright/test';

/** strony do sprawdzenia: główne + pierwsza podstrona projektu z indeksu + 404 */
async function pagesToCheck(page: Page) {
  await page.goto('/');
  const project = await page.locator('[data-project]').first().getAttribute('href');
  return ['/', '/en/', project!, '/nie-ma-takiej-strony'];
}

test('brak błędów w konsoli i naruszeń CSP', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`${page.url()}: ${msg.text()}`);
  });
  page.on('pageerror', (err) => errors.push(`${page.url()}: ${err.message}`));
  for (const path of await pagesToCheck(page)) {
    await page.goto(path);
    await page.waitForLoadState('networkidle');
  }
  // 404 celowo zwraca status 404 — przeglądarka loguje to jako błąd zasobu, to nie błąd strony
  expect(errors.filter((e) => !/status of 404/.test(e))).toEqual([]);
});

test('skrypty działają mimo CSP (motyw, talia, kopiowanie)', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-theme-toggle]').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', /light|dark/);
  await expect(page.locator('meta[http-equiv="content-security-policy"]')).toHaveCount(1);
});

test('wewnętrzne linki prowadzą do istniejących stron', async ({ page, request }) => {
  const hrefs = new Set<string>();
  for (const path of await pagesToCheck(page)) {
    await page.goto(path);
    for (const href of await page
      .locator('a[href^="/"]')
      .evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).pathname))) {
      hrefs.add(href);
    }
  }
  const broken: string[] = [];
  for (const href of hrefs) {
    const res = await request.get(href);
    if (res.status() >= 400) broken.push(`${href} → ${res.status()}`);
  }
  expect(broken).toEqual([]);
});
