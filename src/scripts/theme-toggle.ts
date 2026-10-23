import { THEME_STORAGE_KEY, isTheme, nextTheme, type Theme } from '@/lib/theme';

function current(): Theme {
  const value = document.documentElement.dataset['theme'];
  return isTheme(value) ? value : 'dark';
}

function syncLabels(theme: Theme) {
  for (const btn of document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]')) {
    const label = (theme === 'dark' ? btn.dataset['labelLight'] : btn.dataset['labelDark']) ?? '';
    btn.setAttribute('aria-label', label);
    btn.title = label;
  }
}

/** Przełącznik motywu: zapis w localStorage, etykieta mówi, co zrobi kliknięcie. */
export function initThemeToggle() {
  syncLabels(current());
  for (const btn of document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]')) {
    btn.addEventListener('click', () => {
      const theme = nextTheme(current());
      document.documentElement.dataset['theme'] = theme;
      try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
      } catch {
        // tryb prywatny / zablokowany storage: motyw działa do odświeżenia
      }
      syncLabels(theme);
    });
  }
}
