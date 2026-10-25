/**
 * Metadane stron: tytuły, adresy absolutne, JSON-LD (Person na głównej, SoftwareApplication na
 * podstronach projektów). Czyste funkcje, test: tests/unit/seo.test.ts.
 */
import { site, type Locale } from '@/config/site';
import type { Project } from '@/lib/projects';

/** Wartości w nawiasach kwadratowych to placeholdery z site.ts — nie trafiają do danych dla wyszukiwarek. */
export function isPlaceholder(value: string): boolean {
  return /^\[.*\]$/.test(value.trim()) || value.includes('[');
}

/** Główna: „Jakub Nazwisko — opis”; podstrony: „Tytuł — Jakub Nazwisko”. */
export function pageTitle(title: string, home: boolean): string {
  return home ? `${site.name} — ${title}` : `${title} — ${site.name}`;
}

export function absolute(path: string, base: URL | string): string {
  return new URL(path, base).href;
}

export const OG_LOCALE: Record<Locale, string> = { pl: 'pl_PL', en: 'en_US' };

export function personJsonLd(base: URL | string, jobTitle: string) {
  const sameAs = [`https://github.com/${site.github}`, site.linkedin].filter(
    (u) => !isPlaceholder(u),
  );
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: isPlaceholder(site.lastName) ? site.firstName : site.name,
    url: absolute('/', base),
    jobTitle,
    sameAs,
  };
}

export function projectJsonLd(p: Project, locale: Locale, url: string, base: URL | string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: p.title,
    description: p.desc[locale],
    url,
    applicationCategory: 'BusinessApplication',
    keywords: p.tags.join(', '),
    sameAs: p.repo,
    author: { '@type': 'Person', name: site.firstName, url: absolute('/', base) },
  };
}
