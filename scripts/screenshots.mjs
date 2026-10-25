// Zrzuty stron repo z `homepage` → src/assets/projects/<repo>.png (podgląd zamiast szkicu).
// Lista repo z src/data/github-cache.json (odświeża się przy każdym buildzie): `pnpm build && pnpm screenshots`.
// Istniejących plików nie nadpisuje (ręcznie wrzucony screenshot wygrywa); `--force` nadpisuje.
import { access, mkdir, readFile } from 'node:fs/promises';
import { chromium } from '@playwright/test';

const force = process.argv.includes('--force');
const cache = JSON.parse(await readFile(new URL('../src/data/github-cache.json', import.meta.url)));
const out = new URL('../src/assets/projects/', import.meta.url);
await mkdir(out, { recursive: true });

const targets = cache.repos.filter((r) => r.homepage);
if (!targets.length) console.log('Żadne repo nie ma ustawionego homepage, nie ma czego zrzucać.');

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1,
});
for (const r of targets) {
  const file = new URL(`${r.name}.png`, out);
  const exists = await access(file).then(
    () => true,
    () => false,
  );
  if (exists && !force) {
    console.log(`${r.name}: jest już screenshot, pomijam (--force nadpisuje)`);
    continue;
  }
  try {
    await page.goto(r.homepage, { waitUntil: 'networkidle', timeout: 30_000 });
    await page.screenshot({ path: file });
    console.log(`${r.name}: zapisano ${file.pathname}`);
  } catch (err) {
    console.warn(`${r.name}: nie udało się (${String(err)})`);
  }
}
await browser.close();
