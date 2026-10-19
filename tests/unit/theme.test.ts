import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { describe, expect, it } from 'vitest';
import { nextTheme, resolveTheme } from '@/lib/theme';

describe('resolveTheme', () => {
  it('zapisana preferencja wygrywa', () => {
    expect(resolveTheme('light', false)).toBe('light');
    expect(resolveTheme('dark', true)).toBe('dark');
  });
  it('bez zapisu: system, a domyślnie ciemny', () => {
    expect(resolveTheme(null, true)).toBe('light');
    expect(resolveTheme(null, false)).toBe('dark');
    expect(resolveTheme('garbage', false)).toBe('dark');
  });
  it('nextTheme przełącza', () => {
    expect(nextTheme('dark')).toBe('light');
    expect(nextTheme('light')).toBe('dark');
  });
});

describe('ThemeScript (inline) = resolveTheme', () => {
  const source = readFileSync(
    new URL('../../src/components/layout/ThemeScript.astro', import.meta.url),
    'utf8',
  );
  const script = /<script is:inline>([\s\S]*?)<\/script>/.exec(source)?.[1] ?? '';

  function runInline(stored: string | null, prefersLight: boolean): string | undefined {
    const dataset: Record<string, string> = {};
    const env = {
      localStorage: { getItem: () => stored },
      matchMedia: () => ({ matches: prefersLight }),
      document: { documentElement: { dataset }, addEventListener: () => undefined },
    };
    runInNewContext(script, env);
    return dataset['theme'];
  }

  it.each([
    [null, false],
    [null, true],
    ['light', false],
    ['dark', true],
    ['zły', true],
  ] as const)('stored=%s prefersLight=%s', (stored, prefersLight) => {
    expect(runInline(stored, prefersLight)).toBe(resolveTheme(stored, prefersLight));
  });
});
