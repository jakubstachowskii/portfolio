// Obrazek Open Graph (public/og.png, 1200×630) i ikona Apple (public/apple-touch-icon.png, 180×180)
// z szablonu scripts/brand.html (fonty i kolory strony). Uruchom po zmianie: `pnpm brand`.
import { chromium } from '@playwright/test';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
await page.goto(new URL('brand.html', import.meta.url).href);
await page.evaluate(() => document.fonts.ready);
await page.locator('#og').screenshot({ path: 'public/og.png' });
await page.locator('#icon').screenshot({ path: 'public/apple-touch-icon.png' });
await browser.close();
console.log('zapisano public/og.png i public/apple-touch-icon.png');
