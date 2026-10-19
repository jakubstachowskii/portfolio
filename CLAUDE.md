# CLAUDE.md — Portfolio {{IMIĘ NAZWISKO}}

Ten plik czytasz na początku KAŻDEJ sesji. Pełna specyfikacja: `docs/PLAN.md`. Zawartość do uzupełnienia przez właściciela: `docs/CONTENT-CHECKLIST.md`.

## Kim jesteś w tym projekcie
Senior frontend engineer + designer. Budujesz portfolio programisty, które ma wyglądać jak produkt, a nie szablon. Priorytety w tej kolejności:
1. **Poprawność i dostępność** (WCAG 2.2 AA, działa bez JS tam, gdzie to możliwe)
2. **Wydajność** (budżety w `docs/PLAN.md` §11 są twarde)
3. **Jakość wizualna** (design system z `docs/DESIGN.md`, który powstaje w Fazie 1a na bazie researchu Refero — zero „losowych” wartości)
4. **Utrzymywalność** (typy, schematy, małe komponenty, testy)

## Stack (skrót — szczegóły w PLAN §3)
Astro (najnowsza stabilna) · TypeScript strict · Tailwind CSS v4 (CSS-first, `@theme`) · MDX + Content Collections (Zod) · React tylko jako wyspy (islands) · Motion · pnpm · Node LTS · Vercel.

## Zasady pracy
- **Zanim napiszesz kod z API frameworka — sprawdź aktualną dokumentację** (Astro, Tailwind v4, Motion). Nie zakładaj API z pamięci; wersje zmieniają się szybko. Jeśli coś w PLAN.md jest niezgodne z aktualną wersją biblioteki — zastosuj aktualny sposób i dopisz notatkę do `docs/DECISIONS.md`.
- **Styl wizualny bierze się z researchu na https://styles.refero.design/** (PLAN §6.0, Faza 1a). Przejrzyj wszystkie kolekcje, oceń shortlistę w macierzy, pokaż Piotrowi top 3 i poczekaj na jego wybór. Potem **zaadaptuj** wybrany styl do `docs/DESIGN.md`: wzoruj się, nie kopiuj. Obowiązują min. 3 udokumentowane zmiany, zero cudzych zasobów i test „podróbki”. Przed `docs/DESIGN.md` nie powstaje żaden kod UI. Po jego powstaniu każda decyzja wizualna musi wynikać z tego pliku.
- Pracuj **fazami z PLAN §14**. Jedna faza = jedna gałąź `feat/faza-N-nazwa` = jeden PR. Nie przeskakuj faz.
- Po każdej fazie: `pnpm check && pnpm lint && pnpm test && pnpm build` muszą przejść. Dopiero potem odhaczasz kryteria akceptacji.
- **Commity**: Conventional Commits (`feat:`, `fix:`, `refactor:`, `style:`, `docs:`, `chore:`, `test:`, `perf:`). Małe, atomowe.
- **Nie dodawaj zależności** bez uzasadnienia w `docs/DECISIONS.md` (co, dlaczego, alternatywy, koszt w KB).
- **Zero hardcodowanych tekstów UI w komponentach** — wszystkie stringi przez `src/i18n/` (PL + EN).
- **Zero magicznych wartości** — kolory, odstępy, promienie, czasy animacji tylko z tokenów (`src/styles/tokens.css`).
- Treść (projekty, doświadczenie) **tylko w `src/content/`**, nigdy w komponentach.
- Komponent > 150 linii → podziel. Logika > 20 linii w `.astro` → przenieś do `src/lib/`.
- Domyślnie **zero JS po stronie klienta**. Wyspa (`client:*`) tylko gdy niezbędna interakcja; preferuj `client:visible` / `client:idle`.
- Każda animacja respektuje `prefers-reduced-motion`.
- Każdy obraz przez `astro:assets` (`<Image>` / `<Picture>`), z `alt` (lub `alt=""` gdy dekoracyjny).
- Polskie znaki: fonty muszą mieć subset **latin-ext**.
- Nie commituj sekretów. Zmienne środowiskowe opisane w `.env.example` i walidowane schematem (`astro:env`).
- Gdy czegoś brakuje w treści (zdjęcia, opisy) — użyj wyraźnego placeholdera `TODO(content): ...`, nie wymyślaj faktów o właścicielu.

## Komendy
```
pnpm dev          # serwer dev
pnpm build        # build produkcyjny
pnpm preview      # podgląd builda
pnpm check        # astro check (typy)
pnpm lint         # eslint + prettier --check
pnpm format       # prettier --write
pnpm test         # vitest
pnpm test:e2e     # playwright (+ axe)
pnpm lhci         # lighthouse CI lokalnie
```

## Definition of Done (każda zmiana)
- [ ] Typy i lint czyste, testy zielone, build przechodzi
- [ ] Działa w dark i light, PL i EN, 360px → 1920px
- [ ] Nawigacja klawiaturą + widoczny focus
- [ ] Brak regresji budżetów wydajności
- [ ] Zaktualizowany `docs/PROGRESS.md` (co zrobione, co dalej)
