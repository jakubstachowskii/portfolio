/**
 * Repozytoria z GitHub API przy buildzie (docs/PROMPT-dla-Claude-Code.md §2, DECISIONS #30).
 * Funkcje czyste (filtr, nazwy, wyciąg z README) są testowane w tests/unit/github.test.ts;
 * sieć i plik cache są na brzegu (fetchRepos, fetchReadme, readCache, writeCache).
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const API = 'https://api.github.com';
/** Topik, którym ukrywa się repo bez zmiany kodu strony. */
export const HIDE_TOPIC = 'portfolio-hide';

/** Pola repo, których używamy (podzbiór odpowiedzi GET /users/{user}/repos). */
export interface Repo {
  name: string;
  description: string | null;
  topics: string[];
  language: string | null;
  homepage: string | null;
  html_url: string;
  pushed_at: string;
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
  /** pierwszy akapit README, gdy brak `description` (dociągany osobno) */
  readme?: string | null;
}

export interface GithubCache {
  user: string;
  repos: Repo[];
}

function headers(token?: string): HeadersInit {
  return {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function fetchRepos(user: string, token?: string): Promise<Repo[]> {
  const res = await fetch(`${API}/users/${user}/repos?per_page=100&sort=pushed`, {
    headers: headers(token),
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status} ${res.statusText}`);
  const data = (await res.json()) as Repo[];
  return data.map((r) => ({
    name: r.name,
    description: r.description,
    topics: r.topics ?? [],
    language: r.language,
    homepage: r.homepage,
    html_url: r.html_url,
    pushed_at: r.pushed_at,
    stargazers_count: r.stargazers_count,
    fork: r.fork,
    archived: r.archived,
  }));
}

/** Surowy README (Markdown) albo null, gdy repo go nie ma. */
export async function fetchReadme(user: string, repo: string, token?: string) {
  const res = await fetch(`${API}/repos/${user}/${repo}/readme`, {
    headers: { ...headers(token), Accept: 'application/vnd.github.raw' },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub API ${res.status} ${res.statusText}`);
  return res.text();
}

/** Odrzuca forki, archiwa, repo z listy ukrytych i z topikiem `portfolio-hide`. */
export function filterRepos(repos: Repo[], hidden: string[]): Repo[] {
  const skip = new Set(hidden.map((n) => n.toLowerCase()));
  return repos.filter(
    (r) =>
      !r.fork && !r.archived && !skip.has(r.name.toLowerCase()) && !r.topics.includes(HIDE_TOPIC),
  );
}

/** `AwizacjaApp` → „Awizacja App”, `Pig-Game` → „Pig Game”, `my_tool` → „My Tool”. */
export function prettifyName(name: string): string {
  return name
    .replace(/[-_.]+/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0]!.toUpperCase() + w.slice(1))
    .join(' ');
}

/** Pierwszy akapit tekstu z README: bez nagłówków, tabel, list, kodu, obrazków i HTML-a. */
export function readmeExcerpt(markdown: string, max = 200): string | null {
  const text = markdown
    .replace(/```[\s\S]*?```/g, '\n')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, '');
  const para = text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .find(
      (block) =>
        block &&
        !/^(#|\||[-*+] |\d+\. |>|!\[|\[!\[)/.test(block) &&
        /\p{L}/u.test(block.replace(/!?\[[^\]]*\]\([^)]*\)/g, '')),
    );
  if (!para) return null;
  const clean = para
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`~]+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:–—-]\s*$/, '')}…`;
}

export async function readCache(file: URL): Promise<GithubCache | null> {
  try {
    return JSON.parse(await readFile(file, 'utf8')) as GithubCache;
  } catch {
    return null;
  }
}

/** Zapisuje kopię tylko przy zmianie danych (bez znacznika czasu: brak szumu w gicie). */
export async function writeCache(file: URL, cache: GithubCache): Promise<boolean> {
  const next = `${JSON.stringify(cache, null, 2)}\n`;
  const prev = await readFile(file, 'utf8').catch(() => '');
  if (prev === next) return false;
  await mkdir(new URL('.', file), { recursive: true });
  await writeFile(file, next);
  return true;
}
