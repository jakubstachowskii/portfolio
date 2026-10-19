import { defaultLocale, type Locale } from '@/config/site';
import { isLocale } from '@/lib/paths';
import { en } from './en';
import { pl } from './pl';

const dictionaries = { pl, en } as const;

export type Dictionary = typeof pl;

export function t(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Locale bieżącej strony z `Astro.currentLocale` (i18n routing); poza trasami i18n → domyślny. */
export function localeOf(astro: { currentLocale?: string | undefined }): Locale {
  return isLocale(astro.currentLocale) ? astro.currentLocale : defaultLocale;
}

export { defaultLocale };
