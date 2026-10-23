// Podzbiory fontów (DECISIONS #29): tylko znaki i zakresy osi, których strona używa.
// Uruchom po zmianie krojów lub znaków: `pnpm fonts:subset`. Wynik jest commitowany w src/assets/fonts/.
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import subsetFont from 'subset-font';

const require = createRequire(import.meta.url);
const OUT = new URL('../src/assets/fonts/', import.meta.url);

/** Zakresy znaków; muszą się zgadzać z `unicodeRange` w astro.config.mjs (eksport z src/lib/font-ranges.mjs). */
import { LATIN, POLISH } from '../src/lib/font-ranges.mjs';

const families = [
  {
    // nagłówki .disp: waga 800, szerokość 125% (100% w wąskich tytułach projektów)
    name: 'archivo',
    pkg: '@fontsource-variable/archivo/files/archivo-{subset}-standard-normal.woff2',
    axes: { wght: 800, wdth: { min: 100, max: 125 } },
  },
  {
    name: 'inter',
    pkg: '@fontsource-variable/inter/files/inter-{subset}-wght-normal.woff2',
    axes: { wght: { min: 400, max: 600 } },
  },
  {
    name: 'jetbrains-mono',
    pkg: '@fontsource-variable/jetbrains-mono/files/jetbrains-mono-{subset}-wght-normal.woff2',
    axes: { wght: { min: 400, max: 700 } },
  },
];

/** "U+0020-007E" → znaki z zakresu */
function chars(ranges) {
  return ranges
    .flatMap((r) => {
      const [a, b = a] = r.replace('U+', '').split('-');
      const from = parseInt(a, 16);
      const to = parseInt(b, 16);
      return Array.from({ length: to - from + 1 }, (_, i) => String.fromCodePoint(from + i));
    })
    .join('');
}

await mkdir(OUT, { recursive: true });
for (const f of families) {
  for (const [subset, src, ranges] of [
    ['latin', 'latin', LATIN],
    ['pl', 'latin-ext', POLISH],
  ]) {
    const input = await readFile(require.resolve(f.pkg.replace('{subset}', src)));
    const output = await subsetFont(input, chars(ranges), {
      targetFormat: 'woff2',
      variationAxes: f.axes,
    });
    const file = new URL(`${f.name}-${subset}.woff2`, OUT);
    await writeFile(file, output);
    const kb = ((await stat(file)).size / 1024).toFixed(1);
    console.log(
      `${f.name}-${subset}.woff2  ${kb} KB  (źródło ${(input.length / 1024).toFixed(1)} KB)`,
    );
  }
}
