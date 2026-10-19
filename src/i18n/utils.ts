import { defaultLocale, type Locale } from '@/config/site';
import { en } from './en';
import { pl } from './pl';

const dictionaries = { pl, en } as const;

export type Dictionary = typeof pl;

export function t(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export { defaultLocale };
