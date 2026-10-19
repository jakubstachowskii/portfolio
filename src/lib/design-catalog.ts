/**
 * Dane katalogu /design (tylko dev / build testowy). Opisy są po polsku: to narzędzie dewelopera,
 * nie UI strony, więc nie idą przez i18n.
 */
import tokensCss from '@/styles/tokens.css?raw';
import { auditContrast, oklchToRgb, readThemeColors, toHex, type ContrastResult } from './color';

export const THEMES = ['dark', 'light'] as const;
export type CatalogTheme = (typeof THEMES)[number];

const SELECTORS: Record<CatalogTheme, string> = {
  dark: ":root,\n[data-theme='dark']",
  light: "[data-theme='light']",
};

export interface Swatch {
  token: string;
  hex: string;
}

export function swatches(theme: CatalogTheme): Swatch[] {
  const colors = readThemeColors(tokensCss, SELECTORS[theme]);
  return Object.entries(colors).map(([token, value]) => ({ token, hex: toHex(oklchToRgb(value)) }));
}

export function contrastTable(theme: CatalogTheme): ContrastResult[] {
  return auditContrast(readThemeColors(tokensCss, SELECTORS[theme]));
}

export const TEXT_STYLES = [
  ['text-display', 'Funnel Display 600', 'Imię Nazwisko'],
  ['text-h2', 'Funnel Display 600', 'Kalkulator mebli'],
  ['text-h3', 'Funnel Display 600', 'Projekty'],
  ['text-lead', 'Funnel Sans 400', 'Buduję dopracowane narzędzia — od desktopu po web.'],
  ['text-body-lg', 'Funnel Sans 400', 'Rozkrój mebli, rysunek, lista rozkroju i PDF dla stolarni.'],
  ['text-body', 'Funnel Sans 400', 'Zażółć gęślą jaźń. Treść akapitu w case study.'],
  ['text-ui', 'Funnel Sans 500', 'Zobacz projekty'],
  ['text-caption', 'Funnel Sans 400', 'Moja rola'],
  ['text-mono', 'Geist Mono 400', 'web · single-page'],
  ['text-mono-sm', 'Geist Mono 400', 'Ctrl K'],
] as const;

/** Skala 8pt (DESIGN.md §5.1): klasa szerokości Tailwinda → px. */
export const SPACING = [
  ['w-0.5', 4],
  ['w-1', 8],
  ['w-2', 16],
  ['w-3', 24],
  ['w-4', 32],
  ['w-6', 48],
  ['w-8', 64],
  ['w-12', 96],
  ['w-16', 128],
] as const;

export const RADII = [
  ['rounded-xs', 8],
  ['rounded-sm', 10],
  ['rounded-md', 18],
  ['rounded-lg', 26],
  ['rounded-pill', 999],
] as const;

export const SHADOWS = [
  'shadow-key',
  'shadow-key-pressed',
  'shadow-stage',
  'shadow-cta-glow',
] as const;

/** Pięć stanów każdego interaktywnego elementu (DESIGN.md §8). */
export const STATES = [
  ['default', undefined],
  ['hover', 'hover'],
  ['focus', 'focus'],
  ['active', 'active'],
  ['disabled', 'disabled'],
] as const;
