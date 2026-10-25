import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { MOCKS, PLATFORMS } from '@/lib/projects';

/**
 * Nadpisania projektów: 1 plik .md = 1 repo (nazwa pliku = nazwa repo na GitHubie).
 * Wszystkie pola opcjonalne; nadpisanie wygrywa z danymi z GitHub API. Treść pliku = opis na podstronę.
 */
const projects = defineCollection({
  loader: glob({
    pattern: '*.md',
    base: './src/content/projects',
    // id = nazwa pliku bez zmian (wielkość liter jak w nazwie repo)
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string().optional(),
      /** opis PL (lista + podgląd) */
      summary: z.string().optional(),
      /** opis EN; bez niego wersja angielska bierze `summary` */
      summaryEn: z.string().optional(),
      platforms: z.array(z.enum(PLATFORMS)).optional(),
      tags: z.array(z.string()).optional(),
      mock: z.enum(MOCKS).optional(),
      /** niższy = wyżej na liście; bez `order` sortowanie po ostatnim pushu */
      order: z.number().int().optional(),
      cover: image().optional(),
      gallery: z.array(image()).optional(),
      featured: z.boolean().optional(),
      hidden: z.boolean().optional(),
    }),
});

export const collections = { projects };
