/**
 * Lista projektów przy buildzie: GitHub API → (przy błędzie) kopia w src/data/github-cache.json,
 * + nadpisania z kolekcji `projects` + screenshoty z src/assets/projects/<repo>.(png|jpg|webp).
 * Wynik jest liczony raz na build (obie wersje językowe korzystają z tej samej obietnicy).
 */
import { pathToFileURL } from 'node:url';
import type { ImageMetadata } from 'astro';
import { getCollection } from 'astro:content';
import { GITHUB_TOKEN } from 'astro:env/server';
import { site } from '@/config/site';
import {
  fetchReadme,
  fetchRepos,
  filterRepos,
  readmeExcerpt,
  type GithubCache,
  type Repo,
} from '@/lib/github';
import { readJson, writeJson } from '@/lib/json-cache';
import { buildProjects, type Override, type Project } from '@/lib/projects';

// ścieżka od katalogu projektu: po zbudowaniu import.meta.url wskazuje na dist/
const CACHE = new URL('src/data/github-cache.json', pathToFileURL(`${process.cwd()}/`));

const coverFiles = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/projects/*.{png,jpg,jpeg,webp,avif}',
  { eager: true },
);
const covers = Object.fromEntries(
  Object.entries(coverFiles).map(([path, mod]) => [
    path
      .split('/')
      .pop()!
      .replace(/\.\w+$/, ''),
    mod.default,
  ]),
);

async function loadRepos(withSummary: Set<string>): Promise<Repo[]> {
  const user = site.github;
  try {
    const repos = filterRepos(await fetchRepos(user, GITHUB_TOKEN), site.hiddenRepos);
    // README tylko tam, gdzie brakuje opisu i nie ma go nadpisanie (oszczędza limit API)
    for (const r of repos) {
      if (r.description || withSummary.has(r.name)) continue;
      const md = await fetchReadme(user, r.name, GITHUB_TOKEN);
      r.readme = md ? readmeExcerpt(md) : null;
    }
    await writeJson(CACHE, { user, repos } satisfies GithubCache).catch((e: unknown) => {
      console.warn(`[projekty] nie udało się zapisać kopii: ${String(e)}`);
    });
    return repos;
  } catch (err) {
    const cache = await readJson<GithubCache>(CACHE);
    if (!cache) throw err;
    console.warn(`[projekty] GitHub API niedostępne (${String(err)}), używam kopii z cache.`);
    // filtr jeszcze raz: lista ukrytych mogła się zmienić od zapisu kopii
    return filterRepos(cache.repos, site.hiddenRepos);
  }
}

let pending: Promise<Project[]> | undefined;

export function loadProjects(): Promise<Project[]> {
  pending ??= (async () => {
    const entries = await getCollection('projects');
    const overrides: Record<string, Override> = Object.fromEntries(
      entries.map((e) => [e.id, e.data]),
    );
    const withSummary = new Set(entries.filter((e) => e.data.summary).map((e) => e.id));
    return buildProjects(await loadRepos(withSummary), overrides, covers);
  })();
  return pending;
}
