export type Theme = 'dark' | 'light';

/** Klucz w localStorage (PLAN §17). */
export const THEME_STORAGE_KEY = 'theme';

export function isTheme(value: unknown): value is Theme {
  return value === 'dark' || value === 'light';
}

/**
 * Kolejność: zapisana preferencja > preferencja systemu > ciemny (domyślny, DESIGN.md §3).
 * Tę samą logikę powtarza inline'owy ThemeScript (nie może importować modułów) — test pilnuje zgodności.
 */
export function resolveTheme(stored: string | null, prefersLight: boolean): Theme {
  if (isTheme(stored)) return stored;
  return prefersLight ? 'light' : 'dark';
}

export function nextTheme(current: Theme): Theme {
  return current === 'dark' ? 'light' : 'dark';
}
