# DECISIONS.md — dziennik decyzji (ADR-lite)

Format wpisu: **data · decyzja · powód · alternatywy · koszt** (dla zależności: rozmiar w KB po stronie klienta albo „0 KB — tylko build/dev”).

Statusy: `przyjęta` · `proponowana` (czeka na akceptację Piotra) · `zastąpiona przez #N`.

---

## #1 · 2026-10-19 · Wersje bazowe stacku · proponowana

Stan npm na 2026-10-19 (`latest`):

| Pakiet                          | Wersja                | Uwagi                                                              |
| ------------------------------- | --------------------- | ------------------------------------------------------------------ |
| astro                           | 7.4.0                 | Vite 8, kompilator w Rust, Sätteri jako domyślny procesor Markdown |
| tailwindcss / @tailwindcss/vite | 4.3.3                 | CSS-first, bez `tailwind.config.js`                                |
| @astrojs/mdx                    | 8.1.0                 |                                                                    |
| @astrojs/react                  | 7.1.0                 | React 19.3                                                         |
| @astrojs/vercel                 | 11.0.15               |                                                                    |
| @astrojs/sitemap                | 3.7.4                 |                                                                    |
| astro-expressive-code           | 0.44.2                | peer: astro ^7                                                     |
| astro-icon                      | 1.2.0                 |                                                                    |
| eslint                          | 10.13.0               |                                                                    |
| vitest                          | 5.0.5                 |                                                                    |
| @playwright/test                | 1.64.1                |                                                                    |
| typescript                      | **6.0.x** (nie 7.0.2) | patrz #2                                                           |

**Powód:** PLAN §3 każe brać najnowsze stabilne wersje i pinować lockfile.

## #2 · 2026-10-19 · TypeScript 6.x zamiast 7.0 · proponowana

- **Decyzja:** pin `typescript@~6.0`.
- **Powód:** `@astrojs/check@0.9.10` ma peer `typescript ^5 || ^6`, a `typescript-eslint@8.71` ma peer `>=4.8.4 <6.1.0`. TS 7 (natywny kompilator) wywaliłby `pnpm check` i `pnpm lint`.
- **Alternatywy:** TS 7 + `--legacy-peer-deps` (ryzyko cichych błędów), czekanie na wsparcie (blokuje Fazę 0).
- **Do zrobienia:** Renovate podbije wersję, gdy oba pakiety zaczną wspierać TS 7.

## #3 · 2026-10-19 · Node 24 LTS · proponowana

- **Decyzja:** `.nvmrc` = `24`, `engines.node` = `>=24.11 <25`.
- **Powód:** Astro 7 wymaga Node `>=22.22.0`. Node 24 to aktywny LTS (lokalnie jest 24.22.0). Node 26 wejdzie w LTS dopiero pod koniec października 2026, więc podbijemy go przez Renovate.
- **Alternatywy:** Node 22, czyli maintenance LTS (krócej wspierany).

## #4 · 2026-10-19 · Zod 4 przez `astro/zod` · proponowana

- **Decyzja:** w `content.config.ts` i Actions używamy `import { z } from 'astro/zod'`, nie `astro:content`.
- **Powód:** od Astro 6 eksport `z` z `astro:content` jest przestarzały, a Zod 4 zmienia API.
- **Wpływ na PLAN §7:** `z.string().url()` → `z.url()`, `z.string().email()` → `z.email()`, `{ message }` → `{ error }`.

## #5 · 2026-10-19 · Procesor Markdown: unified, nie Sätteri · proponowana

- **Decyzja:** dodajemy `@astrojs/markdown-remark` i ustawiamy `markdown.processor: unified()`.
- **Powód:** Astro 7 domyślnie używa Sätteri, który nie obsługuje pluginów remark/rehype. PLAN wymaga Mermaid przy buildzie (`rehype-mermaid`), a Expressive Code i ewentualne pluginy (np. autolink nagłówków dla TOC) to ekosystem unified.
- **Alternatywy:** Sätteri + własne pluginy `hastPlugins` (więcej pracy, brak gotowych).
- **Koszt:** 0 KB po stronie klienta, wyłącznie build.
- **Do weryfikacji w Fazie 0:** czy `astro-expressive-code` działa z MDX w Astro 7.

## #6 · 2026-10-19 · Fonty przez Astro Fonts API (Fontsource) · proponowana

- **Decyzja:** od Astro 6 Fonts API jest stabilne. Używamy pola `fonts` w configu z `fontProviders.fontsource()` i `subsets: ['latin', 'latin-ext']` oraz `<Font cssVariable preload />`.
- **Powód:** PLAN §3 każe użyć Fonts API, jeśli jest stabilne. Jest. Geist i JetBrains Mono są w Fontsource jako variable, z latin-ext, na licencji OFL-1.1.
- **Uwaga:** ostateczne fonty wybiera `docs/DESIGN.md` (Faza 1a), więc w Fazie 0 fontów nie konfigurujemy.

## #7 · 2026-10-19 · ESLint 10 a jsx-a11y · proponowana

- **Decyzja:** zamiast `eslint-plugin-jsx-a11y` używamy `eslint-plugin-jsx-a11y-x`.
- **Powód:** `eslint-plugin-jsx-a11y@6.10.2` ma peer `eslint <=9`. `eslint-plugin-astro@3.2` wspiera ESLint >=10 i oficjalnie przyjmuje `eslint-plugin-jsx-a11y-x` jako alternatywę.
- **Alternatywy:** zostać na ESLint 9 (starsza major, `eslint-plugin-astro@3` wymaga >=10).
- **Do weryfikacji w Fazie 0:** czy `-x` ma te same reguły (`recommended`).

## #8 · 2026-10-19 · Strona `/_design` musi mieć inną ścieżkę pliku · proponowana

- **Problem:** w Astro pliki w `src/pages/` z prefiksem `_` **nie są trasami**. Plik `src/pages/_design.astro` z PLAN §13 nigdy się nie wyrenderuje.
- **Decyzja:** plik `src/pages/design/index.astro` (oraz `design/kierunki.astro`), z `getStaticPaths`/guardem `import.meta.env.DEV`, który w buildzie produkcyjnym nie generuje strony. Do tego wykluczenie z sitemapy przez `filter`.
- **Alternatywy:** integracja dodająca trasę przez `injectRoute` tylko w trybie dev.
- **Ostateczny wybór:** w Fazie 1b.

## #9 · 2026-10-19 · `compressHTML` w Astro 7 · proponowana

- **Fakt:** domyślnie jest `'jsx'`, który usuwa białe znaki między elementami inline (`<a>x</a> <a>y</a>` → `xy`).
- **Decyzja:** zostawiamy domyślne i dopisujemy jawne `{' '}`. Jeśli okaże się to uciążliwe przy tekstach z i18n, przełączamy na `compressHTML: true`. Decyzja zapada w Fazie 2.

## #10 · 2026-10-19 · Mermaid przy buildzie wymaga przeglądarki · proponowana

- **Fakt:** `rehype-mermaid` renderuje SVG przez Playwright (Chromium). Build lokalny i na Vercel musiałby mieć Chromium.
- **Propozycja:** strategia `inline-svg` z Playwrightem w CI/lokalnie albo (preferowane) prerender diagramów skryptem do `src/assets/diagrams/*.svg`, commitowanych do repo. Wtedy build na Vercel nie potrzebuje przeglądarki.
- **Decyzja:** Faza 3.

## #11 · 2026-10-19 · Gałąź główna: `main` · proponowana

- **Fakt:** lokalne repo jest na gałęzi `master` bez commitów, a CLAUDE.md i CI zakładają `main`.
- **Decyzja:** pierwszy commit na `main` (zmiana nazwy `master` → `main`), z niego gałąź `feat/faza-0-fundament`.
