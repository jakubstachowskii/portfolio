// Zakresy znaków fontów (DECISIONS #29). Wspólne dla scripts/subset-fonts.mjs i astro.config.mjs.

/** Łacina podstawowa + Latin-1 (ó, ©, ×, ·) + interpunkcja typograficzna, strzałki i €. */
export const LATIN = [
  'U+0020-007E',
  'U+00A0-00FF',
  'U+2010-2027',
  'U+2030-203A',
  'U+20AC',
  'U+2122',
  'U+2190-2199',
];

/** Polskie litery spoza Latin-1: Ą ą Ć ć Ę ę Ł ł Ń ń Ś ś Ź ź Ż ż. */
export const POLISH = ['U+0104-0107', 'U+0118-0119', 'U+0141-0144', 'U+015A-015B', 'U+0179-017C'];
