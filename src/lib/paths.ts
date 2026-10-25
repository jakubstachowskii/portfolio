import { defaultLocale, locales, type Locale } from '@/config/site';

export function isLocale(value: string | undefined): value is Locale {
  return (locales as readonly string[]).includes(value ?? '');
}

/** Zwraca locale z URL-a (`/en/...` → `en`), a dla ścieżek bez prefiksu — domyślne. */
export function getLocaleFromPath(pathname: string): Locale {
  const [, first] = pathname.split('/');
  return isLocale(first) ? first : defaultLocale;
}

/**
 * Buduje ścieżkę w danym języku. Domyślny locale nie ma prefiksu (`prefixDefaultLocale: false`).
 * Mapa tłumaczeń slugów (`projekty` ↔ `projects`) dochodzi w Fazie 6.
 */
export function getLocalizedPath(path: string, locale: Locale): string {
  const clean = `/${path.replace(/^\/+/, '')}`;
  const withoutLocale = clean.replace(/^\/(pl|en)(?=\/|$)/, '') || '/';
  if (locale === defaultLocale) return withoutLocale;
  return withoutLocale === '/' ? `/${locale}/` : `/${locale}${withoutLocale}`;
}

/** Segment podstron projektów w danym języku (PL bez prefiksu, EN pod /en/). */
const PROJECTS_SEGMENT: Record<Locale, string> = { pl: 'projekty', en: 'projects' };

/** Adres podstrony projektu: `/projekty/awizacja-app/`, `/en/projects/awizacja-app/`. */
export function projectPath(slug: string, locale: Locale): string {
  return getLocalizedPath(`/${PROJECTS_SEGMENT[locale]}/${slug}/`, locale);
}
