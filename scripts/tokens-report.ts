/**
 * Generuje docs/DESIGN-TOKENS.md z src/styles/tokens.css: kolory (OKLCH + hex) i zmierzone kontrasty.
 * Uruchom: pnpm tokens:report (Node ≥ 24 wykonuje TypeScript natywnie).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { auditContrast, oklchToRgb, readThemeColors, toHex } from '../src/lib/color.ts';

const css = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');
const themes = {
  dark: readThemeColors(css, ":root,\n[data-theme='dark']"),
  light: readThemeColors(css, "[data-theme='light']"),
};

const fmt = (o: { l: number; c: number; h: number; alpha: number }) =>
  `oklch(${o.l} ${o.c} ${o.h}${o.alpha < 1 ? ` / ${o.alpha}` : ''})`;

const tokens = Object.keys(themes.dark);
const colorRows = tokens.map((t) => {
  const d = themes.dark[t];
  const l = themes.light[t];
  return `| \`--color-${t}\` | ${d ? `\`${fmt(d)}\` ${toHex(oklchToRgb(d))}` : '—'} | ${l ? `\`${fmt(l)}\` ${toHex(oklchToRgb(l))}` : '—'} |`;
});

const dark = auditContrast(themes.dark);
const light = auditContrast(themes.light);
const contrastRows = dark.map((r, i) => {
  const lr = light[i];
  const mark = (pass: boolean) => (pass ? '✅' : '❌');
  return `| ${r.fg} / ${r.bg} | ${r.ratio.toFixed(2)} ${mark(r.pass)} | ${lr ? `${lr.ratio.toFixed(2)} ${mark(lr.pass)}` : '—'} | ${r.min} |`;
});

const allPass = [...dark, ...light].every((r) => r.pass);

const md = `# DESIGN-TOKENS.md: paleta i zmierzone kontrasty

> Plik generowany: \`pnpm tokens:report\` (źródło: \`src/styles/tokens.css\`, obliczenia: \`src/lib/color.ts\`).
> Nie edytuj ręcznie. Te same pary pilnuje test \`tests/unit/color.test.ts\`.
> Hex jest wyliczony z OKLCH (sRGB, przycięcie do gamutu); kolory z alfą liczone bez tła.

## Kolory

| Token | Dark (domyślny) | Light |
|---|---|---|
${colorRows.join('\n')}

## Kontrasty WCAG 2.x (pary z DESIGN.md §3.2)

Wynik: **${allPass ? 'wszystkie pary spełniają wymóg' : 'SĄ PARY PONIŻEJ WYMOGU'}**.

| Para | Dark | Light | Min |
|---|---|---|---|
${contrastRows.join('\n')}

\`--color-line\` i \`--color-line-strong\` są dekoracyjne (separatory), nie identyfikują kontrolek, więc nie podlegają 3:1 (WCAG 1.4.11). Kontrolki używają \`--color-line-control\`.
`;

writeFileSync(new URL('../docs/DESIGN-TOKENS.md', import.meta.url), md);
console.log(
  `DESIGN-TOKENS.md: ${tokens.length} kolorów, ${dark.length} par × 2 motywy, ${allPass ? 'OK' : 'BŁĘDY'}`,
);
