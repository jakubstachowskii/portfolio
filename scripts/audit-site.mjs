// Pełny przegląd działającej strony (lokalny podgląd albo produkcja): `pnpm audit:site [adres]`.
// Wypisuje każdy znaleziony problem; kod wyjścia 1, gdy jest choć jeden. Domyślnie http://localhost:4321.
import AxeBuilder from '@axe-core/playwright';
import { chromium } from '@playwright/test';

const BASE = (process.argv[2] ?? 'http://localhost:4321').replace(/\/$/, '');
const isProd = !BASE.includes('localhost');
const WIDTHS = [360, 375, 768, 1024, 1280, 1440, 1920];
const AXE_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];
const SECURITY = [
  'strict-transport-security',
  'x-content-type-options',
  'x-frame-options',
  'referrer-policy',
  'permissions-policy',
  'cross-origin-opener-policy',
];
// LinkedIn odpowiada 999 każdemu automatowi; w przeglądarce link działa
const EXTERNAL_OK = (url, status) =>
  status < 400 || (url.includes('linkedin.com') && status === 999);

const problems = [];
const fail = (where, what) => problems.push(`${where}: ${what}`);
// uwagi spoza kodu (ustawienia hostingu, domena) — wypisywane osobno, nie liczą się jako błąd
const notes = new Set();

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

// strony z mapy strony (adresy przepisane na sprawdzany host) + 404
const sitemap = await (await ctx.request.get(`${BASE}/sitemap-0.xml`)).text();
const pages = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
if (pages.length < 2) fail('sitemap', `za mało adresów (${pages.length})`);
const all = [...pages, '/nie-ma-takiej-strony'];

const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(`${page.url()} → ${m.text()}`));
page.on('pageerror', (e) => errors.push(`${page.url()} → ${e.message}`));

const links = new Set();
const external = new Set();
for (const path of all) {
  const res = await page.goto(BASE + path, { waitUntil: 'networkidle' });
  const notFound = path === '/nie-ma-takiej-strony';
  if (res?.status() !== (notFound ? 404 : 200)) fail(path, `status ${res?.status()}`);
  if (isProd) {
    const h = res?.headers() ?? {};
    for (const name of SECURITY) if (!h[name]) fail(path, `brak nagłówka ${name}`);
    if (/noindex/.test(h['x-robots-tag'] ?? '') && !notFound) {
      notes.add(
        'hosting dodaje X-Robots-Tag: noindex (adres .vercel.app) — rozwiązanie: własna domena',
      );
    }
  }
  const info = await page.evaluate(() => ({
    text: document.body.innerText,
    title: document.title,
    desc: document.querySelector('meta[name=description]')?.content ?? '',
    h1: document.querySelectorAll('h1').length,
    lang: document.documentElement.lang,
    canonical: document.querySelector('link[rel=canonical]')?.href ?? null,
    og: document.querySelector('meta[property="og:image"]')?.content ?? null,
    ld: [...document.querySelectorAll('script[type="application/ld+json"]')].map(
      (s) => s.textContent,
    ),
    langSwitch: document.querySelector('a.lang')?.getAttribute('href') ?? null,
    // bez kotwic w obrębie strony (#main, #projekty): to nie są osobne adresy
    hrefs: [...document.querySelectorAll('a[href]:not([href^="#"])')].map((a) => a.href),
    noAlt: document.querySelectorAll('img:not([alt])').length,
    prose: document.querySelector('.prose')?.textContent?.trim().length ?? 0,
    // listy w treści muszą mieć znaczniki (reset CSS je zdejmuje)
    bareLists: [...document.querySelectorAll('.prose li')].filter(
      (li) => getComputedStyle(li).listStyleType === 'none',
    ).length,
  }));
  if (/\/(projekty|projects)\//.test(path) && info.prose < 80)
    fail(path, 'podstrona bez opisu projektu');
  if (info.bareLists) fail(path, `${info.bareLists} punktów listy bez znacznika`);
  if (/\[[^\]\n]{2,40}\]/.test(info.text) || info.title.includes('['))
    fail(path, 'placeholder w nawiasach');
  if (/TODO/.test(info.text)) fail(path, 'TODO w treści');
  if (info.h1 !== 1) fail(path, `liczba h1: ${info.h1}`);
  if (!info.title || !info.desc) fail(path, 'brak tytułu albo opisu');
  if (!notFound && !info.canonical) fail(path, 'brak canonical');
  if (!info.og) fail(path, 'brak og:image');
  if (info.noAlt) fail(path, `${info.noAlt} obrazów bez alt`);
  if (!info.langSwitch) fail(path, 'brak przełącznika języka');
  for (const ld of info.ld) {
    try {
      JSON.parse(ld ?? '');
    } catch {
      fail(path, 'niepoprawny JSON-LD');
    }
  }
  for (const href of info.hrefs) {
    const u = new URL(href);
    if (u.origin === new URL(BASE).origin) links.add(u.pathname);
    else if (u.protocol.startsWith('http')) external.add(href);
  }
}
for (const e of errors)
  if (!/status of 404/.test(e) || !e.includes('nie-ma-takiej-strony')) fail('konsola', e);

for (const path of [...links, ...[...all].filter((p) => p !== '/nie-ma-takiej-strony')]) {
  const r = await ctx.request.get(BASE + path);
  if (r.status() >= 400) fail('link wewnętrzny', `${path} → ${r.status()}`);
}
for (const url of external) {
  try {
    const r = await ctx.request.get(url, { timeout: 15000 });
    if (!EXTERNAL_OK(url, r.status())) fail('link zewnętrzny', `${url} → ${r.status()}`);
  } catch (e) {
    fail('link zewnętrzny', `${url} → ${String(e).slice(0, 60)}`);
  }
}

// axe w obu motywach, po zakończeniu animacji wejścia
for (const theme of ['dark', 'light']) {
  const c = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: theme,
  });
  const p = await c.newPage();
  for (const path of all) {
    await p.goto(BASE + path, { waitUntil: 'networkidle' });
    await p.waitForTimeout(2500);
    const { violations } = await new AxeBuilder({ page: p }).withTags(AXE_TAGS).analyze();
    for (const v of violations) fail(`axe ${theme} ${path}`, `${v.id} ×${v.nodes.length}`);
  }
  await c.close();
}

// poziomy scroll: każda szerokość, oba motywy, główna + pierwsza podstrona
const sub = pages.find((p) => p.includes('/projekty/')) ?? '/';
for (const theme of ['dark', 'light']) {
  for (const width of WIDTHS) {
    const c = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: theme });
    const p = await c.newPage();
    for (const path of ['/', '/en/', sub]) {
      await p.goto(BASE + path, { waitUntil: 'networkidle' });
      const over = await p.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      if (over > 0) fail(`scroll ${width}px ${theme} ${path}`, `${over}px w bok`);
    }
    await c.close();
  }
}

// Tab: każdy kolejny fokus widoczny i z :focus-visible (pierwsze 40 elementów głównej)
{
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  for (let i = 0; i < 40; i++) {
    await page.keyboard.press('Tab');
    const f = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const r = el.getBoundingClientRect();
      return {
        name: (el.getAttribute('aria-label') || el.textContent || el.tagName).trim().slice(0, 30),
        visible: r.width > 0 && r.height > 0,
        ring: el.matches(':focus-visible'),
      };
    });
    if (!f) break;
    if (!f.visible || !f.ring) fail('Tab', `„${f.name}” bez widocznego fokusu`);
  }
}

// telefon: linki menu i przyciski nie łamią się na dwie linie
for (const path of ['/', '/en/']) {
  const c = await browser.newContext({ viewport: { width: 360, height: 740 } });
  const p = await c.newPage();
  await p.goto(BASE + path, { waitUntil: 'networkidle' });
  const wrapped = await p.evaluate(() =>
    [...document.querySelectorAll('header a, header button, .btn')]
      .filter((el) => {
        // tylko widoczny tekst: bez ikon SVG i tekstu dla czytników (.sr-only)
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        const tops = new Set();
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
          if (!n.textContent.trim() || n.parentElement.closest('.sr-only, svg')) continue;
          const r = document.createRange();
          r.selectNodeContents(n);
          for (const rect of r.getClientRects()) if (rect.width > 1) tops.add(Math.round(rect.top));
        }
        return tops.size > 1;
      })
      .map((el) => el.textContent.trim().split(/\s+/).join(' ').slice(0, 20)),
  );
  for (const w of wrapped) fail(`telefon ${path}`, `„${w}” łamie się na dwie linie`);
  await c.close();
}

// telefon: w kalendarzu GitHub widać najnowszy tydzień (gdy sekcja jest)
{
  const c = await browser.newContext({ viewport: { width: 360, height: 740 } });
  const p = await c.newPage();
  await p.goto(BASE + '/', { waitUntil: 'networkidle' });
  const grid = p.locator('#gh [role="img"]');
  if (await grid.count()) {
    const ok = await grid.evaluate((g) => {
      const box = g.parentElement.getBoundingClientRect();
      const last = g.lastElementChild.getBoundingClientRect();
      return last.right <= box.right + 1 && last.left >= box.left;
    });
    if (!ok) fail('telefon', 'kalendarz GitHub ucina najnowsze tygodnie');
  }
  await c.close();
}

// bez JS: treść widoczna, wiersze projektów są linkami
{
  const c = await browser.newContext({ javaScriptEnabled: false });
  const p = await c.newPage();
  await p.goto(BASE + '/');
  const ok = await p.evaluate(() => ({
    rows: document.querySelectorAll('a[data-project]').length,
    preview: [...document.querySelectorAll('[data-preview]')].filter((e) => !e.hidden).length,
  }));
  if (!ok.rows || ok.preview !== 1) fail('bez JS', JSON.stringify(ok));
  await c.close();
}

await browser.close();
console.log(
  `Przegląd ${BASE}: ${all.length} stron, ${links.size} linków wewn., ${external.size} zewn.`,
);
if (notes.size) console.log(`Uwagi spoza kodu:\n- ${[...notes].join('\n- ')}`);
if (problems.length) {
  console.log(`✘ ${problems.length} problemów:\n- ${problems.join('\n- ')}`);
  process.exit(1);
}
console.log('✔ 0 problemów');
