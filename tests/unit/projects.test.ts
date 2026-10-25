import { describe, expect, it } from 'vitest';
import { buildProjects } from '@/lib/projects';
import { repo } from './fixtures';

describe('buildProjects', () => {
  const repos = [
    repo('Newest', { pushed_at: '2026-10-01T00:00:00Z', topics: ['mobile', 'flutter'] }),
    repo('AwizacjaApp', { pushed_at: '2026-09-01T00:00:00Z' }),
    repo('Older', { pushed_at: '2026-08-01T00:00:00Z', readme: 'Opis z README.' }),
    repo('Secret', { pushed_at: '2026-10-02T00:00:00Z' }),
  ];
  const overrides = {
    AwizacjaApp: {
      title: 'Awizacja',
      summary: 'Opis PL',
      summaryEn: 'EN description',
      platforms: ['desktop' as const, 'web' as const],
      tags: ['Electron'],
      mock: 'awizacja' as const,
      order: 1,
    },
    Secret: { hidden: true },
  };
  const out = buildProjects(repos, overrides);

  it('najpierw order z nadpisań, potem pushed_at malejąco; numery po sortowaniu', () => {
    expect(out.map((p) => [p.num, p.id])).toEqual([
      ['01', 'AwizacjaApp'],
      ['02', 'Newest'],
      ['03', 'Older'],
    ]);
  });

  it('nadpisanie wygrywa z danymi z GitHuba', () => {
    expect(out[0]).toMatchObject({
      title: 'Awizacja',
      platforms: 'DESKTOP · WEB',
      desc: { pl: 'Opis PL', en: 'EN description' },
      tags: ['Electron'],
      mock: 'awizacja',
    });
  });

  it('bez nadpisania: czytelna nazwa, platforma i tagi z topików, szkic generic', () => {
    expect(out[1]).toMatchObject({
      title: 'Newest',
      platforms: 'MOBILE',
      tags: ['flutter'],
      mock: 'generic',
      year: 2026,
    });
  });

  it('opis z README, gdy brak description; tag = język; platforma domyślnie web', () => {
    expect(out[2]).toMatchObject({
      desc: { pl: 'Opis z README.', en: 'Opis z README.' },
      tags: ['JavaScript'],
      platforms: 'WEB',
    });
  });

  it('homepage → przycisk demo, inaczej brak', () => {
    const [p] = buildProjects([repo('Web', { homepage: 'https://x.dev' })], {});
    expect(p?.demo).toBe('https://x.dev');
    expect(out[0]?.demo).toBeUndefined();
  });
});
