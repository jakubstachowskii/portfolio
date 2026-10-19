import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  auditContrast,
  contrast,
  oklchToRgb,
  parseOklch,
  readThemeColors,
  toHex,
} from '@/lib/color';

const css = readFileSync(new URL('../../src/styles/tokens.css', import.meta.url), 'utf8');

describe('konwersja OKLCH', () => {
  it('czerń, biel i znane wartości', () => {
    expect(toHex(oklchToRgb(parseOklch('oklch(0 0 0)')!))).toBe('#000000');
    expect(toHex(oklchToRgb(parseOklch('oklch(1 0 0)')!))).toBe('#ffffff');
    // bursztyn z DESIGN.md §3.1 (#f5b23d) — tolerancja zaokrągleń OKLCH do 3 miejsc
    const amber = oklchToRgb(parseOklch('oklch(0.807 0.148 77)')!);
    expect(contrast(amber, oklchToRgb(parseOklch('oklch(0 0 0)')!))).toBeCloseTo(11.32, 0);
  });

  it('czyta alfę', () => {
    expect(parseOklch('oklch(0.807 0.148 77 / 0.24)')?.alpha).toBe(0.24);
  });
});

describe.each([
  ['dark', ":root,\n[data-theme='dark']"],
  ['light', "[data-theme='light']"],
])('kontrasty tokenów: motyw %s (DESIGN.md §3.2)', (_name, selector) => {
  const colors = readThemeColors(css, selector);
  const results = auditContrast(colors);

  it('wszystkie pary są w pliku', () => {
    expect(results.length).toBe(20);
  });

  it.each(results.map((r) => [`${r.fg} / ${r.bg} ≥ ${r.min}`, r] as const))('%s', (_label, r) => {
    expect(r.ratio).toBeGreaterThanOrEqual(r.min);
  });
});

describe('fallback bez JS ma te same wartości co motyw jasny', () => {
  it('blok prefers-color-scheme = [data-theme=light]', () => {
    const light = readThemeColors(css, "[data-theme='light']");
    const media = readThemeColors(css, ':root:not([data-theme])');
    expect(media).toEqual(light);
  });
});
