/**
 * Hex → sRGB → kontrast WCAG 2.x. Używane przez test kontrastu tokenów (tests/unit/color.test.ts).
 */
export type Rgb = [number, number, number];

/** #rgb lub #rrggbb → sRGB 0–1. */
export function parseHex(value: string): Rgb | null {
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(value.trim());
  if (!m) return null;
  const hex = m[1]!.length === 3 ? [...m[1]!].map((c) => c + c).join('') : m[1]!;
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) as Rgb;
}

const toLinear = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);

export function luminance([r, g, b]: Rgb): number {
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

export function contrast(a: Rgb, b: Rgb): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}

/** Wyciąga zmienne z kolorem hex z bloku CSS motywu (selektor dokładnie jak w tokens.css). */
export function readThemeColors(css: string, selector: string): Record<string, Rgb> {
  const start = css.indexOf(`${selector} {`);
  if (start === -1) return {};
  const body = css.slice(start, css.indexOf('}', start));
  const out: Record<string, Rgb> = {};
  for (const [, name, value] of body.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{3,6})\s*;/g)) {
    const rgb = parseHex(value!);
    if (rgb) out[name!] = rgb;
  }
  return out;
}

const TEXTS = ['text', 'text2', 'text3', 'acc-text'] as const;
const BACKGROUNDS = ['bg', 'bg2', 'surface', 'surface2'] as const;

/** Pary tekst/tło, które muszą mieć ≥ 4.5:1 (WCAG 2.2 AA, zwykły tekst). */
export const CONTRAST_PAIRS: [fg: string, bg: string][] = [
  ...TEXTS.flatMap((fg) => BACKGROUNDS.map((bg) => [fg, bg] as [string, string])),
  ['acc-ink', 'acc'],
];

export interface ContrastResult {
  fg: string;
  bg: string;
  ratio: number;
  min: number;
}

export function auditContrast(colors: Record<string, Rgb>, min = 4.5): ContrastResult[] {
  return CONTRAST_PAIRS.flatMap(([fg, bg]) => {
    const a = colors[fg];
    const b = colors[bg];
    return a && b ? [{ fg, bg, ratio: contrast(a, b), min }] : [];
  });
}
