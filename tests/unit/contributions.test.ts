import { describe, expect, it } from 'vitest';
import { toContributions, type ContributionsResponse } from '@/lib/contributions';

const LEVEL = ['NONE', 'FIRST_QUARTILE', 'SECOND_QUARTILE', 'THIRD_QUARTILE', 'FOURTH_QUARTILE'];

/** n tygodni po 7 dni; liczba kontrybucji = indeks dnia % 5 */
function response(n: number, extra: Partial<NonNullable<ContributionsResponse['user']>> = {}) {
  let day = 0;
  const weeks = Array.from({ length: n }, () => ({
    contributionDays: Array.from({ length: 7 }, () => {
      const c = day % 5;
      const date = new Date(Date.UTC(2025, 11, 1 + day++)).toISOString().slice(0, 10);
      return { date, contributionCount: c, contributionLevel: LEVEL[c]! };
    }),
  }));
  return {
    user: {
      repositories: { totalCount: 5 },
      lastPushed: {
        nodes: [{ defaultBranchRef: { target: { committedDate: '2026-10-25T08:19:00Z' } } }],
      },
      contributionsCollection: { contributionCalendar: { weeks } },
      ...extra,
    },
  } satisfies ContributionsResponse;
}

describe('toContributions', () => {
  it('bierze ostatnie tygodnie, poziomy 0–4 i sumę z widocznych dni', () => {
    const c = toContributions(response(53), 44)!;
    expect(c.weeks).toHaveLength(44);
    expect(c.weeks.every((w) => w.length === 7)).toBe(true);
    // ostatni dzień odpowiedzi jest ostatnim dniem siatki
    expect(c.weeks.at(-1)!.at(-1)!.date).toBe('2026-12-06');
    expect(c.weeks.flat().every((d) => d.level === d.count)).toBe(true);
    expect(c.total).toBe(c.weeks.flat().reduce((s, d) => s + d.count, 0));
  });

  it('liczba publicznych repo i data ostatniego commita', () => {
    const c = toContributions(response(2))!;
    expect(c.publicRepos).toBe(5);
    expect(c.lastCommit).toBe('2026-10-25T08:19:00Z');
  });

  it('krótszy kalendarz zostaje bez dopełniania; brak commita → null', () => {
    const c = toContributions(response(3, { lastPushed: { nodes: [] } }))!;
    expect(c.weeks).toHaveLength(3);
    expect(c.lastCommit).toBeNull();
  });

  it('nieznany użytkownik → null', () => {
    expect(toContributions({ user: null })).toBeNull();
  });
});
