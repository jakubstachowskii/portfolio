export const locales = ['pl', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'pl';

/**
 * Dane właściciela i ustawienia strony. Wartości w nawiasach kwadratowych to placeholdery
 * do uzupełnienia (docs/PROMPT-dla-Claude-Code.md §8).
 */
export const site = {
  firstName: 'Jakub',
  // TODO(content): nazwisko
  lastName: '[Nazwisko]',
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  // TODO(content): adres e-mail
  email: '[twoj@email.pl]',
  // TODO(content): miasto
  city: '[miasto]',
  github: 'jakubstachowskii',
  // TODO(content): profil LinkedIn
  linkedin: '[link-linkedin]',
  // TODO(content): plik CV
  cv: '[link-do-CV]',
  /** Repozytoria pomijane na liście projektów (np. ta strona). */
  hiddenRepos: ['portfolio'] as string[],
  year: 2026,
  defaultLocale,
  locales,
};

/** Sekcje strony głównej w kolejności (nawigacja, kropki, aktywna sekcja). */
export const sections = ['top', 'projekty', 'o-mnie', 'stack', 'kontakt'] as const;
export type SectionId = (typeof sections)[number];
