# Portfolio

Osobiste portfolio programisty. Astro 7, TypeScript (strictest), Tailwind CSS v4, MDX, React jako wyspy i Vercel.

> Wczesny etap (Faza 0: fundament). Plan: [`docs/PLAN.md`](docs/PLAN.md) · postęp: [`docs/PROGRESS.md`](docs/PROGRESS.md) · decyzje: [`docs/DECISIONS.md`](docs/DECISIONS.md).

## Wymagania

- Node 24 LTS (`.nvmrc`)
- pnpm 12 (`corepack enable`)

## Start

```bash
pnpm install
cp .env.example .env   # opcjonalne do Fazy 5
pnpm dev
```

## Komendy

| Komenda         | Co robi                                                     |
| --------------- | ----------------------------------------------------------- |
| `pnpm dev`      | serwer deweloperski                                         |
| `pnpm build`    | build produkcyjny                                           |
| `pnpm preview`  | podgląd builda                                              |
| `pnpm check`    | `astro check` (typy)                                        |
| `pnpm lint`     | ESLint + `prettier --check`                                 |
| `pnpm format`   | `prettier --write`                                          |
| `pnpm test`     | Vitest (unit)                                               |
| `pnpm test:e2e` | Playwright + axe (sam buduje i uruchamia)                   |
| `pnpm lhci`     | Lighthouse CI na zbudowanym `dist/` (najpierw `pnpm build`) |

**Lighthouse CI lokalnie na Windowsie:** jeśli `lhci` zgłasza `spawn UNKNOWN`, wskaż headless shell z Playwrighta:

```powershell
$env:CHROME_PATH = (Get-ChildItem "$env:LOCALAPPDATA\ms-playwright" -Recurse -Filter chrome-headless-shell.exe | Select-Object -First 1).FullName
pnpm lhci
```

## Wdrożenie (Vercel)

1. Na vercel.com: **Add New → Project** i import repozytorium z GitHuba (framework: Astro, wykryty automatycznie).
2. Zmienne środowiskowe z `.env.example` dodaj, gdy będą potrzebne (Faza 5+).
3. Każdy PR dostaje preview deploy, a `main` idzie na produkcję.

## Konwencje

Conventional Commits (pilnuje commitlint w hooku `commit-msg`). Jedna faza = jedna gałąź `feat/faza-N-nazwa` = jeden PR. Szczegóły w [`CLAUDE.md`](CLAUDE.md).
