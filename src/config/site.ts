export const locales = ['pl', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'pl';

export const site = {
  // TODO(content): imię i nazwisko w formie do wyświetlania (CONTENT-CHECKLIST → Podstawy)
  name: 'TODO(content): imię i nazwisko',
  defaultLocale,
  locales,
} as const;
