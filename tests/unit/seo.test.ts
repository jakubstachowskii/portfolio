import { describe, expect, it } from 'vitest';
import { site } from '@/config/site';
import { buildProjects } from '@/lib/projects';
import { isPlaceholder, pageTitle, personJsonLd, projectJsonLd } from '@/lib/seo';
import { repo } from './fixtures';

const BASE = 'https://example.dev';

describe('pageTitle', () => {
  it('główna zaczyna się od imienia i nazwiska, podstrony od tytułu', () => {
    expect(pageTitle('Programista', true)).toBe(`${site.name} — Programista`);
    expect(pageTitle('Awizacja App', false)).toBe(`Awizacja App — ${site.name}`);
  });
});

describe('JSON-LD', () => {
  it('Person bez placeholderów (np. [link-linkedin]) w danych dla wyszukiwarek', () => {
    const p = personJsonLd(BASE, 'Programista');
    expect(p['@type']).toBe('Person');
    expect(p.url).toBe(`${BASE}/`);
    expect(p.sameAs.every((u) => !isPlaceholder(u))).toBe(true);
    expect(p.sameAs).toContain(`https://github.com/${site.github}`);
    expect(isPlaceholder(p.name)).toBe(false);
  });

  it('SoftwareApplication z opisem w danym języku i linkiem do repo', () => {
    const [proj] = buildProjects([repo('AwizacjaApp')], {
      AwizacjaApp: { summary: 'PL', summaryEn: 'EN' },
    });
    const ld = projectJsonLd(proj!, 'en', `${BASE}/en/projects/awizacja-app/`, BASE);
    expect(ld).toMatchObject({
      '@type': 'SoftwareApplication',
      name: 'Awizacja App',
      description: 'EN',
      sameAs: 'https://github.com/jakubstachowskii/AwizacjaApp',
    });
  });
});
