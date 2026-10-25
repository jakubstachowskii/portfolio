export const locales = ['pl', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'pl';

/**
 * Dane właściciela i ustawienia strony.
 */
export const site = {
  firstName: 'Jakub',
  lastName: 'Stachowski',
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  email: 'jakub.stachowski@proton.me',
  city: 'Rybnik',
  github: 'jakubstachowskii',
  linkedin: 'https://www.linkedin.com/in/jakub-stachowski-845937444',
  /** Adres CV (np. '/cv.pdf' po wrzuceniu pliku do public/); pusty = przycisk „CV.PDF ↓” ukryty. */
  cv: '',
  /** Repozytoria pomijane na liście projektów (np. ta strona). */
  hiddenRepos: ['portfolio'] as string[],
  year: 2026,
  defaultLocale,
  locales,
};

/** Skrzynka z narzędziami (sekcja Stack): kategoria → etykieta z i18n (`home.stack.cats`). */
export const stack = [
  { cat: 'web', name: 'HTML · CSS' },
  { cat: 'web', name: 'JavaScript' },
  { cat: 'ui', name: 'React' },
  { cat: 'desktop', name: 'Electron' },
  { cat: 'data', name: 'SQLite' },
  { cat: 'tools', name: 'Vite' },
  { cat: 'tools', name: 'Git' },
  { cat: 'tools', name: 'Claude Code' },
] as const;
export type StackCategory = (typeof stack)[number]['cat'];

/** Sekcje strony głównej w kolejności (nawigacja, kropki, aktywna sekcja). */
export const sections = ['top', 'projekty', 'o-mnie', 'stack', 'kontakt'] as const;
export type SectionId = (typeof sections)[number];
