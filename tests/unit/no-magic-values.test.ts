import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Strażnik reguły z CLAUDE.md: kolory, odstępy, promienie i czasy tylko z tokenów (src/styles/tokens.css).
 * Sprawdza komponenty i layouty (nie tokens.css i nie katalog /design).
 */
const ROOT = new URL('../../src/', import.meta.url).pathname.replace(/^\/(\w:)/, '$1');
const DIRS = ['components', 'layouts'];

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory()
      ? files(path)
      : /\.(astro|tsx?|css)$/.test(name)
        ? [path]
        : [];
  });
}

const RULES: [string, RegExp][] = [
  ['kolor hex', /(?<![\w&])#[0-9a-fA-F]{3,8}\b/],
  ['funkcja koloru', /\b(rgba?|hsla?|oklch)\(/],
  ['arbitrary value Tailwinda z liczbą', /-\[\s*-?\d/],
  // klasy Tailwinda nie mają spacji w środku — to odróżnia je od sygnatur indeksu TS
  ['arbitrary property Tailwinda', /\[[a-z-]+:[^\]\s]+\]/],
  ['surowy czas animacji', /\b\d+m?s\b(?!\w)/],
  ['odstęp/wymiar w px (poza 1px linią)', /\b(?:[2-9]|\d{2,})px\b/],
];

// Dozwolone wyjątki: meta theme-color musi być literałem (przeglądarka nie czyta zmiennych CSS).
const ALLOW = [/name="theme-color"/];

describe('zero magicznych wartości w komponentach i layoutach', () => {
  const all = DIRS.flatMap((d) => files(join(ROOT, d)));

  it('są pliki do sprawdzenia', () => {
    expect(all.length).toBeGreaterThan(10);
  });

  it.each(all.map((f) => [relative(ROOT, f), f]))('%s', (_name, file) => {
    const problems = readFileSync(file, 'utf8')
      .split('\n')
      .flatMap((line, i) => {
        if (ALLOW.some((a) => a.test(line)) || /^\s*(\/\/|\*|<!--)/.test(line)) return [];
        return RULES.filter(([, re]) => re.test(line)).map(
          ([rule]) => `${i + 1}: ${rule} → ${line.trim()}`,
        );
      });
    expect(problems).toEqual([]);
  });
});
