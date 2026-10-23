import { describe, expect, it } from 'vitest';
import { sectionHref } from '@/lib/sections';

describe('sectionHref', () => {
  it('na stronie głównej sama kotwica', () => {
    expect(sectionHref('projekty', 'pl', true)).toBe('#projekty');
    expect(sectionHref('kontakt', 'en', true)).toBe('#kontakt');
  });

  it('na podstronie adres strony głównej w danym języku', () => {
    expect(sectionHref('projekty', 'pl', false)).toBe('/#projekty');
    expect(sectionHref('stack', 'en', false)).toBe('/en/#stack');
  });
});
