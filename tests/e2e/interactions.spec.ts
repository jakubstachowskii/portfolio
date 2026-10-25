import { expect, test, type Page } from '@playwright/test';

const front = (page: Page) => page.locator('.dk.front').getAttribute('data-card');

// talia stale się unosi (animacja w pętli), więc Playwright nie uznałby karty za „stabilną”: klik w punkt
async function clickFront(page: Page) {
  const box = (await page.locator('.dk.front').boundingBox())!;
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
}

test.describe('talia kart', () => {
  test.skip(({ isMobile }) => isMobile, 'mysz i klawiatura: desktop');

  test('klawiatura: Tab aktywuje, strzałki zmieniają kartę, Esc kończy', async ({ page }) => {
    await page.goto('/');
    const deck = page.locator('[data-deck]');
    await deck.focus();
    await expect(page.locator('.deck')).toHaveClass(/flat/);
    await expect(page.locator('[data-deck-hint]')).toHaveText('przeciągnij kartę lub użyj ← →');
    await page.keyboard.press('ArrowRight');
    await expect.poll(() => front(page)).toBe('mobile');
    await page.keyboard.press('ArrowLeft');
    await expect.poll(() => front(page)).toBe('web');
    await page.keyboard.press('Escape');
    await expect(page.locator('.deck')).not.toHaveClass(/flat/);
    // tylne karty są ukryte przed czytnikiem ekranu
    await expect(page.locator('.dk[aria-hidden="false"]')).toHaveCount(1);
  });

  test('pierwsze kliknięcie tylko aktywuje, drugie przerzuca kartę', async ({ page }) => {
    await page.goto('/');
    await clickFront(page);
    await expect(page.locator('.deck')).toHaveClass(/flat/);
    expect(await front(page)).toBe('web');
    await clickFront(page);
    await expect.poll(() => front(page)).toBe('mobile');
  });

  test('przeciągnięcie ponad próg przerzuca kartę', async ({ page }) => {
    await page.goto('/');
    const box = (await page.locator('.dk.front').boundingBox())!;
    const y = box.y + box.height / 2;
    await page.mouse.move(box.x + 60, y);
    await page.mouse.down();
    await page.mouse.move(box.x + 220, y, { steps: 12 });
    await page.mouse.up();
    await expect.poll(() => front(page)).toBe('mobile');
  });
});

test.describe('indeks projektów', () => {
  test('najechanie wybiera projekt i pokazuje jego podgląd', async ({ page, isMobile }) => {
    test.skip(isMobile, 'najechanie: desktop');
    await page.goto('/');
    const rows = page.locator('[data-project]');
    await rows.nth(1).hover();
    await expect(rows.nth(1)).toHaveAttribute('aria-current', 'true');
    await expect(rows.nth(0)).not.toHaveAttribute('aria-current');
    const id = await rows.nth(1).getAttribute('data-project');
    await expect(page.locator('[data-preview]:visible')).toHaveAttribute('data-preview', id!);
  });

  test('telefon: stuknięcie przewija do podglądu', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'tylko wąski ekran');
    await page.goto('/');
    const rows = page.locator('[data-project]');
    await rows.last().tap();
    const id = await rows.last().getAttribute('data-project');
    const preview = page.locator(`[data-preview="${id}"]`);
    await expect(preview).toBeVisible();
    await expect(preview).toBeInViewport();
  });
});

test('kopiuj e-mail: schowek i „SKOPIOWANO”', async ({ page, context, browserName }) => {
  test.skip(browserName !== 'chromium', 'uprawnienia schowka: chromium');
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  const btn = page.locator('[data-copy-email]');
  await btn.click();
  await expect(btn).toHaveClass(/done/);
  await expect(btn).toContainText('SKOPIOWANO');
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).toBe(await btn.getAttribute('data-copy-email'));
  await expect(btn).toContainText('KOPIUJ', { timeout: 4000 });
});

test.describe('aktywna sekcja', () => {
  test('przewinięcie podświetla link w nav, na dole aktywny jest Kontakt', async ({ page }) => {
    await page.goto('/');
    await page.locator('#stack').scrollIntoViewIfNeeded();
    await page.mouse.wheel(0, 1);
    const link = page.locator('.nl[data-section="stack"]');
    await expect(link).toHaveClass(/on/);
    await expect(link).toHaveAttribute('aria-current', 'true');
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect(page.locator('.dot[data-section="kontakt"]')).toHaveClass(/on/);
  });

  test('kliknięcie linku od razu ustawia jego sekcję', async ({ page, isMobile }) => {
    test.skip(isMobile, 'linki w drugim rzędzie: sprawdzane na desktopie');
    await page.goto('/');
    await page.locator('.nl[data-section="o-mnie"]').click();
    await expect(page.locator('.nl[data-section="o-mnie"]')).toHaveAttribute(
      'aria-current',
      'true',
    );
  });
});

test('animacje w pętli pauzują poza ekranem', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#kontakt')).toHaveClass(/off/);
  await expect(page.locator('#top')).not.toHaveClass(/off/);
  const state = await page
    .locator('#kontakt .tape')
    .evaluate((el) => getComputedStyle(el).animationPlayState);
  expect(state).toBe('paused');
  // jednorazowe wejście podglądu projektu nie może stać w pierwszej klatce (Lighthouse widzi całą stronę)
  await expect(page.locator('#projekty')).toHaveClass(/off/);
  const pv = await page
    .locator('[data-preview]:not([hidden])')
    .evaluate((el) => getComputedStyle(el).animationPlayState);
  expect(pv).toBe('running');
});
