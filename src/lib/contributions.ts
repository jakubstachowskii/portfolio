/**
 * Kalendarz kontrybucji z GitHub GraphQL API przy buildzie (docs/PROMPT-dla-Claude-Code.md §3 p. 6,
 * DECISIONS #35). GraphQL wymaga tokenu: bez niego sekcja GitHub się nie renderuje.
 * Transformacje są czyste (tests/unit/contributions.test.ts); sieć tylko w fetchContributions.
 */
const ENDPOINT = 'https://api.github.com/graphql';
/** tyle tygodni mieści siatka wzorca (44 × 7) */
export const WEEKS = 44;

const QUERY = `query($login: String!) {
  user(login: $login) {
    repositories(privacy: PUBLIC, ownerAffiliations: OWNER) { totalCount }
    lastPushed: repositories(first: 1, privacy: PUBLIC, ownerAffiliations: OWNER,
      orderBy: { field: PUSHED_AT, direction: DESC }) {
      nodes { defaultBranchRef { target { ... on Commit { committedDate } } } }
    }
    contributionsCollection {
      contributionCalendar {
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
    }
  }
}`;

export type Level = 0 | 1 | 2 | 3 | 4;

const LEVELS: Record<string, Level> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

interface Day {
  date: string;
  contributionCount: number;
  contributionLevel: string;
}

/** Surowa odpowiedź GraphQL (tylko używane pola). */
export interface ContributionsResponse {
  user: {
    repositories: { totalCount: number };
    lastPushed: {
      nodes: { defaultBranchRef: { target: { committedDate?: string } | null } | null }[];
    };
    contributionsCollection: {
      contributionCalendar: { weeks: { contributionDays: Day[] }[] };
    };
  } | null;
}

export interface Cell {
  date: string;
  count: number;
  level: Level;
}

export interface Contributions {
  /** tygodnie od najstarszego; tydzień = do 7 dni (niedziela → sobota) */
  weeks: Cell[][];
  total: number;
  publicRepos: number;
  /** ISO, data ostatniego commita w ostatnio pushowanym publicznym repo */
  lastCommit: string | null;
}

/** Odpowiedź API → ostatnie `weeks` tygodni + podsumowanie. Null, gdy brak użytkownika. */
export function toContributions(res: ContributionsResponse, weeks = WEEKS): Contributions | null {
  const user = res.user;
  if (!user) return null;
  const all = user.contributionsCollection.contributionCalendar.weeks.slice(-weeks);
  const grid = all.map((w) =>
    w.contributionDays.map((d) => ({
      date: d.date,
      count: d.contributionCount,
      level: LEVELS[d.contributionLevel] ?? 0,
    })),
  );
  return {
    weeks: grid,
    total: grid.flat().reduce((sum, c) => sum + c.count, 0),
    publicRepos: user.repositories.totalCount,
    lastCommit: user.lastPushed.nodes[0]?.defaultBranchRef?.target?.committedDate ?? null,
  };
}

export async function fetchContributions(login: string, token: string) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: QUERY, variables: { login } }),
  });
  if (!res.ok) throw new Error(`GitHub GraphQL ${res.status} ${res.statusText}`);
  const json = (await res.json()) as {
    data?: ContributionsResponse;
    errors?: { message: string }[];
  };
  if (json.errors?.length || !json.data) {
    throw new Error(
      `GitHub GraphQL: ${json.errors?.map((e) => e.message).join('; ') ?? 'brak danych'}`,
    );
  }
  return json.data;
}
