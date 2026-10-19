# PROGRESS.md — log postępu

Legenda: ⬜ nie zaczęte · 🟨 w toku · ✅ zrobione · ⏸ czeka na Piotra

| Faza | Nazwa                     | Gałąź                        | Status |
| ---- | ------------------------- | ---------------------------- | ------ |
| 0    | Fundament repo            | `feat/faza-0-fundament`      | ⏸ push |
| 1a   | Research stylu (Refero)   | `feat/faza-1a-styl`          | ⬜     |
| 1b   | Design system             | `feat/faza-1b-design-system` | ⬜     |
| 2    | Layout i strona główna    | `feat/faza-2-layout-home`    | ⬜     |
| 3    | Projekty i case studies   | `feat/faza-3-projekty`       | ⬜     |
| 4    | O mnie, doświadczenie, CV | `feat/faza-4-o-mnie`         | ⬜     |
| 5    | Kontakt                   | `feat/faza-5-kontakt`        | ⬜     |
| 6    | i18n EN                   | `feat/faza-6-i18n`           | ⬜     |
| 7    | SEO, OG, pliki techniczne | `feat/faza-7-seo`            | ⬜     |
| 8    | Sygnatury i polish        | `feat/faza-8-sygnatury`      | ⬜     |
| 9    | QA i launch               | `feat/faza-9-launch`         | ⬜     |

---

## 2026-10-19 — Kick-off

**Zrobione**

- Przeczytane: `CLAUDE.md`, `docs/PLAN.md`, `docs/CONTENT-CHECKLIST.md`.
- Sprawdzone aktualne wersje (npm) i dokumentacja Astro 7, Astro 6 (upgrade guide), Fonts API, Markdown processors i Tailwind v4.
- Utworzone `docs/DECISIONS.md` (wpisy #1–#11, status „proponowana”) i ten plik.

**Dalej**

- Plan Fazy 0 → zaakceptowany.

**Czeka na Piotra**

- Akceptacja decyzji #1–#11 w `DECISIONS.md`.
- `TODO(content)`: imię i nazwisko do wyświetlania (w plikach jest placeholder `{{IMIĘ NAZWISKO}}`), domena.

## 2026-10-19 — Faza 0: fundament repo

**Zrobione** (gałąź `feat/faza-0-fundament`, 7 commitów nad `main`)

- Astro 7.4 (minimal), TS strictest (TS 6.0), Node 24, pnpm 12.
- Integracje: MDX (procesor unified), Expressive Code, React, astro-icon (lucide), sitemap (i18n), adapter Vercel, Tailwind v4 (`@tailwindcss/vite`), prefetch, i18n routing (pl domyślny, `/en/`).
- `astro:env` (schemat z §17, sekrety opcjonalne do Fazy 5) + `.env.example`.
- Minimalny kod: `src/config/site.ts`, słowniki `src/i18n/{pl,en}.ts` (`satisfies`), `src/lib/paths.ts`, `BaseLayout` z `<html lang>` i meta description, strony `/` i `/en/`. Zero stylów (`tokens.css` czeka na DESIGN.md).
- Jakość: ESLint 10 flat (typescript-eslint, astro, jsx-a11y-strict), Prettier (astro + tailwind), lefthook (lint-staged + commitlint).
- Testy: Vitest (6 testów: ścieżki i18n, zgodność kluczy słowników), Playwright desktop + mobile (200, `lang`, jeden `main`/`h1`, axe WCAG 2.2 AA), Lighthouse CI z progami §1.
- CI (`.github/workflows/ci.yml`), Renovate, szablon PR, `vercel.json`, README.
- DECISIONS #12–#15, statusy #1–#7 i #11 → przyjęte.

**Wyniki DoD (lokalnie)**

- `pnpm install --frozen-lockfile` ✅ · `pnpm check` 0 errors ✅ · `pnpm lint` ✅ · `pnpm test` 6/6 ✅ · `pnpm build` 2 strony ✅
- `pnpm test:e2e` 8/8 ✅ · `pnpm lhci`: 100/100/100/100 na `/` i `/en/`, LCP ~0.9 s, CLS 0 ✅
- JS klienta: 1.1 KB gzip (prefetch), CSS 2.2 KB gzip.

**Otwarte**

- AC „zielone w CI” i „preview deploy działa” czekają na remote GitHub (URL od Piotra) + zgodę na push + podpięcie projektu w Vercel.

**Dalej**

- Po zamknięciu Fazy 0 → Faza 1a (research Refero), na zgodę Piotra.
