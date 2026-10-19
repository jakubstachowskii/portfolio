/**
 * OKLCH → sRGB → kontrast WCAG 2.x. Używane przez katalog /design, test kontrastu i raport tokenów.
 * Wzory: Björn Ottosson (OKLab), WCAG 2.2 (relative luminance).
 */
export interface Oklch {
  l: number;
  c: number;
  h: number;
  alpha: number;
}

export type Rgb = [number, number, number];

const OKLCH_RE = /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)/;

export function parseOklch(value: string): Oklch | null {
  const m = OKLCH_RE.exec(value);
  if (!m) return null;
  return { l: Number(m[1]), c: Number(m[2]), h: Number(m[3]), alpha: m[4] ? Number(m[4]) : 1 };
}

const toGamma = (v: number) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055);
const clamp = (v: number) => Math.min(1, Math.max(0, v));

/** sRGB 0–1 (z przycięciem do gamutu). */
export function oklchToRgb({ l, c, h }: Oklch): Rgb {
  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const r = 4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_;
  const g = -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_;
  const bl = -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_;
  return [clamp(toGamma(r)), clamp(toGamma(g)), clamp(toGamma(bl))];
}

export function toHex(rgb: Rgb): string {
  return `#${rgb
    .map((v) =>
      Math.round(v * 255)
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')}`;
}

const toLinear = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);

export function luminance([r, g, b]: Rgb): number {
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

export function contrast(a: Rgb, b: Rgb): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}

/** Wyciąga zmienne --c-* z bloku CSS motywu (selektor dokładnie jak w tokens.css). */
export function readThemeColors(css: string, selector: string): Record<string, Oklch> {
  const start = css.indexOf(`${selector} {`);
  if (start < 0) return {};
  const body = css.slice(start, css.indexOf('}', start));
  const out: Record<string, Oklch> = {};
  for (const m of body.matchAll(/--c-([a-z-]+):\s*(oklch\([^)]*\))/g)) {
    const parsed = parseOklch(m[2] ?? '');
    if (m[1] && parsed) out[m[1]] = parsed;
  }
  return out;
}

/** Pary z DESIGN.md §3.2: [tekst/element, tło, minimum]. */
export const CONTRAST_PAIRS: readonly (readonly [string, string, number])[] = [
  ['fg', 'canvas', 4.5],
  ['fg', 'band', 4.5],
  ['fg', 'surface', 4.5],
  ['muted', 'canvas', 4.5],
  ['muted', 'band', 4.5],
  ['muted', 'surface', 4.5],
  ['dim', 'canvas', 4.5],
  ['dim', 'band', 4.5],
  ['dim', 'window', 4.5],
  ['dim', 'surface', 4.5],
  ['accent-text', 'canvas', 4.5],
  ['accent-text', 'band', 4.5],
  ['on-cta', 'cta', 4.5],
  ['success', 'canvas', 4.5],
  ['success', 'band', 4.5],
  ['danger', 'canvas', 4.5],
  ['danger', 'band', 4.5],
  ['accent', 'canvas', 3],
  ['accent', 'band', 3],
  ['line-control', 'canvas', 3],
  ['line-control', 'band', 3],
];

export interface ContrastResult {
  fg: string;
  bg: string;
  min: number;
  ratio: number;
  pass: boolean;
}

export function auditContrast(colors: Record<string, Oklch>): ContrastResult[] {
  return CONTRAST_PAIRS.flatMap(([fg, bg, min]) => {
    const a = colors[fg];
    const b = colors[bg];
    if (!a || !b) return [];
    const ratio = contrast(oklchToRgb(a), oklchToRgb(b));
    return [{ fg, bg, min, ratio, pass: ratio >= min }];
  });
}
