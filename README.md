# Portfolio

Osobiste portfolio programisty: Astro 7, TypeScript (strictest), Tailwind CSS v4, Vercel. Wygląd 1:1 według wzorca [`docs/design-reference.html`](docs/design-reference.html), projekty pobierane z GitHuba przy każdym buildzie.

Postęp: [`docs/PROGRESS.md`](docs/PROGRESS.md) · decyzje: [`docs/DECISIONS.md`](docs/DECISIONS.md) · design: [`docs/DESIGN.md`](docs/DESIGN.md).

## Wymagania

- Node 24 LTS (`.nvmrc`)
- pnpm 12 (`corepack enable`)

## Start

```bash
pnpm install
pnpm dev          # http://localhost:4321
```

Bez żadnych zmiennych środowiskowych strona działa w całości poza sekcją „Kod na GitHubie” (patrz [Zmienne środowiskowe](#zmienne-środowiskowe)).

## Jak dodać nowy projekt

Projekty to Twoje **publiczne repozytoria** z `github.com/jakubstachowskii`. Nic nie trzeba dopisywać w kodzie:

1. Wrzuć repo na GitHuba.
2. W repo kliknij **⚙ obok „About”** i uzupełnij:
   - **Description**: jedno-dwa zdania, pojawią się jako opis projektu (bez opisu brany jest pierwszy akapit README);
   - **Topics**: technologie (np. `react`, `sqlite`) — staną się tagami — oraz platforma: `desktop`, `web` albo `mobile` (bez niej: `web`);
   - **Website**: adres działającej wersji, jeśli jest — pojawi się przycisk „ZOBACZ ↗”.
3. Przy następnym buildzie projekt jest na stronie (codzienny rebuild robi to sam, patrz [Wdrożenie](#wdrożenie-vercel)).

Kolejność: najpierw projekty z polem `order` (patrz niżej), potem według ostatniego pusha.

### Opcjonalnie: nadpisanie i opis na podstronę

Plik `src/content/projects/<NazwaRepo>.md` (nazwa pliku = dokładna nazwa repo) nadpisuje dane z GitHuba. Wszystkie pola są opcjonalne:

```markdown
---
title: 'Awizacja App' # zamiast nazwy z repo
summary: 'Opis po polsku na liście i w podglądzie.'
summaryEn: 'Description in English.'
platforms: [desktop] # desktop / web / mobile
tags: [Electron, React, SQLite]
mock: awizacja # szkic w podglądzie: awizacja / formatka / lotto / pig / generic
order: 1 # niżej = wyżej na liście
hidden: false # true = nie pokazuj
---

Dłuższy opis na podstronę projektu (markdown, po polsku).
```

### Podgląd: screenshot zamiast szkicu

- Wrzuć obraz do `src/assets/projects/<NazwaRepo>.png` (albo `.jpg`/`.webp`), pokaże się w podglądzie i na podstronie w miejscu szkicu.
- Dla repo z ustawionym **Website**: `pnpm build && pnpm screenshots` zrobi zrzuty automatycznie.
- Bez screenshotu repo dostaje uniwersalny szkic `generic`. Nowy szkic: komponent w `src/components/mocks/` według zasady opisanej w `ProjectMock.astro`.

## Jak ukryć repo

Jedna z dwóch dróg:

- dodaj repo topik **`portfolio-hide`** (bez zmian w kodzie), albo
- dopisz nazwę repo do `hiddenRepos` w [`src/config/site.ts`](src/config/site.ts).

Forki, repozytoria zarchiwizowane i to repo (`portfolio`) są pomijane automatycznie.

## Dane właściciela, CV i zdjęcie

Dane kontaktowe są w [`src/config/site.ts`](src/config/site.ts). Dwie rzeczy pojawiają się na stronie dopiero, gdy je dodasz:

- **CV:** wrzuć PDF do `public/cv.pdf` i ustaw `cv: '/cv.pdf'` w `site.ts` — wtedy w hero pokaże się przycisk „CV.PDF ↓”.
- **Zdjęcie do „O mnie”:** wrzuć plik `src/assets/about/photo.jpg` (albo `.png`/`.webp`; kwadrat, min. 400×400) — pokaże się samo.

Własna domena: `site` w [`astro.config.mjs`](astro.config.mjs).

## Zmienne środowiskowe

| Zmienna        | Po co                                                                                                                                                                              | Bez niej                                                      |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `GITHUB_TOKEN` | Sekcja „Kod na GitHubie” (kalendarz kontrybucji wymaga GraphQL z tokenem) i wyższy limit zapytań do API. Token **fine-grained**, dostęp tylko do odczytu publicznych repozytoriów. | Sekcja GitHub się nie pokazuje; projekty pobierają się dalej. |

Lokalnie: plik `.env` (wzór w `.env.example`, nigdy nie commituj `.env`). Na produkcji: ustawienia projektu w Vercelu.

## Wdrożenie (Vercel)

Repo jest już podpięte: każdy PR dostaje podgląd, a `main` idzie na produkcję.

1. **Strona publiczna:** Vercel → projekt → **Settings → Deployment Protection** → _Vercel Authentication_: wyłącz dla produkcji (inaczej odwiedzający widzą ekran logowania Vercela).
2. **Token:** Vercel → **Settings → Environment Variables** → `GITHUB_TOKEN` (token jak wyżej), wszystkie środowiska → _Save_, potem _Redeploy_.
3. **Codzienny rebuild** (nowe repo i aktywność same trafiają na stronę): Vercel → **Settings → Git → Deploy Hooks** → utwórz hook dla `main` i skopiuj adres. Na GitHubie: repo → **Settings → Secrets and variables → Actions** → sekret `VERCEL_DEPLOY_HOOK` z tym adresem. Workflow [`rebuild.yml`](.github/workflows/rebuild.yml) wywoła go codziennie o 04:00 UTC (albo ręcznie: _Actions → Codzienny rebuild → Run workflow_).
4. **Własna domena (opcjonalnie):** Vercel → **Settings → Domains** → dodaj domenę i ustaw rekordy DNS według instrukcji Vercela. Potem zmień `site` w `astro.config.mjs`.

Nagłówki bezpieczeństwa i CSP są generowane przy buildzie (`src/integrations/security-headers.ts`, `security.csp`), nic nie trzeba ustawiać w Vercelu.

## Komendy

| Komenda             | Co robi                                                                                   |
| ------------------- | ----------------------------------------------------------------------------------------- |
| `pnpm dev`          | serwer deweloperski                                                                       |
| `pnpm build`        | build produkcyjny                                                                         |
| `pnpm preview`      | podgląd builda                                                                            |
| `pnpm check`        | `astro check` (typy)                                                                      |
| `pnpm lint`         | `astro sync` + ESLint + `prettier --check`                                                |
| `pnpm format`       | `prettier --write`                                                                        |
| `pnpm test`         | Vitest (unit)                                                                             |
| `pnpm test:e2e`     | Playwright + axe (sam buduje i uruchamia; zatrzymaj wcześniej `pnpm dev`)                 |
| `pnpm lhci`         | Lighthouse CI na zbudowanym `dist/`                                                       |
| `pnpm ci:local`     | **wszystkie kroki CI na czystej kopii ostatniego commitu** — uruchamiaj przed każdym push |
| `pnpm screenshots`  | zrzuty stron repo z ustawionym Website → `src/assets/projects/`                           |
| `pnpm brand`        | favicon Apple i obrazek Open Graph z `scripts/brand.html`                                 |
| `pnpm fonts:subset` | podzbiory fontów do `src/assets/fonts/` (po zmianie zakresów znaków)                      |

**Lighthouse CI lokalnie na Windowsie:** jeśli `lhci` zgłasza `spawn UNKNOWN`, wskaż headless shell z Playwrighta:

```powershell
$env:CHROME_PATH = (Get-ChildItem "$env:LOCALAPPDATA\ms-playwright" -Recurse -Filter chrome-headless-shell.exe | Select-Object -First 1).FullName
pnpm lhci
```

## Konwencje

Conventional Commits (pilnuje commitlint w hooku `commit-msg`). Jeden etap = jedna gałąź `feat/etap-N-nazwa` = jeden PR, przed pushem `pnpm ci:local`. Szczegóły w [`CLAUDE.md`](CLAUDE.md).
