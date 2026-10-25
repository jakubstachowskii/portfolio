import type { Repo } from '@/lib/github';

/** Repo z GitHub API z rozsądnymi wartościami domyślnymi. */
export function repo(name: string, extra: Partial<Repo> = {}): Repo {
  return {
    name,
    description: null,
    topics: [],
    language: 'JavaScript',
    homepage: null,
    html_url: `https://github.com/jakubstachowskii/${name}`,
    pushed_at: '2026-09-21T10:00:00Z',
    stargazers_count: 0,
    fork: false,
    archived: false,
    ...extra,
  };
}
