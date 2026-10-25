import type { Locale } from '@/config/site';

export type PluralForms = Record<'one' | 'few' | 'many' | 'other', string>;

/** „5 publicznych repozytoriów”: forma z Intl.PluralRules (PL: one / few / many / other). */
export function plural(n: number, forms: PluralForms, locale: Locale): string {
  const rule = new Intl.PluralRules(locale).select(n);
  return `${n} ${rule in forms ? forms[rule as keyof PluralForms] : forms.other}`;
}

/** Podstawia {klucz} w tekście z i18n. */
export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}

/** „25 października 2026” / „October 25, 2026” (strefa UTC: build w CI i na Vercelu). */
export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso));
}
