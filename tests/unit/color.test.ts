import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { CONTRAST_PAIRS, auditContrast, contrast, parseHex, readThemeColors } from '@/lib/color';

const css = readFileSync(new URL('../../src/styles/tokens.css', import.meta.url), 'utf8');

describe('kontrast WCAG', () => {
  it('czerń na bieli = 21:1', () => {
    expect(contrast(parseHex('#000')!, parseHex('#ffffff')!)).toBeCloseTo(21, 5);
  });

  it('odrzuca nie-hex', () => {
    expect(parseHex('rgba(0,0,0,.5)')).toBeNull();
  });
});

describe.each([
  ['dark', ":root,\n[data-theme='dark']"],
  ['light', "[data-theme='light']"],
])('kontrasty tokenów: motyw %s', (_name, selector) => {
  const results = auditContrast(readThemeColors(css, selector));

  it('wszystkie pary są w pliku', () => {
    expect(results.length).toBe(CONTRAST_PAIRS.length);
  });

  it.each(results.map((r) => [`${r.fg} / ${r.bg} ≥ ${r.min}`, r] as const))('%s', (_label, r) => {
    expect(r.ratio).toBeGreaterThanOrEqual(r.min);
  });
});

describe('fallback bez JS ma te same kolory co motyw jasny', () => {
  it('blok prefers-color-scheme = [data-theme=light]', () => {
    const light = readThemeColors(css, "[data-theme='light']");
    const media = readThemeColors(css, ':root:not([data-theme])');
    expect(media).toEqual(light);
  });
});
