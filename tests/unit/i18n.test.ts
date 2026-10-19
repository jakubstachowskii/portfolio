import { describe, expect, it } from 'vitest';
import { t } from '@/i18n/utils';

function keys(obj: object, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    typeof v === 'object' && v !== null ? keys(v as object, `${prefix}${k}.`) : [`${prefix}${k}`],
  );
}

describe('słowniki i18n', () => {
  it('pl i en mają identyczny zestaw kluczy', () => {
    expect(keys(t('en')).sort()).toEqual(keys(t('pl')).sort());
  });
});
