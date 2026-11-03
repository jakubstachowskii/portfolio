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

test.describe('talia kart: dotyk', () => {
  test.skip(
    ({ isMobile, browserName }) => !isMobile || browserName !== 'chromium',
    'dotyk przez CDP',
  );

  // gest palcem jak na telefonie (Input.dispatchTouchEvent): start w środku przedniej karty, potem ruchy
  async function swipe(page: Page, step: { x: number; y: number }, steps: number) {
    // po aktywacji talia się rozkłada i przesuwa: karta na środek ekranu, żeby palec nie trafił
    // w przyklejone menu (to „dotyk poza talią”, który celowo ją wyłącza)
    await page
      .locator('.dk.front')
      .evaluate((el) => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
    const box = (await page.locator('.dk.front').boundingBox())!;
    const hit = await page.evaluate(
      ([px, py]) => !!document.elementFromPoint(px!, py!)?.closest('[data-deck]'),
      [box.x + box.width / 2, box.y + box.height / 2],
    );
    expect(hit, 'palec trafia w talię').toBe(true);
    const cdp = await page.context().newCDPSession(page);
    const touch = (type: 'touchStart' | 'touchMove' | 'touchEnd', x = 0, y = 0) =>
      cdp.send('Input.dispatchTouchEvent', {
        type,
        touchPoints: type === 'touchEnd' ? [] : [{ x, y }],
      });
    const [x, y] = [box.x + box.width / 2, box.y + box.height / 2];
    await touch('touchStart', x, y);
    for (let i = 1; i <= steps; i++) await touch('touchMove', x + step.x * i, y + step.y * i);
    await touch('touchEnd');
  }

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page
      .locator('.dk.front')
      .evaluate((el) => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
  });

  test('przewinięcie strony palcem po talii jej nie aktywuje', async ({ page }) => {
    const before = await page.evaluate(() => scrollY);
    await swipe(page, { x: 0.5, y: -20 }, 12);
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before);
    await expect(page.locator('.deck')).not.toHaveClass(/flat/);
    expect(await front(page)).toBe('web');
  });

  test('dotknięcie poza talią wraca do spoczynku (jak Safari na iOS: bez zdjęcia fokusu)', async ({
    page,
  }) => {
    await swipe(page, { x: 0, y: 0 }, 0); // stuknięcie
    await expect(page.locator('.deck')).toHaveClass(/flat/);
    // iOS nie zdejmuje fokusu po stuknięciu w tło: samo pointerdown, fokus zostaje w talii
    await page.evaluate(() =>
      document
        .querySelector('h1')!
        .dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerType: 'touch' })),
    );
    await expect(page.locator('.deck')).not.toHaveClass(/flat/);
  });

  test('przewinięcie palcem po aktywnej talii wraca do spoczynku', async ({ page }) => {
    await swipe(page, { x: 0, y: 0 }, 0);
    await expect(page.locator('.deck')).toHaveClass(/flat/);
    await swipe(page, { x: 0.5, y: -20 }, 12);
    await expect(page.locator('.deck')).not.toHaveClass(/flat/);
  });

  test('po ~4 s bez dotyku talia wraca do spoczynku; każde stuknięcie liczy od nowa', async ({
    page,
  }) => {
    // sterowany zegar strony: wynik nie zależy od obciążenia maszyny CI (prawdziwe 2,5 s + narzut
    // gestu potrafiło przekroczyć 4 s i talia słusznie wracała do spoczynku przed sprawdzeniem)
    await page.clock.install();
    await page.goto('/');
    await swipe(page, { x: 0, y: 0 }, 0);
    await expect(page.locator('.deck')).toHaveClass(/flat/);
    await page.clock.runFor(2500);
    await swipe(page, { x: 0, y: 0 }, 0); // następna karta, licznik od nowa
    await page.clock.runFor(2500);
    await expect(page.locator('.deck')).toHaveClass(/flat/);
    await page.clock.runFor(2000);
    await expect(page.locator('.deck')).not.toHaveClass(/flat/);
  });

  test('przeciągnięcie palcem w bok przerzuca kartę', async ({ page }) => {
    await swipe(page, { x: 18, y: 1 }, 10);
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
  // jednorazowe wejście podglądu projektu nie może stać w pierwszej klatce (Lighthouse widzi całą stronę);
  // przewinięcie do kontaktu gwarantuje, że sekcja projektów jest poza ekranem niezależnie od długości tekstów
  await page.locator('#kontakt').scrollIntoViewIfNeeded();
  await expect(page.locator('#projekty')).toHaveClass(/off/);
  const pv = await page
    .locator('[data-preview]:not([hidden])')
    .evaluate((el) => getComputedStyle(el).animationPlayState);
  expect(pv).toBe('running');
});

test.describe('talia kart: ramka fokusu', () => {
  test.skip(({ isMobile }) => isMobile, 'mysz i klawiatura: desktop');

  test('kliknięcie myszą nie rysuje ramki, Tab tak', async ({ page }) => {
    await page.goto('/');
    await clickFront(page);
    await expect(page.locator('.deck')).toHaveClass(/flat/);
    const afterClick = await page
      .locator('[data-deck]')
      .evaluate((el) => el.matches(':focus-visible'));
    expect(afterClick).toBe(false);

    await page.goto('/');
    await page.locator('[data-deck]').focus();
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Tab');
    const afterTab = await page
      .locator('[data-deck]')
      .evaluate((el) => el.matches(':focus-visible'));
    expect(afterTab).toBe(true);
  });
});

test('link „przejdź do treści”: bez fokusu przycięty w obrębie strony, po Tab widoczny', async ({
  page,
}) => {
  await page.goto('/');
  const skip = page.locator('.skip');
  const state = () =>
    skip.evaluate((el) => ({
      top: el.getBoundingClientRect().top,
      clip: getComputedStyle(el).clipPath,
    }));
  // przesunięcie nad stronę odsłaniało link przy „odbiciu” przewijania na telefonie
  const before = await state();
  expect(before.top).toBeGreaterThanOrEqual(0);
  expect(before.clip).not.toBe('none');
  await skip.focus();
  expect((await state()).clip).toBe('none');
  await expect(skip).toBeVisible();
});
