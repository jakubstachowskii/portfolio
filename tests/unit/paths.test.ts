import { describe, expect, it } from 'vitest';
import { getLocaleFromPath, getLocalizedPath, isLocale, projectPath } from '@/lib/paths';

describe('isLocale', () => {
  it('rozpoznaje obsługiwane języki', () => {
    expect(isLocale('pl')).toBe(true);
    expect(isLocale('en')).toBe(true);
    expect(isLocale('de')).toBe(false);
    expect(isLocale(undefined)).toBe(false);
  });
});

describe('getLocaleFromPath', () => {
  it('zwraca en dla ścieżek z prefiksem /en', () => {
    expect(getLocaleFromPath('/en/')).toBe('en');
    expect(getLocaleFromPath('/en/projects')).toBe('en');
  });

  it('zwraca domyślny pl dla ścieżek bez prefiksu', () => {
    expect(getLocaleFromPath('/')).toBe('pl');
    expect(getLocaleFromPath('/projekty')).toBe('pl');
    expect(getLocaleFromPath('/english-notes')).toBe('pl');
  });
});

describe('getLocalizedPath', () => {
  it('domyślny język nie ma prefiksu', () => {
    expect(getLocalizedPath('/', 'pl')).toBe('/');
    expect(getLocalizedPath('/en/', 'pl')).toBe('/');
    expect(getLocalizedPath('/en/kontakt', 'pl')).toBe('/kontakt');
  });

  it('dodaje prefiks dla en', () => {
    expect(getLocalizedPath('/', 'en')).toBe('/en/');
    expect(getLocalizedPath('kontakt', 'en')).toBe('/en/kontakt');
    expect(getLocalizedPath('/en/kontakt', 'en')).toBe('/en/kontakt');
  });
});

describe('projectPath', () => {
  it('PL bez prefiksu, EN pod /en/projects/', () => {
    expect(projectPath('awizacja-app', 'pl')).toBe('/projekty/awizacja-app/');
    expect(projectPath('awizacja-app', 'en')).toBe('/en/projects/awizacja-app/');
  });
});
