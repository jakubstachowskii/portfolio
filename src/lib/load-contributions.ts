/**
 * Kontrybucje przy buildzie. Bez tokenu → null (sekcja GitHub się nie renderuje, nie pokazujemy
 * siatki bez danych). Z tokenem, gdy API nie odpowiada → kopia src/data/github-contrib.json.
 */
import { pathToFileURL } from 'node:url';
import { GITHUB_TOKEN } from 'astro:env/server';
import { site } from '@/config/site';
import { fetchContributions, toContributions, type Contributions } from '@/lib/contributions';
import { readJson, writeJson } from '@/lib/json-cache';

// ścieżka od katalogu projektu: po zbudowaniu import.meta.url wskazuje na dist/
const CACHE = new URL('src/data/github-contrib.json', pathToFileURL(`${process.cwd()}/`));

let pending: Promise<Contributions | null> | undefined;

export function loadContributions(): Promise<Contributions | null> {
  pending ??= (async () => {
    if (!GITHUB_TOKEN) {
      console.info('[github] brak GITHUB_TOKEN: sekcja aktywności nie będzie wyrenderowana.');
      return null;
    }
    try {
      const data = toContributions(await fetchContributions(site.github, GITHUB_TOKEN));
      if (data) {
        await writeJson(CACHE, data).catch((e: unknown) => {
          console.warn(`[github] nie udało się zapisać kopii: ${String(e)}`);
        });
      }
      return data;
    } catch (err) {
      const cache = await readJson<Contributions>(CACHE);
      console.warn(
        `[github] GraphQL niedostępne (${String(err)})${cache ? ', używam kopii.' : ', sekcja ukryta.'}`,
      );
      return cache;
    }
  })();
  return pending;
}
