# PLAN.md — Specyfikacja portfolio {{IMIĘ NAZWISKO}}

Wersja 1.1 · 2026-10 · Właściciel: Piotr · Wykonawca: Claude Code

> **Zmiana w 1.1:** styl wizualny wybierany jest na podstawie researchu na **Refero Styles** (https://styles.refero.design/) — patrz §6.0 i Faza 1a. Kierunek z §2 i tokeny z §6.1–6.4 są tylko **punktem startowym / hipotezą**; po researchu nadpisuje je `docs/DESIGN.md`.

---

## 1. Cel i kryteria sukcesu

**Po co ta strona:** pokazać rekruterom, klientom i innym devom, że Piotr buduje dopracowane, działające produkty (desktop, web, mobile, automatyzacje) — a sama strona jest pierwszym dowodem jakości.

**Odbiorcy (w kolejności ważności):**
1. Rekruter / HR — ma 30–60 s. Musi szybko zobaczyć: kim jest, co umie, 3 najlepsze projekty, CV, kontakt.
2. Tech lead / dev oceniający kandydata — wejdzie w case study, kod na GitHubie, jakość strony (DevTools, Lighthouse, źródło).
3. Potencjalny klient (freelance / małe firmy) — chce zobaczyć rozwiązane problemy biznesowe, nie listę technologii.

**Mierzalne kryteria sukcesu:**
- Lighthouse (mobile): Performance ≥ 95, Accessibility 100, Best Practices 100, SEO 100 na każdej stronie.
- LCP < 1.8 s (4G), CLS < 0.05, INP < 150 ms.
- JS na stronie głównej ≤ 60 KB gzip (cały).
- Rekruter dochodzi do CV (PDF) w ≤ 2 kliknięciach z dowolnej strony; do kontaktu w ≤ 1.
- 0 błędów axe-core w testach e2e.

**Czego NIE robimy:** szablonu „z internetu”, ciężkiego WebGL na starcie, karuzel, paska umiejętności w procentach („React 85%”), autoplay audio, cookie bannera (analityka bez cookies).

---

## 2. Koncepcja i kierunek wizualny

**Motyw przewodni: „Precision / Engineering Notebook”.**
Strona wygląda jak dopracowane narzędzie developerskie skrzyżowane z magazynem typograficznym: ciemne tło, ostra typografia, siatka, monospace jako akcent, jeden mocny kolor akcentu, mikroanimacje o charakterze „precyzyjnego mechanizmu” (krótkie, sprężyste, nigdy dekoracyjne bez celu).

**Elementy wyróżniające (sygnatura strony):**
1. **Command palette (⌘K / Ctrl+K)** — szybka nawigacja po stronach, projektach, akcjach (zmień motyw, język, pobierz CV, skopiuj e-mail). Nawiązuje do tego, że Piotr buduje „command center”. To jest wizytówka UX.
2. **Hero z „live terminal line”** — krótka linia monospace z rotującym statusem (np. `> building: kalkulator-mebli v2`), czytana z pliku treści `now`.
3. **Case studies jak dokumentacja techniczna** — spis treści przyklejony z boku (scrollspy), sekcje Problem → Rozwiązanie → Architektura → Wyzwania → Efekt, diagramy, porównania przed/po.
4. **Subtelna siatka tła (grid/dots)** z delikatnym „spotlightem” podążającym za kursorem (tylko desktop, tylko gdy brak reduced-motion, czysty CSS + kilka linii JS).
5. **View Transitions** między listą projektów a case study (miniatura „przelatuje” w nagłówek).
6. **Status dostępności** w nagłówku: `● Otwarty na oferty` (sterowane z configu).

Tryb: **dark-first** (domyślny wg systemu), pełny light mode równorzędnej jakości.

**Uwaga:** powyższy motyw to hipoteza. Ostateczny kierunek wybiera research z §6.0 (Refero Styles). Elementy sygnaturowe 1–6 (⌘K, linia terminala, case studies jak dokumentacja, View Transitions, status) zostają niezależnie od wybranego stylu — styl decyduje o ich wyglądzie, nie o ich istnieniu.

---

## 3. Stack technologiczny (z uzasadnieniem)

| Obszar | Wybór | Dlaczego |
|---|---|---|
| Framework | **Astro** (najnowsza stabilna major) | Content-first, statyczny HTML, zero JS domyślnie, wyspy, MDX, View Transitions, i18n routing, Actions. Idealny pod portfolio z najlepszym Lighthouse. |
| Język | **TypeScript** (`strict`, preset `astro/tsconfigs/strictest`) | Typowane treści i propsy. |
| Style | **Tailwind CSS v4** przez `@tailwindcss/vite` | CSS-first config (`@theme`), tokeny jako zmienne CSS, szybki. |
| Treść | **MDX + Content Collections** (Content Layer, `glob` loader, schematy Zod) | Projekty i doświadczenie jako pliki, walidowane przy buildzie. |
| Interaktywność | **React** jako wyspy (tylko: command palette, formularz kontaktowy, ew. filtr projektów) | Pokazuje React w portfolio; reszta to `.astro` + mały vanilla TS. |
| Command palette | **cmdk** | Dostępny, lekki, standard. |
| Animacje | **CSS (scroll-driven animations, transitions)** + **Motion** (motion.dev) tylko w wyspach | Większość efektów bez JS. |
| Przejścia stron | **Astro View Transitions** (`<ClientRouter />`) | Natywne przejścia z fallbackiem. |
| Ikony | **astro-icon** + Iconify (`lucide`, `simple-icons` dla logotypów technologii) | Inline SVG, tree-shaking. |
| Fonty | Self-hosted: **Geist** (sans) + **JetBrains Mono** (mono), variable, `latin` + `latin-ext` | Polskie znaki, brak zapytań do Google. Astro Fonts API jeśli stabilne w danej wersji; inaczej Fontsource. |
| Obrazy | `astro:assets` (AVIF + WebP, `sizes`, lazy) | Automatyczna optymalizacja. |
| Kod w MDX | **Expressive Code** (`astro-expressive-code`) | Ramki terminala/edytora, podświetlanie linii, kopiowanie. |
| Diagramy | Mermaid renderowany **przy buildzie** do SVG (`rehype-mermaid` lub podobne) | Zero JS w runtime. |
| OG images | **satori + @resvg/resvg-js** generowane przy buildzie per strona/projekt | Ładne podglądy w LinkedIn/Discord. |
| Formularz | **Astro Actions** + **Resend** (e-mail) + **Cloudflare Turnstile** + honeypot | Bezpieczny, bez backendu do utrzymania. |
| Dane GitHub | GitHub REST/GraphQL **przy buildzie** (gwiazdki, ostatni commit, języki) z cache i fallbackiem | Żywe dane bez JS w przeglądarce. |
| Analityka | **Umami** (cloud lub self-host) lub Vercel Web Analytics | Bez cookies → bez bannera, RODO-friendly. |
| Hosting | **Vercel** (`@astrojs/vercel`), output statyczny + pojedyncze trasy on-demand (Actions) | Preview deploy per PR, prosty setup, darmowo. Alternatywa: Cloudflare (`@astrojs/cloudflare`). |
| Menedżer pakietów | **pnpm** | Szybki, deterministyczny. |
| Node | **LTS** (pin w `.nvmrc` i `package.json#engines`) | |
| Lint/format | ESLint (flat config) + `eslint-plugin-astro` + `eslint-plugin-jsx-a11y` + `typescript-eslint`; Prettier + `prettier-plugin-astro` + `prettier-plugin-tailwindcss` | |
| Testy | **Vitest** (utils, schematy), **Playwright** + `@axe-core/playwright` (e2e, a11y, visual snapshots), **Lighthouse CI** | |
| Git hooks | **lefthook** (pre-commit: lint-staged; commit-msg: commitlint) | |
| Zależności | **Renovate** (grupowanie, automerge patchy devDeps) | |
| CI | **GitHub Actions** | |

**Zasada wersji:** instaluj najnowsze stabilne wersje w momencie startu (`pnpm create astro@latest`), potem pinuj przez lockfile. Każde odstępstwo od API opisanego tutaj → `docs/DECISIONS.md`.

---

## 4. Mapa strony (IA) i trasy

Język domyślny **PL** pod `/`, angielski pod `/en/` (konfigurowalne w `src/config/site.ts`). Każda strona ma odpowiednik w obu językach + `hreflang`.

| Trasa (PL) | Trasa (EN) | Zawartość |
|---|---|---|
| `/` | `/en/` | Strona główna |
| `/projekty` | `/en/projects` | Lista projektów z filtrami |
| `/projekty/[slug]` | `/en/projects/[slug]` | Case study |
| `/o-mnie` | `/en/about` | O mnie, doświadczenie, edukacja, umiejętności |
| `/kontakt` | `/en/contact` | Formularz + bezpośrednie kanały |
| `/teraz` | `/en/now` | „Now page” — nad czym pracuję teraz (faza 2) |
| `/uses` | `/en/uses` | Sprzęt, edytor, narzędzia (faza 2) |
| `/notatki` | `/en/notes` | Blog/notatki techniczne (faza 2) |
| `/cv.pdf`, `/en/cv.pdf` | | CV do pobrania (statyczny plik w `public/`) |
| `/404` | | Własna strona 404 w stylu terminala |
| `/rss.xml`, `/sitemap-index.xml`, `/robots.txt`, `/llms.txt` | | Pliki techniczne |

Slugi projektów wspólne dla obu języków (np. `kalkulator-mebli`).

---

## 5. Specyfikacja stron (sekcja po sekcji)

### 5.1 Strona główna
1. **Header (sticky, blur na scrollu):** logo/monogram → `/`; nawigacja: Projekty, O mnie, Kontakt; przycisk `⌘K`; przełącznik języka; przełącznik motywu; na mobile — menu pełnoekranowe (dialog, focus trap, Esc zamyka).
2. **Hero:**
   - Status: `● Otwarty na oferty` (z `site.ts`, może być wyłączony).
   - H1: imię i nazwisko. Pod spodem jedna mocna linia wartości, np. „Buduję dopracowane narzędzia, które automatyzują prawdziwą pracę — od desktopu po web.” (`TODO(content)` — finalna treść od Piotra).
   - Linia terminala z rotującym statusem (dane z `src/content/now/`), z animacją pisania; reduced-motion → statyczny tekst.
   - CTA: **„Zobacz projekty”** (primary) i **„Pobierz CV”** (secondary) + ikony GitHub / LinkedIn / e-mail (kopiuj do schowka z toastem).
3. **Wyróżnione projekty (3–4):** duże karty bento-grid; każda: zrzut ekranu/wideo-loop (mute, `prefers-reduced-motion` → poster), nazwa, jednozdaniowy efekt („Skrócił awizację z 15 min do 2 min” — tylko prawdziwe dane), tagi technologii, link do case study. Hover: delikatny tilt/spotlight (desktop).
4. **„Co robię” (3 kolumny):** Aplikacje desktop (Electron/Tauri) · Web & PWA · Automatyzacje i narzędzia biznesowe. Każda z krótkim opisem i przykładowym projektem.
5. **Stack:** siatka logotypów technologii pogrupowana (Języki, Frontend, Desktop/Mobile, Backend/BaaS, Narzędzia). Bez procentów. Opcjonalnie oznaczenie „używam na co dzień / znam / uczę się”.
6. **Krótko o mnie + oś czasu (skrót):** 3–4 punkty (technikum → staż → studia → teraz) z linkiem do `/o-mnie`.
7. **Aktywność GitHub (opcjonalne):** ostatnie publiczne repo/commity z builda (bez JS).
8. **CTA końcowe:** „Masz projekt albo ofertę? Napisz.” → `/kontakt` + e-mail.
9. **Footer:** linki, social, „Zbudowane w Astro · kod na GitHubie” (link do repo — pokazuje jakość), wersja/commit hash z builda, ostatnia aktualizacja.

### 5.2 Lista projektów
- Filtry (tagi technologii + typ: desktop/web/mobile/automatyzacja) jako **linki z query param**, działające bez JS (pre-render wszystkich wariantów nie jest potrzebny: filtr po stronie klienta jako mała wyspa, ale domyślnie widać wszystkie projekty — progressive enhancement).
- Sortowanie: wyróżnione → data.
- Karta: miniatura, nazwa, rok, typ, 1-zdaniowy opis, tagi, status (`live`, `w budowie`, `archiwum`), ikonki linków (demo / repo / case study).

### 5.3 Case study (`/projekty/[slug]`)
Układ dwukolumnowy na desktopie: treść + przyklejony spis treści (scrollspy, aktywna sekcja podświetlona).
1. Nagłówek: nazwa, tagline, metadane (rola, czas trwania, rok, typ, status), stack (ikony), linki (demo, repo, pobierz).
2. Hero media: duży zrzut / wideo / mockup w ramce urządzenia.
3. **Kontekst i problem** — co bolało, kto był użytkownikiem.
4. **Rozwiązanie** — co zbudowane, kluczowe funkcje (z zrzutami).
5. **Architektura** — diagram (Mermaid → SVG), decyzje techniczne i dlaczego.
6. **Wyzwania i jak je rozwiązałem** — 2–3 konkretne problemy z fragmentami kodu (Expressive Code).
7. **Efekt** — liczby (tylko prawdziwe), feedback, co dalej.
8. **Czego się nauczyłem.**
9. Nawigacja: poprzedni/następny projekt + CTA kontakt.

Komponenty MDX dostępne w case study: `<Callout>`, `<Figure>`, `<Gallery>`, `<BeforeAfter>`, `<DeviceFrame type="desktop|phone|browser">`, `<Stat value label>`, `<TechList>`, `<VideoLoop>`, `<Steps>`.

### 5.4 O mnie
- Zdjęcie (dobrej jakości, `TODO(content)`), 3–4 akapity: kim jestem, jak pracuję, co mnie kręci w programowaniu, coś ludzkiego (np. sport — judo/siatkówka/MMA/siłownia buduje dyscyplinę; tylko jeśli Piotr chce).
- **Doświadczenie** (oś czasu): staż komercyjny (firma Leon — aplikacje biznesowe, praca z narzędziami AI w dev/debugowaniu/dokumentacji), projekty własne.
- **Edukacja:** Technikum — Technik Programista (ZSB Rybnik, 2026), kwalifikacje INF.03 i INF.04 (wyniki 90%+); WSB Merito Chorzów — Informatyka, specjalizacja cyberbezpieczeństwo (w trakcie).
- **Umiejętności** pogrupowane + języki (angielski B2+).
- **Zasady pracy** (3–4 punkty, np. „Najpierw działający prototyp, potem szlif”).
- CTA: Pobierz CV / Kontakt.

### 5.5 Kontakt
- Formularz: imię, e-mail, temat (select: oferta pracy / projekt / inne), wiadomość; walidacja Zod (klient + serwer), Turnstile, honeypot, rate-limit (np. Upstash lub prosty limit po IP w KV — opcjonalnie), stany: wysyłanie / sukces / błąd, dostępne komunikaty (`aria-live`).
- Działa bez JS (POST do Action z przekierowaniem i komunikatem).
- Obok: e-mail (kopiuj), LinkedIn, GitHub, informacja o czasie odpowiedzi i strefie czasowej.

### 5.6 404
Styl terminala: `$ cd /szukana-strona → bash: no such file or directory`, podpowiedzi linków, przycisk ⌘K.

---

## 6. Design system

### 6.0 Źródło stylu — research na Refero Styles (OBOWIĄZKOWE przed jakimkolwiek kodem UI)

**Czym jest Refero Styles:** biblioteka ponad 2000 systemów designu prawdziwych stron produktowych (https://styles.refero.design/). Każdy styl ma stronę (`/style/{uuid}`) z kolorami, typografią, odstępami, komponentami i plikiem **DESIGN.md** pisanym pod agentów AI. Strona główna ma wyszukiwarkę i kolekcje, m.in. „Like Vercel”, „Terminal & monospace”, „Editorial magazine”, „Cream paper & serif”, „Like Apple”, „Retro web nostalgia”.

**Cel:** wybrać styl najlepiej pasujący do portfolio programisty, a potem **przetworzyć go we własny, rozpoznawalny design system**. Ma być wzorowanie, nie podróbka.

#### Krok 1 — Przegląd (szeroko)
- Przejrzyj stronę główną i **wszystkie kolekcje**. Użyj wyszukiwarki z frazami: `developer`, `portfolio`, `terminal`, `monospace`, `dark`, `precision`, `editorial`, `docs`, `minimal`, `command`.
- Priorytetowo sprawdź kolekcje **„Terminal & monospace”**, **„Like Vercel”** i **„Editorial magazine”** oraz style narzędzi developerskich (np. Linear, Raycast, Vercel, Cursor). Nie ograniczaj się jednak do nich: ma wygrać najlepszy styl, nie najbardziej oczywisty.
- Narzędzia: WebFetch. Strona jest renderowana przez JS, więc gdy WebFetch zwróci mało treści, użyj Playwrighta (zrzuty ekranu i odczyt DOM). Jeśli dostępne jest MCP Refero, możesz go użyć. Gdy nic nie działa, poproś Piotra o wklejenie DESIGN.md wybranych stylów. **Nie zgaduj zawartości stylu.**
- Zapisz notatki w `docs/style-research/` (jeden plik `.md` na styl): link, nazwa, opis nastroju, paleta, fonty, charakterystyczne komponenty i zrzut ekranu.

#### Krok 2 — Shortlista i ocena (8–12 → 3)
Oceń shortlistę w macierzy w `docs/style-research/SCORING.md`, w skali 1–5 i z wagami:

| Kryterium | Waga |
|---|---|
| Pasuje do portfolio programisty (wiarygodność, „inżynierski” charakter) | 3 |
| Czytelność długiej treści (case studies, kod) | 3 |
| Prezentacja projektów (miejsce na zrzuty, wideo, metryki) | 3 |
| Działa w dark **i** light (albo da się sensownie dorobić drugi tryb) | 2 |
| Dostępność: osiągalne kontrasty WCAG AA, czytelne fonty | 2 |
| Polskie znaki: fonty z latin-ext albo łatwy zamiennik | 2 |
| Wyróżnia się na tle typowych szablonów portfolio | 2 |
| Wykonalność w budżetach wydajności z §11 (brak ciężkich efektów) | 2 |
| Zgodność z sygnaturami z §2 (⌘K, terminal, TOC) | 1 |

Wynik: **top 3 kierunki**. Dla każdego zrób krótką kartę: zrzuty oryginału, co bierzemy, co zmieniamy i szkic hero oraz karty projektu (strona `/_design/kierunki` albo statyczne zrzuty z Playwrighta). **Piotr wybiera jeden.** Nie idziesz dalej bez jego decyzji.

#### Krok 3 — Adaptacja („inspired by, not copied”)
Na bazie wybranego stylu powstaje **`docs/DESIGN.md`**, czyli nasz własny design system. Od tej chwili to on jest źródłem prawdy dla §6.1–6.5.

Zasady adaptacji (obowiązkowe):
1. **Bierzemy zasady, nie zasoby:** rytm odstępów, hierarchię typografii, logikę kolorów (role: canvas, surface, text, accent), charakter komponentów i nastrój.
2. **Nigdy nie kopiujemy:** logotypów, ilustracji, zdjęć, ikon autorskich, tekstów, nazw produktów, plików fontów komercyjnych ani 1:1 odtworzonych sekcji strony źródłowej.
3. **Minimum 3 świadome zmiany** względem oryginału, każda opisana:
   - **inny kolor akcentu** (nasz własny, dobrany pod kontrast w obu trybach);
   - **co najmniej jeden inny font** w parze (z licencją open source i latin-ext);
   - **nasz element sygnaturowy** (np. siatka/terminal z §2), którego źródło nie ma;
   - opcjonalnie inne promienie, gęstość albo układ siatki.
4. Jeśli styl źródłowy ma tylko jeden tryb, drugi projektujemy sami według tych samych ról kolorów.
5. W `docs/DESIGN.md` jest sekcja **„Inspiracja i różnice”**: link do stylu na Refero, tabela „źródło → nasza decyzja → powód”. Ta sama decyzja trafia skrótem do `docs/DECISIONS.md`.
6. Test „podróbki”: postaw zrzut naszej strony głównej obok strony źródłowej. Jeśli ktoś może je pomylić, zmiany są za małe — wracamy do kroku 3.

Struktura `docs/DESIGN.md`: Nastrój (3 zdania) · Inspiracja i różnice · Kolory (role, dark/light, OKLCH, kontrasty) · Typografia (fonty, skala, zasady) · Odstępy i siatka · Kształty i głębia · Ruch · Komponenty (z wariantami i stanami) · Obrazy i media · Czego unikamy.

Poniższe §6.1–6.5 to **wartości startowe i wymagania strukturalne** (role tokenów, stany komponentów, reduced-motion). Konkretne wartości (kolory, fonty, promienie) nadpisuje `docs/DESIGN.md`.

---

Wszystko w `src/styles/tokens.css` jako zmienne CSS + `@theme` Tailwinda v4. Kolory w **OKLCH**.

### 6.1 Kolory (hipoteza startowa — nadpisywana przez docs/DESIGN.md po Fazie 1a)
Dark (domyślny):
```
--color-bg:          oklch(0.16 0.01 260)   /* prawie czarny, chłodny */
--color-bg-elevated: oklch(0.20 0.012 260)
--color-surface:     oklch(0.24 0.014 260)
--color-border:      oklch(0.32 0.015 260)
--color-fg:          oklch(0.96 0.005 260)
--color-fg-muted:    oklch(0.72 0.01 260)
--color-fg-subtle:   oklch(0.55 0.012 260)
--color-accent:      oklch(0.82 0.17 145)   /* „terminalowa” zieleń-limonka */
--color-accent-fg:   oklch(0.18 0.02 145)
--color-success / --color-warning / --color-danger
```
Light: odwrócone jasności, akcent przyciemniony dla kontrastu (min. 4.5:1 dla tekstu, 3:1 dla elementów UI). **Kontrasty sprawdzić narzędziem i zapisać w `docs/DESIGN-TOKENS.md`.**
Alternatywne akcenty (tylko jeśli DESIGN.md nie ustali innego): elektryczny niebieski `oklch(0.72 0.17 250)`, bursztyn `oklch(0.80 0.15 75)`. Akcent = jedna zmienna, łatwa podmiana.

### 6.2 Typografia
- Sans: Geist (variable) — nagłówki i tekst. Mono: JetBrains Mono — etykiety, metadane, kod, terminal.
- Skala płynna (`clamp`), ratio ~1.25:
  - `display`: clamp(2.75rem, 6vw, 5.5rem), tracking −0.03em, leading 1.0
  - `h1` 2.5–3.5rem · `h2` 1.9–2.5rem · `h3` 1.4–1.6rem · `body` 1.0625rem leading 1.65 · `small` 0.875rem · `mono-label` 0.75rem uppercase tracking 0.08em
- Długość linii tekstu: max 68ch. `text-wrap: balance` dla nagłówków, `pretty` dla akapitów.

### 6.3 Przestrzeń, siatka, kształty
- Skala odstępów 4px (Tailwind domyślna), sekcje: `py-24 md:py-32`.
- Kontener: max 1200px, gutter 16px (mobile) / 24px / 32px.
- Siatka 12 kolumn na desktopie dla bento.
- Promienie: `--radius-sm 6px`, `--radius-md 10px`, `--radius-lg 16px`. Bordery 1px zamiast cieni w dark mode; cienie miękkie w light.

### 6.4 Ruch
- Czasy: `--dur-fast 120ms`, `--dur-base 200ms`, `--dur-slow 400ms`. Easing: `--ease-out cubic-bezier(0.22, 1, 0.36, 1)`, spring w Motion: `{ stiffness: 400, damping: 30 }`.
- Wejścia sekcji: fade + translateY(8px) przez CSS scroll-driven animations (`animation-timeline: view()`) z fallbackiem (bez animacji) — nie przez JS.
- Hover kart: max 1 efekt na raz (spotlight LUB tilt), nigdy oba.
- `@media (prefers-reduced-motion: reduce)` → wszystkie animacje ruchu wyłączone, zostają tylko zmiany koloru/opacity.

### 6.5 Komponenty bazowe (UI kit)
`Button` (primary/secondary/ghost, rozmiary sm/md/lg, wariant link `as="a"`), `IconButton` (zawsze z `aria-label`), `Badge/Tag`, `Card`, `Section` (tytuł z mono-labelem typu `01 — Projekty`), `Container`, `Link` (wewn./zewn. z ikoną ↗ i `rel`), `Kbd`, `Tooltip` (CSS), `Toast`, `ThemeToggle`, `LangSwitch`, `StatusDot`, `Divider`, `Skeleton`.
Stany każdego interaktywnego elementu: default / hover / focus-visible / active / disabled. Focus ring: 2px akcent + offset 2px.

**Strona `/_design` (tylko dev, wykluczona z builda produkcyjnego i sitemapy):** żywy katalog tokenów i komponentów w obu motywach.

---

## 7. Model treści (Content Collections)

Plik `src/content.config.ts`. Treści dwujęzyczne: osobne pliki per język (`kalkulator-mebli/pl.mdx`, `kalkulator-mebli/en.mdx`), wspólne metadane w frontmatter wersji PL; walidator sprawdza, że każdy projekt ma obie wersje (w fazie i18n — brak EN = ostrzeżenie, nie błąd builda).

### 7.1 `projects`
```ts
z.object({
  title: z.string(),
  tagline: z.string().max(120),
  summary: z.string().max(200),          // do kart i meta description
  lang: z.enum(['pl', 'en']),
  type: z.enum(['desktop', 'web', 'mobile', 'automation', 'library']),
  status: z.enum(['live', 'in-progress', 'archived']),
  featured: z.boolean().default(false),
  order: z.number().default(100),        // niższy = wyżej
  year: z.number(),
  duration: z.string().optional(),       // "3 miesiące"
  role: z.string(),                      // "Solo — design, dev, wdrożenie"
  stack: z.array(z.string()),            // klucze z src/data/tech.ts
  cover: image(),
  coverAlt: z.string(),
  video: z.string().optional(),          // ścieżka do mp4/webm w public/
  links: z.object({
    demo: z.string().url().optional(),
    repo: z.string().url().optional(),
    download: z.string().url().optional(),
  }).default({}),
  metrics: z.array(z.object({ value: z.string(), label: z.string() })).max(4).default([]),
  confidential: z.boolean().default(false), // ukrywa repo/dane klienta, pokazuje dopisek
  draft: z.boolean().default(false),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
})
```

### 7.2 `experience`
```ts
z.object({
  lang: z.enum(['pl', 'en']),
  kind: z.enum(['work', 'internship', 'education', 'certification']),
  title: z.string(), org: z.string(), location: z.string().optional(),
  start: z.coerce.date(), end: z.coerce.date().optional(), // brak = obecnie
  highlights: z.array(z.string()).max(5),
  stack: z.array(z.string()).default([]),
  url: z.string().url().optional(),
})
```

### 7.3 `notes` (faza 2 — blog)
title, description, lang, publishedAt, updatedAt?, tags[], draft, readingTime (wyliczane).

### 7.4 `now` (status do hero i strony /teraz)
lines: string[] (rotujące w terminalu), updatedAt.

### 7.5 Dane statyczne (`src/data/`)
- `tech.ts` — słownik technologii: `{ key, label, icon (iconify id), category, level: 'daily'|'familiar'|'learning', url }`. Projekty odwołują się kluczami — literówka = błąd typów.
- `socials.ts` — linki.
- `src/config/site.ts` — imię, rola, domena, e-mail, status „open to work”, domyślny język, akcent, ścieżki CV.

### 7.6 Kandydaci na case studies (do potwierdzenia przez Piotra)
Z dotychczasowych projektów Piotra — wybrać 3–4 najmocniejsze jako `featured`:
- **Aplikacja do awizacji** (desktop) — automatyzacja procesu awizacji pojazdów/dostaw.
- **Command Center** (desktop) — osobisty launcher/centrum dowodzenia.
- **Kalkulator mebli** (web, single-page) — rozkrój mebli, rysunek, lista rozkroju, PDF dla stolarni.
- **Platforma komunikacji wewnętrznej** (Firebase) — komunikacja z pracownikami.
- **System rozliczania podwykonawców** — logowanie czasu z GPS + panel menedżera.
- **Uniwersalne SDK licencji/aktywacji** — jeśli dojdzie do etapu działającego.
Dla projektów komercyjnych/poufnych: `confidential: true`, zanonimizowane zrzuty, brak linku do repo.

---

## 8. i18n

- Astro i18n routing: `defaultLocale: 'pl'`, `locales: ['pl', 'en']`, `prefixDefaultLocale: false`.
- Słowniki UI: `src/i18n/pl.ts`, `src/i18n/en.ts` — typ `en` musi spełniać kształt `pl` (`satisfies typeof pl`), brak klucza = błąd TS.
- Helper `t(locale)` + `getLocalizedPath(path, locale)` + mapa tłumaczeń slugów stron (`projekty` ↔ `projects`).
- Przełącznik języka prowadzi do **odpowiednika bieżącej strony**, nie na stronę główną.
- `<html lang>`, `hreflang` (pl, en, x-default), `og:locale`.
- Daty przez `Intl.DateTimeFormat`, liczby przez `Intl.NumberFormat`.
- Bez automatycznego przekierowania po `Accept-Language` (szkodzi SEO); ewentualnie dyskretny baner „This page is available in English”.

---

## 9. SEO i udostępnianie

- Komponent `<SEO>`: title (`Strona — Imię Nazwisko`), description, canonical, hreflang, OG, Twitter card, `theme-color` dla obu motywów.
- **JSON-LD:** `Person` (strona główna, o mnie: name, jobTitle, url, sameAs, alumniOf, knowsAbout), `WebSite`, `BreadcrumbList` (case study), `CreativeWork`/`SoftwareApplication` (projekt).
- OG images 1200×630 generowane per strona/projekt (satori): tło z siatką, tytuł, tagi, monogram.
- `@astrojs/sitemap` z i18n, `robots.txt`, RSS (notatki), `llms.txt` (krótki opis osoby i linki — widoczność w wyszukiwarkach AI).
- Semantyczny HTML: jeden `h1` na stronę, landmarki (`header`, `nav`, `main`, `footer`), skip link „Przejdź do treści”.
- Favicon: SVG (z wariantem dark przez media query w SVG) + `apple-touch-icon` + `manifest.webmanifest`.

---

## 10. Dostępność (WCAG 2.2 AA)

- Kontrast tekstu ≥ 4.5:1, dużego ≥ 3:1, elementów UI ≥ 3:1 — w obu motywach.
- Pełna obsługa klawiaturą: menu mobilne (focus trap, Esc), command palette (strzałki, Enter, Esc, przywrócenie fokusu), formularz.
- `focus-visible` zawsze widoczny; target size ≥ 24×24 px.
- Wideo: bez dźwięku, kontrolka pauzy, poster; reduced-motion → statyczny obraz.
- Formularze: `label` dla każdego pola, błędy powiązane `aria-describedby`, `aria-invalid`, podsumowanie błędów.
- Linki zewnętrzne: ikona + tekst dla czytników („otwiera się w nowej karcie” tylko jeśli `target=_blank` — domyślnie unikać).
- Testy: axe w Playwright na każdej trasie w obu językach i motywach; ręczny test z czytnikiem (NVDA) przed launchem.

---

## 11. Wydajność — budżety (twarde)

| Metryka | Budżet |
|---|---|
| JS (gzip) strona główna | ≤ 60 KB |
| JS (gzip) case study | ≤ 30 KB (bez palety ładowanej leniwie) |
| CSS (gzip) | ≤ 25 KB |
| Fonty | ≤ 2 pliki preload (sans + mono variable, woff2, subset) |
| Obraz LCP | `fetchpriority="high"`, AVIF, ≤ 120 KB |
| LCP / CLS / INP | < 1.8 s / < 0.05 / < 150 ms |

Techniki: command palette ładowana `client:idle` + dynamiczny import indeksu; wideo `preload="none"` + IntersectionObserver; `font-display: swap` + `size-adjust` fallback (mniejszy CLS); prefetch linków (Astro prefetch, strategia `hover`/`viewport`); obrazy z `width/height`.
Lighthouse CI w GitHub Actions blokuje merge przy spadku poniżej progów (`lighthouserc.json`).

---

## 12. Bezpieczeństwo i prywatność

- Nagłówki (w `vercel.json` lub middleware): `Content-Security-Policy` (nonce/hash dla inline scriptów motywu), `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (wyłączone kamera/mikrofon/geolokalizacja), `X-Frame-Options: DENY` / `frame-ancestors 'none'`.
- Cel: ocena A+ na securityheaders.com i Mozilla Observatory (Piotr studiuje cyberbezpieczeństwo — to warto pokazać w stopce/„colophonie”).
- Sekrety (`RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `GITHUB_TOKEN`, `CONTACT_TO_EMAIL`) przez `astro:env` ze schematem; `.env.example` w repo.
- Formularz: walidacja serwerowa, limit długości, sanitizacja do e-maila (plain text), Turnstile weryfikowany po stronie serwera, honeypot, rate limit.
- E-mail na stronie nie w czystym tekście w HTML-u (prosta obfuskacja / przycisk „kopiuj”).
- Analityka bez cookies; krótka strona/akapit „Prywatność” w stopce.
- `security.txt` w `/.well-known/`.

---

## 13. Struktura repozytorium

```
portfolio/
├─ .github/
│  ├─ workflows/ci.yml            # lint, check, test, build, e2e, lighthouse
│  ├─ PULL_REQUEST_TEMPLATE.md
│  └─ renovate.json
├─ docs/
│  ├─ PLAN.md                     # ten plik
│  ├─ CONTENT-CHECKLIST.md
│  ├─ DECISIONS.md                # ADR-lite: data, decyzja, powód, alternatywy
│  ├─ DESIGN.md                   # NASZ design system (adaptacja stylu z Refero) — źródło prawdy dla UI
│  ├─ style-research/             # notatki per styl z Refero + SCORING.md + zrzuty
│  ├─ DESIGN-TOKENS.md            # paleta + zmierzone kontrasty
│  └─ PROGRESS.md                 # log postępu faz
├─ public/
│  ├─ cv/cv-pl.pdf, cv-en.pdf
│  ├─ favicon.svg, apple-touch-icon.png, manifest.webmanifest
│  ├─ videos/
│  └─ .well-known/security.txt
├─ src/
│  ├─ actions/index.ts            # Astro Actions: contact
│  ├─ assets/                     # obrazy przetwarzane przez astro:assets
│  │  ├─ projects/<slug>/...
│  │  └─ me/
│  ├─ components/
│  │  ├─ ui/                      # Button, Badge, Card, Kbd, Toast...
│  │  ├─ layout/                  # Header, Footer, MobileMenu, SkipLink, SEO
│  │  ├─ home/                    # Hero, FeaturedProjects, WhatIDo, Stack, ...
│  │  ├─ projects/                # ProjectCard, ProjectFilters, ProjectHeader, Toc
│  │  ├─ mdx/                     # Callout, Figure, Gallery, BeforeAfter, DeviceFrame, Stat...
│  │  └─ islands/                 # CommandPalette.tsx, ContactForm.tsx, ProjectFilter.tsx
│  ├─ config/site.ts
│  ├─ content/
│  │  ├─ projects/<slug>/pl.mdx, en.mdx
│  │  ├─ experience/*.md
│  │  ├─ notes/
│  │  └─ now/now.pl.md, now.en.md
│  ├─ content.config.ts
│  ├─ data/tech.ts, socials.ts
│  ├─ i18n/pl.ts, en.ts, utils.ts, routes.ts
│  ├─ layouts/BaseLayout.astro, PageLayout.astro, CaseStudyLayout.astro
│  ├─ lib/                        # github.ts, og.ts, search-index.ts, dates.ts, reading-time.ts
│  ├─ pages/
│  │  ├─ index.astro, projekty/index.astro, projekty/[slug].astro, o-mnie.astro, kontakt.astro, 404.astro
│  │  ├─ en/ ... (odpowiedniki)
│  │  ├─ og/[...slug].png.ts      # generator OG
│  │  ├─ search-index.json.ts     # indeks dla command palette
│  │  ├─ rss.xml.ts, llms.txt.ts
│  │  └─ _design.astro            # tylko dev
│  ├─ scripts/theme.ts            # inline, bez FOUC
│  └─ styles/global.css, tokens.css
├─ tests/
│  ├─ unit/                       # vitest
│  └─ e2e/                        # playwright: nav, i18n, theme, palette, contact, a11y, visual
├─ astro.config.mjs
├─ eslint.config.js, .prettierrc, lefthook.yml, commitlint.config.js
├─ lighthouserc.json, playwright.config.ts, vitest.config.ts
├─ .env.example, .nvmrc, .editorconfig
├─ CLAUDE.md
└─ README.md                      # porządne README — to też jest portfolio
```

---

## 14. Roadmapa — fazy z kryteriami akceptacji

Każda faza = osobny PR, preview deploy na Vercel, aktualizacja `docs/PROGRESS.md`.

### Faza 0 — Fundament repo
- `pnpm create astro@latest` (minimal, TS strictest), `.nvmrc`, `engines`.
- Tailwind v4, ESLint, Prettier, lefthook + lint-staged + commitlint, Vitest, Playwright, Renovate, CI workflow, `.env.example` + `astro:env`.
- Integracje: mdx, sitemap, adapter Vercel, astro-icon, expressive-code.
- **AC:** `pnpm lint/check/test/build` zielone lokalnie i w CI; preview deploy działa; pusty `BaseLayout` z `<html lang>`.

### Faza 1a — Research stylu (Refero Styles)
- Kroki 1–3 z §6.0: przegląd wszystkich kolekcji, shortlista 8–12 stylów, macierz ocen, top 3 kierunki ze szkicami, **decyzja Piotra**, potem adaptacja do `docs/DESIGN.md`.
- Gałąź `feat/faza-1a-styl`, bez kodu produkcyjnego (najwyżej strona szkiców `/_design/kierunki`).
- **AC:** `docs/style-research/` z notatkami i `SCORING.md`; Piotr wybrał kierunek (zapisane w `DECISIONS.md`); `docs/DESIGN.md` kompletny, z sekcją „Inspiracja i różnice” i co najmniej 3 udokumentowanymi zmianami; test „podróbki” zaliczony.

### Faza 1b — Design system
- `tokens.css` (dark + light) **według `docs/DESIGN.md`**, fonty self-hosted z latin-ext, skrypt motywu bez FOUC (inline w `<head>`, `localStorage` + `prefers-color-scheme`), komponenty UI z §6.5 w stylu z DESIGN.md, strona `/_design`.
- **AC:** wszystkie komponenty w 5 stanach w obu motywach na `/_design`; kontrasty zmierzone w `DESIGN-TOKENS.md`; brak FOUC przy twardym odświeżeniu; snapshot `/_design` w Playwrighcie; każda wartość w `tokens.css` ma odpowiednik w `DESIGN.md`.

### Faza 2 — Layout i strona główna
- Header (sticky, mobile menu), Footer, SkipLink, SEO, Hero, sekcje §5.1 na danych przykładowych.
- **AC:** responsywność 360–1920; klawiatura OK; Lighthouse ≥ progi; CLS < 0.05.

### Faza 3 — Projekty i case studies
- Content collections + schematy, `tech.ts`, lista z filtrem (progressive enhancement), `CaseStudyLayout` z TOC/scrollspy, komponenty MDX, View Transitions lista→case study, Mermaid przy buildzie, 1 kompletne case study wzorcowe (np. Kalkulator mebli) + 2–3 szkice.
- **AC:** błędny frontmatter wywala build z czytelnym błędem; filtr działa bez JS (pokazuje wszystko) i z JS; TOC podświetla sekcję; przejście animuje się i ma fallback.

### Faza 4 — O mnie, doświadczenie, CV
- Strona `/o-mnie`, kolekcja `experience`, oś czasu, link do PDF CV w PL/EN (pliki dostarcza Piotr).
- **AC:** CV dostępne w ≤ 2 kliknięcia z każdej strony; JSON-LD `Person` przechodzi walidator Google Rich Results / schema.org.

### Faza 5 — Kontakt
- Astro Action + Zod + Resend + Turnstile + honeypot (+ opcjonalny rate limit), wyspa `ContactForm` z fallbackiem bez JS.
- **AC:** e2e: poprawne wysłanie (mock Resend), błędy walidacji, działa z wyłączonym JS; brak sekretów w bundlu klienta.

### Faza 6 — i18n EN
- Słowniki, trasy `/en/...`, przełącznik zachowujący stronę, hreflang, treści EN.
- **AC:** każda trasa PL ma EN; brak kluczy = błąd TS; e2e przełączania języka na każdej stronie.

### Faza 7 — SEO, OG, pliki techniczne
- OG images, JSON-LD wszędzie, sitemap, RSS, robots, llms.txt, manifest, favicony, security.txt, nagłówki bezpieczeństwa + CSP.
- **AC:** podgląd linku poprawny (opengraph.xyz); A+ securityheaders.com; Lighthouse SEO 100.

### Faza 8 — Sygnatury i polish
- Command palette (⌘K/Ctrl+K, indeks z builda, akcje: nawigacja, motyw, język, CV, kopiuj e-mail, GitHub), linia terminala w hero, spotlight na siatce, scroll-driven reveal, 404 w stylu terminala, toasty, dane GitHub przy buildzie, analityka.
- Mikro-detale: `::selection` w kolorze akcentu, stylizowany scrollbar, `text-wrap: balance`, ładne `:focus-visible`, easter egg w konsoli (`console.log` z ASCII monogramem i linkiem do repo).
- **AC:** paleta w pełni z klawiatury, przywraca fokus; JS strony głównej nadal w budżecie; reduced-motion wyłącza ruch.

### Faza 9 — QA i launch
- Pełny przegląd: Playwright (wszystkie trasy × 2 języki × 2 motywy), axe, Lighthouse CI, ręczny test NVDA, test na prawdziwym telefonie (Android Chrome + iOS Safari), Firefox.
- Domena (np. `imienazwisko.dev` / `.pl`), HTTPS, przekierowanie www→apex, Google Search Console + Bing Webmaster, zgłoszenie sitemapy.
- Uzupełnione wszystkie `TODO(content)`; README repo z zrzutem, stackiem i wynikami Lighthouse.
- **AC:** zero `TODO(content)` w buildzie produkcyjnym (skrypt w CI to sprawdza); wszystkie progi z §1 spełnione na produkcji.

### Faza 10+ — Rozbudowa (po launchu, w kolejności wartości)
1. **Notatki/blog** (MDX, tagi, RSS, czas czytania, spis treści) — najlepszy sposób na stały wzrost widoczności.
2. **/teraz** i **/uses**.
3. **Live demo w iframe / embed** dla projektów webowych (np. kalkulator mebli) w ramce przeglądarki.
4. **Lab / playground** — małe eksperymenty UI (każdy jako izolowana wyspa, ładowany na żądanie).
5. **Wersje do druku** case studies (`@media print`) i automatycznie generowane CV z danych `experience` (jeden source of truth).
6. **Headless CMS** (np. Keystatic — pliki w repo, edycja z przeglądarki) gdy edycja MDX zacznie męczyć.
7. **Testimoniale** (tylko prawdziwe, z podpisem i zgodą).
8. **Statystyki** (strona `/stats`: commity, projekty, analityka publiczna).

---

## 15. CI/CD (GitHub Actions)

`ci.yml` na PR i push do `main`:
1. Setup pnpm + Node z cache.
2. `pnpm install --frozen-lockfile`
3. `pnpm lint` · `pnpm check` · `pnpm test`
4. `pnpm build` (z `GITHUB_TOKEN` do danych GitHub; brak tokena → fallback, nie błąd)
5. Skrypt: brak `TODO(content)` w `dist/` (tylko na `main`/release)
6. Playwright e2e + axe na `pnpm preview`
7. Lighthouse CI z progami z §1/§11

Vercel: preview deploy per PR, produkcja z `main`. Ochrona gałęzi `main`: wymagane zielone CI.

---

## 16. Testy — co dokładnie

- **Unit (Vitest):** helpery i18n (ścieżki, mapy slugów), formatowanie dat, reading time, budowa indeksu wyszukiwania, schemat formularza kontaktowego, fallback danych GitHub.
- **E2E (Playwright):**
  - nawigacja główna + mobile menu (klawiatura, Esc, focus trap)
  - przełączanie motywu (persistencja po reloadzie, brak FOUC — screenshot przed hydratacją)
  - przełączanie języka zachowuje stronę
  - command palette: otwarcie skrótem, wyszukanie projektu, Enter → przejście, Esc → fokus wraca
  - formularz: sukces (mock), błędy, wariant z wyłączonym JS
  - pobranie CV (status 200, content-type pdf)
  - axe na każdej trasie
  - visual snapshots kluczowych stron (desktop + mobile, dark + light)

---

## 17. Konfiguracja startowa — kluczowe fragmenty (wzorce, zweryfikować z aktualną dokumentacją)

`astro.config.mjs` (szkic):
```js
import { defineConfig, envField } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import icon from 'astro-icon';
import expressiveCode from 'astro-expressive-code';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://TODO-domena',
  output: 'static',
  adapter: vercel(),
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  i18n: { defaultLocale: 'pl', locales: ['pl', 'en'], routing: { prefixDefaultLocale: false } },
  integrations: [expressiveCode(), mdx(), react(), icon(), sitemap({ i18n: { defaultLocale: 'pl', locales: { pl: 'pl-PL', en: 'en-US' } } })],
  vite: { plugins: [tailwindcss()] },
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret' }),
      TURNSTILE_SECRET_KEY: envField.string({ context: 'server', access: 'secret' }),
      PUBLIC_TURNSTILE_SITE_KEY: envField.string({ context: 'client', access: 'public' }),
      CONTACT_TO_EMAIL: envField.string({ context: 'server', access: 'secret' }),
      GITHUB_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
});
```
Trasa z Action kontaktu: `export const prerender = false` tylko tam, gdzie potrzebne.

Skrypt motywu (inline w `<head>`, przed CSS):
```html
<script is:inline>
  (() => {
    const s = localStorage.getItem('theme');
    const t = s ?? (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.dataset.theme = t;
  })();
</script>
```
(Przy View Transitions — ponowne ustawienie motywu w `astro:after-swap`.)

---

## 18. Ryzyka i jak im zapobiec

| Ryzyko | Zapobieganie |
|---|---|
| „Ładna, ale pusta” — brak treści | Faza 3 zaczyna się od 1 kompletnego case study; `CONTENT-CHECKLIST.md`; blokada `TODO(content)` w CI. |
| Przeładowanie efektami | Budżety JS w CI; zasada „max 1 efekt na element”; reduced-motion. |
| Rozjazd PL/EN | Typowane słowniki; test e2e przełączania; ostrzeżenie o brakującym tłumaczeniu treści. |
| Zmiana API Astro/Tailwind | Weryfikacja z dokumentacją przed implementacją; `DECISIONS.md`; Renovate. |
| Spam w formularzu | Turnstile + honeypot + rate limit + walidacja serwerowa. |
| Strona wygląda jak kopia stylu z Refero | Zasady adaptacji z §6.0 (min. 3 zmiany, zakaz kopiowania zasobów), sekcja „Inspiracja i różnice”, test „podróbki”. |
| Styl ładny w galerii, ale nie działa dla długich case studies | Kryteria czytelności i prezentacji projektów z najwyższą wagą w `SCORING.md`; szkice hero i karty projektu przed decyzją. |
| Ujawnienie danych klienta w case study | `confidential: true`, anonimizacja zrzutów, przegląd przed publikacją. |
