# PROGRESS.md — log postępu

Legenda: ⬜ nie zaczęte · 🟨 w toku · ✅ zrobione · ⏸ czeka na Piotra

| Faza | Nazwa                     | Gałąź                        | Status   |
| ---- | ------------------------- | ---------------------------- | -------- |
| 0    | Fundament repo            | `feat/faza-0-fundament`      | ✅ PR #1 |
| 1a   | Research stylu (Refero)   | `feat/faza-1a-styl`          | ✅ PR    |
| 1b   | Design system             | `feat/faza-1b-design-system` | 🟨 PR    |
| 2    | Layout i strona główna    | `feat/faza-2-layout-home`    | ⬜       |
| 3    | Projekty i case studies   | `feat/faza-3-projekty`       | ⬜       |
| 4    | O mnie, doświadczenie, CV | `feat/faza-4-o-mnie`         | ⬜       |
| 5    | Kontakt                   | `feat/faza-5-kontakt`        | ⬜       |
| 6    | i18n EN                   | `feat/faza-6-i18n`           | ⬜       |
| 7    | SEO, OG, pliki techniczne | `feat/faza-7-seo`            | ⬜       |
| 8    | Sygnatury i polish        | `feat/faza-8-sygnatury`      | ⬜       |
| 9    | QA i launch               | `feat/faza-9-launch`         | ⬜       |

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

- Remote: github.com/jakubstachowskii/portfolio, PR #1. CI (GitHub Actions) zielone na 0720bf8. Vercel preview zbudowany (status „Deployment has completed”), ale chroniony Vercel Authentication, więc treść sprawdza właściciel po zalogowaniu.
- Vercel: ustawić `ENABLE_EXPERIMENTAL_COREPACK=1` (pnpm 12 z `packageManager`), jeśli jeszcze nie ustawione.

**Dalej**

- Faza 0 zamknięta: PR #1 zmergowany 2026-10-19.

## 2026-10-19 — Faza 1a: research stylu (Refero)

**Zrobione** (gałąź `feat/faza-1a-styl`)

- Przegląd: wszystkie 95 kolekcji + 10 fraz z §6.0, 1326 unikalnych stylów.
- Shortlista 16 stylów z notatkami (`docs/style-research/*.md`).
- Macierz ocen `SCORING.md`: 16 stylów, najwyżej Convex (102), Zed (99), Dovetail (96), Factory (93).
- Druga runda na prośbę Piotra: pełny katalog 1342 stylów, filtr Apple / kinowe / portfolia / terminale, arkusz 24 kandydatów, 4 nowe style w macierzy, kryterium K10 „siła sprzedaży”.
- Kierunek D „Premiera” (synteza) ze szkicem desktop + mobile w obu trybach.
- D v2 po uwagach Piotra: Funnel Display/Sans, promienie 10/18/26, domyślnie ciemny, ruch (wejście hero, premiera sceny scroll-driven, snop za kursorem) + wideo `d-motion.webm`.
- D v3 na prośbę Piotra: + DNA Raycasta (powierzchnie „klawisza”, paleta ⌘K w hero, szklana pływająca nawigacja) + wideo `d3-motion.webm`.
- D v3.1: ocena Resenda, porównanie 3 krojów nagłówka i wybór Newsreader; pasmo „Specyfikacja” zastąpione paskiem faktów w scenach.
- Karty kierunków `KIERUNKI.md` (co bierzemy, co zmieniamy, kontrasty) + szkice hero i karty projektu w obu trybach (`sketches/`).

**Decyzja Piotra:** D v3.1 „Premiera” z nagłówkami Funnel Display.

**Krok 3 (adaptacja):** `docs/DESIGN.md` (nastrój, inspiracja i różnice, kolory OKLCH z kontrastami, typografia, rytm 8pt, kształty, ruch, komponenty, media, czego unikamy) + test „podróbki” (`style-research/PODROBKA.md`, zaliczony). Audyt kontrastu poprawił `dim` i dodał `line-control`.

**Kryteria akceptacji Fazy 1a (PLAN §14)**

- [x] `docs/style-research/` z notatkami (17 stylów) i `SCORING.md`
- [x] Piotr wybrał kierunek, zapisane w `DECISIONS.md` (#17)
- [x] `docs/DESIGN.md` kompletny, z sekcją „Inspiracja i różnice” i ≥ 3 udokumentowanymi zmianami (4)
- [x] Test „podróbki” zaliczony (powtórka po Fazie 2)
- [x] Bez kodu produkcyjnego (tylko szkice w `docs/style-research/sketches/`)

**Dalej:** Faza 1b (tokens.css według DESIGN.md, fonty, skrypt motywu, komponenty UI, strona `/design`), na zgodę Piotra.

## 2026-10-19 — Faza 1b: design system

**Zrobione** (gałąź `feat/faza-1b-design-system`)

- `src/styles/tokens.css`: wszystkie tokeny DESIGN.md (OKLCH), dark domyślny, light przez `data-theme` i system bez JS; `@theme` z wyczyszczonymi domyślnymi przestrzeniami Tailwinda, `--spacing: 8px`.
- Fonty przez Astro Fonts API: Funnel Display, Funnel Sans, Geist Mono (latin + latin-ext), 2 pliki preload.
- Motyw bez FOUC: `ThemeScript` inline w `<head>` + `src/lib/theme.ts`; `ThemeToggle` (klawiatura, zapis, etykieta akcji).
- 17 komponentów w `src/components/ui/`: Button, IconButton, Kbd, Tag, StatusDot, Link, Card, Container, SectionHeading, Divider, Skeleton, Tooltip, Toast, ThemeToggle, LangSwitch, ProjectWindow, Stage (+ `scripts/spotlight.ts`). Stany przez warianty `is-*` + `data-state`.
- `/design` (tylko dev i build testowy): kolory z kontrastem na żywo, typografia, 8pt, promienie, cienie, komponenty × 5 stanów, scena; panele dark i light obok siebie.
- Testy: kontrast 21 par × 2 motywy, zgodność inline skryptu motywu, strażnik magicznych wartości (81 unit); e2e: FOUC, persystencja, klawiatura, axe /design (24 e2e + 2 visual na Linuksie).
- `docs/DESIGN-TOKENS.md` generowany (`pnpm tokens:report`), DESIGN.md uzupełniony (success/danger, §12), DECISIONS #8, #19–#22.
- Audyt w trakcie: axe znalazł `dim` na `surface` 4.32:1 i niezgodną nazwę przełącznika języka (WCAG 2.5.3), oba naprawione; raport wykrył różowawe odcienie bieli (hue 0), poprawione.

**Kryteria akceptacji Fazy 1b (PLAN §14)**

- [x] Wszystkie komponenty w 5 stanach w obu motywach na `/design`
- [x] Kontrasty zmierzone w `DESIGN-TOKENS.md` (i pilnowane testem)
- [x] Brak FOUC przy twardym odświeżeniu (test e2e)
- [ ] Snapshot `/design` w Playwrighcie: test gotowy; baseline powstaje po uruchomieniu workflow „Aktualizuj snapshoty” na gałęzi (Linux)
- [x] Każda wartość w `tokens.css` ma odpowiednik w DESIGN.md (§3–§7, §12)

**Dalej:** Faza 2 (layout i strona główna), na zgodę Piotra.
