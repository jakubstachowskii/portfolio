/**
 * Projekty na stronie = repozytoria z GitHuba + opcjonalne nadpisania z src/content/projects/
 * (reguły 3–6 z docs/PROMPT-dla-Claude-Code.md §2). Funkcja czysta, test: tests/unit/projects.test.ts.
 */
import type { ImageMetadata } from 'astro';
import type { Locale } from '@/config/site';
import { prettifyName, type Repo } from '@/lib/github';

export const PLATFORMS = ['desktop', 'web', 'mobile'] as const;
export type Platform = (typeof PLATFORMS)[number];

/** Szkic w podglądzie (src/components/mocks/). `generic` = repo bez własnego szkicu. */
export const MOCKS = ['awizacja', 'formatka', 'lotto', 'pig', 'generic'] as const;
export type MockKind = (typeof MOCKS)[number];

/** Frontmatter nadpisania (schema w src/content.config.ts). */
export interface Override {
  title?: string | undefined;
  summary?: string | undefined;
  summaryEn?: string | undefined;
  platforms?: Platform[] | undefined;
  tags?: string[] | undefined;
  mock?: MockKind | undefined;
  order?: number | undefined;
  cover?: ImageMetadata | undefined;
  featured?: boolean | undefined;
  hidden?: boolean | undefined;
}

export interface Project {
  /** nazwa repo (klucz nadpisania) */
  id: string;
  /** adres podstrony: `AwizacjaApp` → `awizacja-app` */
  slug: string;
  num: string;
  title: string;
  /** np. „DESKTOP” albo „DESKTOP · WEB” */
  platforms: string;
  desc: Record<Locale, string>;
  tags: string[];
  repo: string;
  demo?: string | undefined;
  year: number;
  stars: number;
  mock: MockKind;
  cover?: ImageMetadata | undefined;
  featured: boolean;
}

/** `AwizacjaApp` → `awizacja-app`, `Pig-Game` → `pig-game` (ASCII, małe litery, myślniki). */
export function toSlug(name: string): string {
  return prettifyName(name)
    .replace(/ł/g, 'l')
    .replace(/Ł/g, 'L')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function platformsOf(repo: Repo, o?: Override): Platform[] {
  if (o?.platforms?.length) return o.platforms;
  const fromTopics = PLATFORMS.filter((p) => repo.topics.includes(p));
  return fromTopics.length ? fromTopics : ['web'];
}

/** Tagi: z nadpisania, inaczej topiki (bez topików sterujących), inaczej język. */
function tagsOf(repo: Repo, o?: Override): string[] {
  if (o?.tags?.length) return o.tags;
  const topics = repo.topics.filter((t) => !(PLATFORMS as readonly string[]).includes(t));
  if (topics.length) return topics;
  return repo.language ? [repo.language] : [];
}

export function buildProjects(
  repos: Repo[],
  overrides: Record<string, Override>,
  covers: Record<string, ImageMetadata> = {},
): Project[] {
  const items = repos
    .map((repo) => ({ repo, o: overrides[repo.name] }))
    .filter(({ o }) => !o?.hidden)
    .sort((a, b) => {
      const ao = a.o?.order ?? Infinity;
      const bo = b.o?.order ?? Infinity;
      if (ao !== bo) return ao - bo;
      return b.repo.pushed_at.localeCompare(a.repo.pushed_at);
    });
  return items.map(({ repo, o }, i) => {
    const fallback = repo.description || repo.readme || '';
    return {
      id: repo.name,
      slug: toSlug(repo.name),
      num: String(i + 1).padStart(2, '0'),
      title: o?.title ?? prettifyName(repo.name),
      platforms: platformsOf(repo, o)
        .map((p) => p.toUpperCase())
        .join(' · '),
      desc: {
        pl: o?.summary ?? fallback,
        en: o?.summaryEn ?? o?.summary ?? fallback,
      },
      tags: tagsOf(repo, o),
      repo: repo.html_url,
      demo: repo.homepage || undefined,
      year: new Date(repo.pushed_at).getUTCFullYear(),
      stars: repo.stargazers_count,
      mock: o?.mock ?? 'generic',
      cover: o?.cover ?? covers[repo.name],
      featured: o?.featured ?? false,
    };
  });
}

/** Poprzedni i następny projekt na liście (w kółko); przy jednym projekcie brak obu. */
export function neighbours(
  list: Project[],
  id: string,
): { prev?: Project | undefined; next?: Project | undefined } {
  const i = list.findIndex((p) => p.id === id);
  if (i === -1 || list.length < 2) return {};
  return {
    prev: list[(i - 1 + list.length) % list.length],
    next: list[(i + 1) % list.length],
  };
}
