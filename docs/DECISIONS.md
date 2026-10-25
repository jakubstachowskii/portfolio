# DECISIONS.md — dziennik decyzji (ADR-lite)

Format wpisu: **data · decyzja · powód · alternatywy · koszt** (dla zależności: rozmiar w KB po stronie klienta albo „0 KB — tylko build/dev”).

Statusy: `przyjęta` · `proponowana` (czeka na akceptację Piotra) · `zastąpiona przez #N`.

---

## #1 · 2026-10-19 · Wersje bazowe stacku · przyjęta

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

## #2 · 2026-10-19 · TypeScript 6.x zamiast 7.0 · przyjęta

- **Decyzja:** pin `typescript@~6.0`.
- **Powód:** `@astrojs/check@0.9.10` ma peer `typescript ^5 || ^6`, a `typescript-eslint@8.71` ma peer `>=4.8.4 <6.1.0`. TS 7 (natywny kompilator) wywaliłby `pnpm check` i `pnpm lint`.
- **Alternatywy:** TS 7 + `--legacy-peer-deps` (ryzyko cichych błędów), czekanie na wsparcie (blokuje Fazę 0).
- **Do zrobienia:** Renovate podbije wersję, gdy oba pakiety zaczną wspierać TS 7.

## #3 · 2026-10-19 · Node 24 LTS · przyjęta

- **Decyzja:** `.nvmrc` = `24`, `engines.node` = `>=24.11 <25`.
- **Powód:** Astro 7 wymaga Node `>=22.22.0`. Node 24 to aktywny LTS (lokalnie jest 24.22.0). Node 26 wejdzie w LTS dopiero pod koniec października 2026, więc podbijemy go przez Renovate.
- **Alternatywy:** Node 22, czyli maintenance LTS (krócej wspierany).

## #4 · 2026-10-19 · Zod 4 przez `astro/zod` · przyjęta

- **Decyzja:** w `content.config.ts` i Actions używamy `import { z } from 'astro/zod'`, nie `astro:content`.
- **Powód:** od Astro 6 eksport `z` z `astro:content` jest przestarzały, a Zod 4 zmienia API.
- **Wpływ na PLAN §7:** `z.string().url()` → `z.url()`, `z.string().email()` → `z.email()`, `{ message }` → `{ error }`.

## #5 · 2026-10-19 · Procesor Markdown: unified, nie Sätteri · przyjęta

- **Decyzja:** dodajemy `@astrojs/markdown-remark` i ustawiamy `markdown.processor: unified()`.
- **Powód:** Astro 7 domyślnie używa Sätteri, który nie obsługuje pluginów remark/rehype. PLAN wymaga Mermaid przy buildzie (`rehype-mermaid`), a Expressive Code i ewentualne pluginy (np. autolink nagłówków dla TOC) to ekosystem unified.
- **Alternatywy:** Sätteri + własne pluginy `hastPlugins` (więcej pracy, brak gotowych).
- **Koszt:** 0 KB po stronie klienta, wyłącznie build.
- **Zweryfikowane (Faza 0):** `astro-expressive-code@0.44` renderuje bloki kodu w `.mdx` z `unified()` (testowa strona, potem usunięta). `@astrojs/markdown-satteri` zostaje w zależnościach, bo jest peerem `@astrojs/mdx@8` (dodał go `astro add`).

## #6 · 2026-10-19 · Fonty przez Astro Fonts API (Fontsource) · przyjęta

- **Decyzja:** od Astro 6 Fonts API jest stabilne. Używamy pola `fonts` w configu z `fontProviders.fontsource()` i `subsets: ['latin', 'latin-ext']` oraz `<Font cssVariable preload />`.
- **Powód:** PLAN §3 każe użyć Fonts API, jeśli jest stabilne. Jest. Geist i JetBrains Mono są w Fontsource jako variable, z latin-ext, na licencji OFL-1.1.
- **Uwaga:** ostateczne fonty wybiera `docs/DESIGN.md` (Faza 1a), więc w Fazie 0 fontów nie konfigurujemy.

## #7 · 2026-10-19 · ESLint 10 a jsx-a11y · przyjęta

- **Decyzja:** zamiast `eslint-plugin-jsx-a11y` używamy `eslint-plugin-jsx-a11y-x`.
- **Powód:** `eslint-plugin-jsx-a11y@6.10.2` ma peer `eslint <=9`. `eslint-plugin-astro@3.2` wspiera ESLint >=10 i oficjalnie przyjmuje `eslint-plugin-jsx-a11y-x` jako alternatywę.
- **Alternatywy:** zostać na ESLint 9 (starsza major, `eslint-plugin-astro@3` wymaga >=10).
- **Zweryfikowane (Faza 0):** preset `eslintPluginAstro.configs["jsx-a11y-strict"]` działa z `-x` (np. reguła `astro/jsx-a11y/alt-text` wyłapuje `<img>` bez `alt`).

## #8 · 2026-10-19 · Strona `/_design` musi mieć inną ścieżkę pliku · przyjęta

- **Problem:** w Astro pliki w `src/pages/` z prefiksem `_` **nie są trasami**. Plik `src/pages/_design.astro` z PLAN §13 nigdy się nie wyrenderuje.
- **Decyzja:** plik `src/pages/design/index.astro` (oraz `design/kierunki.astro`), z `getStaticPaths`/guardem `import.meta.env.DEV`, który w buildzie produkcyjnym nie generuje strony. Do tego wykluczenie z sitemapy przez `filter`.
- **Alternatywy:** integracja dodająca trasę przez `injectRoute` tylko w trybie dev.
- **Rozwiązanie (Faza 1b):** integracja `src/integrations/design-page.ts` wstrzykuje `/design` (`src/dev/design.astro`) przez `injectRoute` tylko gdy `command === 'dev'` albo `DESIGN_PAGE=1` (build e2e w `playwright.config.ts`). Produkcyjny build jej nie zawiera; sitemap ma `filter`, strona ma `noindex`.

## #9 · 2026-10-19 · `compressHTML` w Astro 7 · proponowana

- **Fakt:** domyślnie jest `'jsx'`, który usuwa białe znaki między elementami inline (`<a>x</a> <a>y</a>` → `xy`).
- **Decyzja:** zostawiamy domyślne i dopisujemy jawne `{' '}`. Jeśli okaże się to uciążliwe przy tekstach z i18n, przełączamy na `compressHTML: true`. Decyzja zapada w Fazie 2.

## #10 · 2026-10-19 · Mermaid przy buildzie wymaga przeglądarki · proponowana

- **Fakt:** `rehype-mermaid` renderuje SVG przez Playwright (Chromium). Build lokalny i na Vercel musiałby mieć Chromium.
- **Propozycja:** strategia `inline-svg` z Playwrightem w CI/lokalnie albo (preferowane) prerender diagramów skryptem do `src/assets/diagrams/*.svg`, commitowanych do repo. Wtedy build na Vercel nie potrzebuje przeglądarki.
- **Decyzja:** Faza 3.

## #11 · 2026-10-19 · Gałąź główna: `main` · przyjęta

- **Fakt:** lokalne repo jest na gałęzi `master` bez commitów, a CLAUDE.md i CI zakładają `main`.
- **Decyzja:** pierwszy commit na `main` (zmiana nazwy `master` → `main`), z niego gałąź `feat/faza-0-fundament`.

## #12 · 2026-10-19 · Sekrety w `astro:env` opcjonalne do Fazy 5 · przyjęta

- **Decyzja:** wszystkie zmienne ze schematu (§17) mają `optional: true`.
- **Powód:** formularz kontaktowy powstaje w Fazie 5. Wymagane sekrety wywaliłyby build lokalnie, w CI i na Vercel, zanim istnieją konta Resend i Turnstile.
- **Do zrobienia w Fazie 5:** `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `PUBLIC_TURNSTILE_SITE_KEY` i `CONTACT_TO_EMAIL` stają się wymagane. `GITHUB_TOKEN` zostaje opcjonalny (fallback).

## #13 · 2026-10-19 · Zależności Fazy 0 · przyjęta

Wszystkie z PLAN §3, bez dodatków spoza planu poza wymienionymi niżej.

| Pakiet                                                                                                                | Po co                                                                                              | Koszt klienta                              |
| --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| astro, @astrojs/mdx, @astrojs/sitemap, @astrojs/vercel                                                                | framework, MDX, sitemap, adapter                                                                   | ~1.1 KB gzip (skrypt `prefetch`, PLAN §11) |
| @astrojs/react, react, react-dom (+ @types)                                                                           | wyspy (od Fazy 2/5/8)                                                                              | 0 KB dopóki nie ma wysp                    |
| @astrojs/markdown-remark                                                                                              | procesor unified (#5)                                                                              | 0 KB                                       |
| @astrojs/markdown-satteri                                                                                             | peer @astrojs/mdx                                                                                  | 0 KB                                       |
| astro-expressive-code                                                                                                 | bloki kodu w case studies                                                                          | CSS/JS tylko na stronach z kodem           |
| astro-icon, @iconify-json/lucide                                                                                      | ikony inline SVG                                                                                   | 0 KB JS                                    |
| tailwindcss, @tailwindcss/vite                                                                                        | style                                                                                              | CSS wg użycia                              |
| typescript ~6.0, @astrojs/check                                                                                       | typy (#2)                                                                                          | 0 KB (dev)                                 |
| eslint, @eslint/js, typescript-eslint, eslint-plugin-astro, eslint-plugin-jsx-a11y-x, eslint-config-prettier, globals | lint (#7). `globals` i `eslint-config-prettier` to standard flat configu (poza planem, ~0 KB, dev) | 0 KB (dev)                                 |
| prettier, prettier-plugin-astro, prettier-plugin-tailwindcss                                                          | format                                                                                             | 0 KB (dev)                                 |
| vitest, @playwright/test, @axe-core/playwright, @lhci/cli                                                             | testy                                                                                              | 0 KB (dev)                                 |
| lefthook, lint-staged, @commitlint/cli, @commitlint/config-conventional                                               | hooki                                                                                              | 0 KB (dev)                                 |

## #14 · 2026-10-19 · pnpm 12: jawna zgoda na skrypty instalacyjne · przyjęta

- **Fakt:** pnpm 12 domyślnie blokuje `postinstall` zależności (`ERR_PNPM_IGNORED_BUILDS`).
- **Decyzja:** `pnpm-workspace.yaml` → `allowBuilds: { lefthook: true }` (instaluje binarkę i hooki). Każdy kolejny wpis wymaga uzasadnienia tutaj.

## #15 · 2026-10-19 · Lighthouse CI lokalnie na Windowsie · przyjęta

- **Fakt:** `chrome-launcher` nie może uruchomić pełnego `chrome.exe` w tym środowisku (`spawn UNKNOWN`).
- **Decyzja:** lokalnie `CHROME_PATH` → `chrome-headless-shell.exe` z Playwrighta (instrukcja w README). W CI (ubuntu) działa systemowy Chrome z runnera, bez zmian.
- **Uwaga:** `lighthouserc.json` nie używa presetu `perf`, bo ten ogranicza audyt do kategorii Performance.

## #16 · 2026-10-19 · Research Refero: metoda i zrzuty poza repo · przyjęta

- **Metoda:** pełna lista 95 kolekcji (z kodu strony, bo UI rotuje 8) + 10 fraz z §6.0, przepuszczone przez wyszukiwarkę Refero (`/api/styles/search`), co dało 1326 unikalnych stylów. Na tej podstawie shortlista 12 stylów, przeczytane ich DESIGN.md i macierz w `docs/style-research/SCORING.md`.
- **Zrzuty stron źródłowych** (`docs/style-research/screens/`) są w `.gitignore`, bo to cudze materiały, a repo jest publiczne. Notatki linkują do stron stylów na Refero.
- **Szkice** (`docs/style-research/sketches/`) to nasz statyczny HTML poza `src/`, bez kodu produkcyjnego (§14, Faza 1a).

## #17 · 2026-10-19 · Wybór kierunku wizualnego · przyjęta

- **Kandydaci:** A „Notatnik warsztatowy” (Convex), B „Instrukcja techniczna / cyjanotypia” (Zed), C „Stół świetlny / bursztyn” (Dovetail), **D „Premiera”**: synteza Apple (sceny, rytm, specyfikacja) + Convex/Factory (okna aplikacji, Geist) + bursztyn i siatka z C. Szczegóły: `docs/style-research/KIERUNKI.md`.
- **Zmiana kryteriów:** na prośbę Piotra (2026-10-19) do macierzy dodane K10 „siła sprzedaży / efekt premiery” z wagą 3 (maks. 115).
- **Druga runda researchu:** pełny katalog 1342 stylów (API listy), filtr metadanych, arkusz kontaktowy 24 kandydatów i 4 nowe style w macierzy (Apple ×2, Framer, Factory).
- **Rekomendacja:** D.
- **Uwagi Piotra do D (2026-10-19):** domyślnie ciemny, bursztyn i hero bez zmian, typografia bardziej premium, kształty bliżej Apple, efektowne animacje bez przesady. Wprowadzone w szkicu v2: Funnel Display + Funnel Sans + Geist Mono, promienie 10/18/26, trzy momenty ruchu (KIERUNKI.md).
- **D v3 (2026-10-19):** na prośbę Piotra ocena Raycasta. Jako cała strona odrzucony (80/115), 3 zasady wchłonięte do D: powierzchnie „klawisza”, paleta ⌘K w hero, szklana nawigacja. Rekomendacja: v3.
- **D v3.1 (2026-10-19):** ocena Resenda (83/115): jako baza nie (WebGL w hero, tylko dark, fonty komercyjne, kod 2.35:1), wzięte zasady: szeryf na czerni (Newsreader zamiast Funnel Display w nagłówkach) i kolor jako składnia. Pasmo „Specyfikacja” zastąpione paskiem faktów w każdej scenie.
- **Decyzja (Piotr, 2026-10-19):** **D v3.1 „Premiera”**, z nagłówkami **Funnel Display** (Piotr wybrał pierwszy krój z porównania; Newsreader odpada). Design system: `docs/DESIGN.md`. Test „podróbki” zaliczony: `docs/style-research/PODROBKA.md`.

## #18 · 2026-10-19 · DESIGN.md nadpisuje hipotezy PLAN §2 i §6.1–6.5 · przyjęta

Zgodnie z PLAN §6.0 konkretne wartości wynikają teraz z `docs/DESIGN.md`. Najważniejsze różnice wobec hipotezy:

| PLAN                                             | DESIGN.md                                                                                         | Powód                                                     |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| §2 „Engineering Notebook”, akcent zieleń-limonka | „Premiera”, akcent **bursztyn** `oklch(0.807 0.148 77)`                                           | Research Refero + wybór Piotra                            |
| §6.2 Geist + JetBrains Mono                      | **Funnel Display + Funnel Sans + Geist Mono**                                                     | Bardziej „premium” (uwaga Piotra), porównanie 9 krojów    |
| §6.3 promienie 6 / 10 / 16                       | **10 / 18 / 26** + pigułki                                                                        | Bliżej Apple (uwaga Piotra), z hierarchią                 |
| §6.3 sekcje `py-24 md:py-32`                     | Skala 8pt; scena 96/128, pasmo 96/96                                                              | Stały rytm (wymaganie Piotra „równe paddingi”)            |
| §6.4 wejścia sekcji fade + translateY wszędzie   | 3 momenty ruchu (hero, premiera sceny, snop za kursorem), bez fade na każdej sekcji               | „Efektownie, ale bez przesady”                            |
| §6.5 `Section` z mono-labelem `01 — Projekty`    | Numeracja **tylko dla sekwencji** (np. oś czasu)                                                  | Numerowanie niesekwencyjnych sekcji to szablonowy wzorzec |
| §6.1 `--color-fg-subtle`                         | `--color-dim` poprawiony do ≥ 4.5:1 (`#767f85` / `#666f76`) + nowy `--color-line-control` (≥ 3:1) | Audyt kontrastu przed zapisaniem tokenów                  |

Pozostałe wymagania strukturalne PLAN §6 (role tokenów, 5 stanów, focus ring 2px + offset, reduced-motion, strona `/design`) bez zmian.

## #19 · 2026-10-19 · Visual snapshoty Playwrighta tylko z Linuksa · przyjęta

- **Problem:** baseline z Windowsa (lokalnie) różni się renderowaniem fontów od Linuksa (CI), więc snapshot zawsze by się różnił.
- **Decyzja:** test `visual snapshot` jest pomijany poza Linuksem. W CI `--update-snapshots=missing` (brak baseline = zapis, nie błąd). Workflow `update-snapshots.yml` (`workflow_dispatch`) generuje baseline na Linuksie i commituje je na gałąź. Od tego momentu CI wykrywa regresje wizualne.
- **Alternatywy:** Docker z obrazem Playwrighta lokalnie (brak Dockera/WSL na maszynie), usługa zewnętrzna (Percy/Chromatic: koszt, zależność).

## #20 · 2026-10-19 · `--spacing: 8px` w Tailwind v4 · przyjęta

- **Decyzja:** bazowa jednostka spacingu = 8px, więc numery utility pokrywają się ze skalą DESIGN.md §5.1 (`p-1`=8, `p-3`=24, `p-16`=128; `p-0.5`=4).
- **Powód:** zero przeliczeń i zero „prawie dobrych” wartości. Każdy odstęp w klasach jest z definicji ze skali 8pt.
- **Koszt:** utility rozmiarów (`w-*`, `h-*`, `size-*`) też liczą się w 8px; ułamki (`size-1.25` = 10px) używane tylko dla drobnych elementów graficznych.

## #21 · 2026-10-19 · Preload fontów: tylko podzbiór latin · przyjęta

- **Fakt:** preload obu podzbiorów (latin + latin-ext) dla Display i Sans dawał 4 pliki, a PLAN §11 dopuszcza ≤ 2.
- **Decyzja:** preload tylko `latin` (Funnel Display + Funnel Sans = 2 pliki, 17 + 17 KB). `latin-ext` (polskie znaki, 9 KB) ładuje się przez `unicode-range`; Geist Mono bez preload. Fallbacki z `size-adjust` generuje Fonts API (mniejszy CLS).

## #22 · 2026-10-19 · Ikona przełącznika motywu przez zmienne CSS · przyjęta

- **Problem:** `astro-icon` renderuje SVG bez atrybutu scope Astro, a reguła „ukryj wg motywu przodka” myli się w zagnieżdżonych panelach (`<html>` też ma `data-theme`).
- **Decyzja:** `--toggle-sun` / `--toggle-moon` w blokach motywu (`tokens.css`): wartość dziedziczy się od najbliższego `[data-theme]`.

## #23 · 2026-10-23 · Akcent tekstowy w jasnym motywie `#06725d` · przyjęta

- **Fakt:** wzorzec ma `--acc-text: #0a7a65` w jasnym motywie, co daje 4.23:1 na `--bg2` (`#e9e6de`), poniżej WCAG AA 4.5:1.
- **Decyzja:** `#06725d`, najbliższy odcień tej samej mięty z ≥ 4.71:1 na każdym jasnym tle. To jedyne odstępstwo kolorystyczne od wzorca.

## #24 · 2026-10-23 · Geometria 1:1 ze wzorca zamiast skali 8pt · przyjęta

- **Problem:** reguła „zero magicznych wartości” i skala 8pt (#20) kłócą się z wymaganiem „wygląd 1:1 ze wzorca”, który używa wartości jak 26px, 18px, 15px.
- **Decyzja:** kolory i czasy animacji nadal tylko z tokenów (test `no-magic-values` to sprawdza). Odstępy, rozmiary i fonty w px przenosimy wprost ze wzorca do stylów komponentów. Wzorzec jest tu „skalą”. Skala Tailwinda: `--spacing: 4px`. Zastępuje #20.

## #25 · 2026-10-23 · Nowy kierunek: `docs/design-reference.html` 1:1 · przyjęta

- **Decyzja Jakuba:** strona powstaje 1:1 według `docs/design-reference.html` (`heroArt = warstwy`, akcent `mint`), etapami z `docs/PROMPT-dla-Claude-Code.md`. Kierunek D v3.1 („Premiera”), komponenty `src/components/ui/*`, katalog `/design` i raport tokenów są usunięte. Niezmergowana praca Fazy 2 w starym stylu porzucona.
- **Etapy:** 1 szkielet · 2 statyczna strona główna · 3 projekty z GitHub API · 4 interakcje · 5 podstrony i 404 · 6 kontrybucje GitHub · 7 SEO/a11y/wydajność · 8 deploy i README. Jeden etap = jedna gałąź `feat/etap-N-nazwa` = jeden PR.
- **Stack bez zmian:** reguły repo (Astro, TS strict, Tailwind v4, pnpm, testy) mają pierwszeństwo przed §1 promptu. Runtime podglądu ze wzorca (`x-dc`, `DCLogic`) nie jest przenoszony; logika powstaje jako małe skrypty w `src/scripts/`.
- Zastępuje #18 i #22.

## #26 · 2026-10-23 · Pliki wzorca poza Prettierem · przyjęta

- `docs/design-reference.html` i `docs/PROMPT-dla-Claude-Code.md` są w `.prettierignore`: to dokumenty źródłowe, nie formatujemy ich.

## #27 · 2026-10-23 · Opóźnienia animacji jako literały · przyjęta

- **Decyzja:** czasy trwania animacji i przejść tylko z tokenów (`--t-*`). Opóźnienia (`animation-delay`, `transition-delay`) zostają literałami ze wzorca: to kolejność wejść (choreografia), nie skala czasu. Test `no-magic-values` dopuszcza linie `*-delay:`.

## #28 · 2026-10-23 · Etap 2: projekty statycznie w `src/data/projects.ts` · przyjęta

- **Decyzja:** do czasu Etapu 3 lista projektów (4 repozytoria z `jakubstachowskii`, opisy z wzorca) siedzi w `src/data/projects.ts`. Etap 3 zastępuje ją danymi z GitHub API i nadpisaniami w `src/content/projects/`.
- Wszystkie podglądy są renderowane, widoczny tylko wybrany (`hidden`), więc Etap 4 tylko przełącza atrybut.
- Axe w e2e działa z `reducedMotion: 'reduce'`: inaczej mierzy kontrast klatki wejścia (`opacity: 0`).

## #29 · 2026-10-23 · Własne podzbiory fontów (LCP) · przyjęta

- **Problem:** Lighthouse w CI padał na `main` po Etapie 1: LCP 2.1–3.0 s (budżet 1.8 s), wydajność 0.93 (próg 0.95). Pliki z Fontsource były duże (Inter latin-ext 133 KB, Archivo latin 90 KB). Na stronie PL wszystkie ładowały się przed pierwszym malowaniem, a `h1` czekał na Archivo.
- **Decyzja:** `scripts/subset-fonts.mjs` (`pnpm fonts:subset`) tnie zmienne fonty Fontsource do znaków i zakresów osi, których strona używa: łacina + typografia + strzałki oraz osobny plik z polskimi literami (unicode-range). Archivo: waga 800, szerokość 100–125%. Inter: 400–600. JetBrains Mono: 400–700. Wynik jest commitowany w `src/assets/fonts/`, Astro serwuje go przez `fontProviders.local()`. Zakresy znaków są w jednym miejscu: `src/lib/font-ranges.mjs`.
- **Efekt:** fonty ~440 KB → ~85 KB. Lighthouse: wydajność 1.0, LCP 1.5 s, FCP 1.2 s, CLS 0 (`/` i `/en/`).
- **Zależności (dev, 0 KB w przeglądarce):** `subset-font` (harfbuzz wasm), `@fontsource-variable/archivo`, `@fontsource-variable/inter`, `@fontsource-variable/jetbrains-mono` (źródła fontów).
- **Alternatywy:** `font-display: optional` (font mógłby się w ogóle nie pokazać na pierwszej wizycie), rezygnacja z preloadu (dłuższy LCP), Google Fonts z parametrem `text=` (zewnętrzny host, gorsza prywatność).
- **Koszt utrzymania:** znak spoza zakresów renderuje się fontem zapasowym. Dodanie znaku wymaga zmiany `font-ranges.mjs` i `pnpm fonts:subset`. Zastępuje #21.

## #30 · 2026-10-25 · Projekty z GitHub API przy buildzie · przyjęta

- **Decyzja:** lista projektów to publiczne repozytoria `jakubstachowskii` pobierane przy buildzie (`src/lib/github.ts`, `src/lib/load-projects.ts`), reguły 1–7 z `docs/PROMPT-dla-Claude-Code.md` §2. Pomijane: forki, archiwa, `hiddenRepos` z `site.ts`, topik `portfolio-hide`. Nadpisania: kolekcja `projects` (`src/content/projects/<repo>.md`, schema w `src/content.config.ts`). Logika łączenia jest czysta (`src/lib/projects.ts`) i ma testy.
- **Kopia:** `src/data/github-cache.json` jest commitowana i nadpisywana przy udanym buildzie tylko przy zmianie danych (bez znacznika czasu). Gdy API nie odpowiada, build bierze kopię. Sprawdzone złym tokenem: build przechodzi z ostrzeżeniem.
- **Rozszerzenie promptu:** pole `summaryEn` w nadpisaniu (strona jest dwujęzyczna, CLAUDE.md wymaga PL + EN). Bez niego wersja EN bierze `summary`.
- **README** pobierany tylko dla repo bez `description` i bez `summary` w nadpisaniu (oszczędza limit 60 zapytań/h bez tokenu).
- **Podgląd:** screenshot z `src/assets/projects/<repo>.(png|jpg|webp)` albo `cover` w nadpisaniu zastępuje szkic (ta sama ramka, `<Image>`, WebP). `pnpm screenshots` robi zrzuty repo z `homepage`.
- Statyczna lista z Etapu 2 (`src/data/projects.ts`, #28) usunięta.

## #31 · 2026-10-25 · Pieczątka w jasnym motywie bez przezroczystości · przyjęta

- **Problem:** Lighthouse w CI (headless Chrome na Linuksie = motyw jasny) dawał dostępność 0.97: pieczątka „Wysłano” w szkicu Awizacji ma w animacji `opacity: 0.9`, co przy `--hue4` w jasnym motywie daje 4.04:1. Lokalnie Lighthouse szedł w ciemnym motywie, a e2e axe z wyłączonym ruchem (pieczątka bez animacji = pełne krycie), więc nikt tego nie złapał.
- **Decyzja:** token `--stamp-opacity`: 0.9 w ciemnym (jak we wzorcu), 1 w jasnym (4.86:1). Para `hue4 / surface` w teście kontrastu. `lighthouserc.json` wymusza motyw jasny (`preferredColorScheme=1`), więc lokalny wynik = wynik w CI; ciemny motyw pilnuje e2e axe.

## #32 · 2026-10-25 · Interakcje jako małe skrypty, telefon przewija do podglądu · przyjęta

- **Decyzja:** interakcje to moduły w `src/scripts/` (talia `deck.ts` + `deck-render.ts`, `projects.ts`, `copy-email.ts`, `active-section.ts`, `offscreen.ts`), bez wyspy React. Logika talii 1:1 ze wzorca, stan i transformacje kart z `src/lib/deck.ts` (te same co w renderze bez JS). Cały JS strony głównej: ~3 KB gzip.
- **Telefon (≤ 900 px):** po stuknięciu w projekt płynne przewinięcie do podglądu (z `scroll-margin` pod nav w dwóch rzędach). Alternatywa „rozwiń szczegóły pod wierszem” odrzucona: dwa miejsca z tą samą treścią i dwa układy do utrzymania.
- **Pauza poza ekranem:** jedna reguła w `global.css` dla wszystkich animacji w sekcji z klasą `.off`, z wyjątkiem `.reveal` i `.wipe` (sterowane scrollem; pauza by je zamroziła).
- **Bez JS:** talia w spoczynku, pierwszy projekt wybrany, e-mail jako link `mailto:`. Wiersze jako linki do podstron dochodzą w Etapie 5 (razem z podstronami).

## #33 · 2026-10-25 · `pnpm ci:local` przed każdym pushem · przyjęta

- **Problem:** dwa razy z rzędu CI padło na czymś, co lokalnie przechodziło: Lighthouse w motywie jasnym (#31) i lint bez wygenerowanych typów Astro (czysty checkout nie ma `.astro/`). Lokalnie sprawdzałem w innych warunkach niż CI.
- **Decyzja:** `scripts/ci-local.mjs` powtarza kroki `.github/workflows/ci.yml` w tej samej kolejności, z `CI=true`, na czystej kopii ostatniego commitu (`git worktree`): install `--frozen-lockfile` → lint → check → test → build → e2e → lhci. Zatrzymuje się na pierwszym błędzie. Push dopiero po zielonym `ci:local`. `pnpm lint` zaczyna od `astro sync`.
- **Sprawdzone:** na commicie sprzed poprawki lintu skrypt pada tak samo jak GitHub (18 błędów).
- **Czego nie odtwarza:** systemu (Linux vs Windows: renderowanie fontów, snapshoty wizualne tylko w CI, #19) i tokenu `GITHUB_TOKEN` z Actions (lokalnie API bez tokenu).

## #34 · 2026-10-25 · Podstrony projektów, wiersze jako linki, 404 · przyjęta

- **Adresy:** `/projekty/<slug>/` i `/en/projects/<slug>/`; slug z nazwy repo (`AwizacjaApp` → `awizacja-app`, `toSlug` w `src/lib/projects.ts`, polskie litery → ASCII). `projectPath()` w `src/lib/paths.ts`.
- **Treść:** nagłówek (powrót, numer i platformy, tytuł, opis, tagi, przyciski), scena podglądu (ta sama co w indeksie: `ProjectStage`), treść markdown z nadpisania, galeria (`gallery`), poprzedni/następny projekt (w kółko). Markdown jest po polsku, więc wersja EN pokazuje sam opis z `summaryEn` (treść EN można dodać później, np. osobnym plikiem). Bez treści i galerii sekcja się nie renderuje.
- **Indeks:** wiersz to `<a>` do podstrony (działa bez JS, wymóg promptu). Wybrany wiersz ma `aria-current="true"` zamiast `aria-pressed` (to atrybut przycisków, nie linków). Z JS: najechanie/fokus wybiera, klik w wybrany wiersz na desktopie otwiera podstronę, na telefonie stuknięcie wybiera i przewija do podglądu z „Szczegóły →”; Ctrl/środkowy przycisk otwiera nową kartę.
- **404:** jedna strona `404.html` w języku domyślnym (`noindex`); hosting serwuje ją dla każdego nieznanego adresu.
- Lighthouse CI sprawdza też podstronę `/projekty/awizacja-app/`.

## #35 · 2026-10-25 · Kontrybucje z GraphQL, codzienny rebuild · przyjęta

- **Dane:** `src/lib/contributions.ts` pobiera przy buildzie (GraphQL `contributionsCollection`) kalendarz, liczbę publicznych repo i datę ostatniego commita (ostatnio pushowane publiczne repo). Siatka = ostatnie 44 tygodnie (rozmiar ze wzorca), kolor z `contributionLevel` (tokeny `--cell-1…4`), fala tylko jako jednorazowe wejście (klasa `.seen`). Siatka ma `role="img"` z opisem dla czytnika.
- **Bez tokenu** (`GITHUB_TOKEN`, GraphQL go wymaga) sekcja się nie renderuje, bez szkieletu. Z tokenem, gdy API nie odpowiada: kopia `src/data/github-contrib.json`; bez kopii sekcja też znika. Build nigdy nie pada przez API.
- **CI:** token Actions jest w `env` całego joba, więc e2e i Lighthouse budują stronę tak jak produkcja. Testy e2e sprawdzają oba warianty (sekcja z danymi albo brak sekcji). `ci:local` bez tokenu sprawdza wariant „brak”; wariant z danymi sprawdzony lokalnie na tymczasowej próbce (nie commitowana).
- **Produkcja:** zmienna `GITHUB_TOKEN` w Vercelu (token tylko do odczytu publicznych danych) i codzienny rebuild: `.github/workflows/rebuild.yml` (04:00 UTC + ręcznie) wywołuje Deploy Hook z sekretu `VERCEL_DEPLOY_HOOK`. Bez sekretu job tylko informuje.
- Wspólny zapis kopii w `src/lib/json-cache.ts`; formatowanie (liczba mnoga, daty) w `src/lib/format.ts`.

## #36 · 2026-10-25 · Bezpieczeństwo: CSP, nagłówki, zależności · przyjęta

- **CSP:** `security.csp` w Astro dodaje na każdej stronie `<meta>` z hashami wszystkich skryptów (liczone przy buildzie) i dyrektywami `default-src 'self'`, `object-src 'none'`, `base-uri`, `form-action`. Style mają `'unsafe-inline'`, bo szkice i talia kart używają atrybutów `style` (przy `'unsafe-inline'` Astro nie emituje hashy stylów). Wbudowany Shiki wyłączony (`syntaxHighlight: false`), bloki kodu koloruje expressive-code.
- **Nagłówki** (`src/integrations/security-headers.ts`): adapter statyczny Vercela nie ma opcji na nagłówki, więc po buildzie dopisujemy trasę na początek `.vercel/output/config.json` (Build Output API v3): HSTS, `nosniff`, `X-Frame-Options: DENY`, `frame-ancestors 'none'`, Referrer-Policy, Permissions-Policy, COOP. Wynik sprawdzalny lokalnie po `pnpm build`.
- **Zależności:** usunięte nieużywane (`react`, `react-dom`, `@astrojs/react`, `@types/react*`, `astro-icon`, `@iconify-json/lucide`). Podatności w zależnościach produkcyjnych (narzędzia buildu): nadpisania w `pnpm-workspace.yaml` tylko na podatne zakresy (`path-to-regexp` 6.x, `zod` 4.x, `postcss-selector-parser` → 7.1.6; sprawdzone, że kolorowanie kodu działa). `pnpm audit --prod`: 0. Zostały podatności tylko w narzędziach deweloperskich (Lighthouse CI itd.), które nie trafiają na stronę.
- **Testy:** brak błędów konsoli i naruszeń CSP na głównej, podstronie i 404; wewnętrzne linki bez 4xx.

## #37 · 2026-10-25 · SEO, favicon, obrazek OG, licencje fontów · przyjęta

- `site` = adres produkcji na Vercelu do czasu własnej domeny (jedno miejsce w `astro.config.mjs`). Uwaga: produkcja ma teraz włączone Vercel Authentication (302 na logowanie) — do wyłączenia w Etapie 8.
- `src/components/layout/Seo.astro`: canonical (bez 404), `hreflang` pl/en/x-default, Open Graph + Twitter (`/og.png`), JSON-LD `Person` (główna) i `SoftwareApplication` (podstrony); placeholdery z `site.ts` nie trafiają do danych strukturalnych. Tytuły: główna „Imię Nazwisko — Programista: aplikacje…”, podstrony „Projekt — Imię Nazwisko”. `robots.txt` z adresem mapy strony.
- Favicon SVG (litera J na mięcie, kolory strony) i `apple-touch-icon`/`og.png` z szablonu `scripts/brand.html` (`pnpm brand`, fonty strony). Wygląd strony bez zmian.
- `public/licenses/fonts.txt`: teksty OFL 1.1 trzech krojów (wymóg licencji przy rozpowszechnianiu, także podzbiorów; brak Reserved Font Names).
- Test szerokości rozszerzony o 375, 1024 i 1440 px (lista z promptu).

## #38 · 2026-10-25 · Usunięte zmienne formularza kontaktowego · przyjęta

- Kontakt na stronie to link `mailto:` i kopiowanie adresu (wzorzec), bez formularza. Zmienne ze starego planu (`RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `PUBLIC_TURNSTILE_SITE_KEY`, `CONTACT_TO_EMAIL`, #12) nie były nigdzie używane, więc znikają ze schematu `astro:env` i z `.env.example` (zgoda Jakuba). Jedyna zmienna: `GITHUB_TOKEN`. Zastępuje #12.
