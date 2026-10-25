import { describe, expect, it } from 'vitest';
import { fill, formatDate, plural } from '@/lib/format';
import { t } from '@/i18n/utils';

describe('plural', () => {
  const pl = t('pl').home.gh.repos;
  it.each([
    [1, '1 publiczne repozytorium'],
    [3, '3 publiczne repozytoria'],
    [5, '5 publicznych repozytoriów'],
    [22, '22 publiczne repozytoria'],
    [12, '12 publicznych repozytoriów'],
  ])('PL: %i', (n, out) => {
    expect(plural(n, pl, 'pl')).toBe(out);
  });

  it('EN', () => {
    const en = t('en').home.gh.repos;
    expect(plural(1, en, 'en')).toBe('1 public repository');
    expect(plural(4, en, 'en')).toBe('4 public repositories');
  });
});

describe('fill i formatDate', () => {
  it('podstawia znane klucze, nieznane zostawia', () => {
    expect(fill('{a} i {b}', { a: 1 })).toBe('1 i {b}');
  });

  it('data po polsku i angielsku, w UTC', () => {
    expect(formatDate('2026-10-25T23:30:00Z', 'pl')).toBe('25 października 2026');
    expect(formatDate('2026-10-25T23:30:00Z', 'en')).toBe('October 25, 2026');
  });
});
