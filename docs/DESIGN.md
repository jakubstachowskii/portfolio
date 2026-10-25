# DESIGN.md: kierunek „wzorzec 1:1”

Źródło prawdy wyglądu: **`docs/design-reference.html`** (zatwierdzony przez Jakuba 2026-10-23), wariant `heroArt = warstwy` (talia kart) i akcent `mint`. Specyfikacja zadania: `docs/PROMPT-dla-Claude-Code.md`. Ten plik opisuje, jak wzorzec jest przeniesiony do kodu. Każda decyzja wizualna ma wynikać ze wzorca, a odstępstwa są wpisane do `docs/DECISIONS.md`.

Poprzedni kierunek („Premiera”, D v3.1, fazy 1a–1b) został zastąpiony (DECISIONS #25).

## 1. Kolory (`src/styles/tokens.css`)

Wartości 1:1 z `.t-dark` / `.t-light` wzorca oraz palety `mint`. Ciemny motyw jest domyślny.

| Rola         | Ciemny    | Jasny      | Użycie                                |
| ------------ | --------- | ---------- | ------------------------------------- |
| `--bg`       | `#0d0e10` | `#f1efe9`  | tło strony                            |
| `--bg2`      | `#111316` | `#e9e6de`  | tło sekcji naprzemiennych             |
| `--surface`  | `#15171a` | `#fbfaf7`  | karty, kafle                          |
| `--surface2` | `#1c1f23` | `#f4f2ec`  | wnętrza kart, tagi                    |
| `--line`     | `#2a2e33` | `#d9d5cc`  | linie, obramowania                    |
| `--line2`    | `#3a3f45` | `#c4bfb3`  | obramowania kontrolek (dekoracyjne)   |
| `--text`     | `#eceae4` | `#141414`  | tekst główny                          |
| `--text2`    | `#9a9ca1` | `#5f5d58`  | tekst drugorzędny, mono-etykiety      |
| `--text3`    | `#c9c7c1` | `#33322f`  | akapity                               |
| `--acc`      | `#3ee6c1` | `#3ee6c1`  | wypełnienia akcentu (przyciski, pasy) |
| `--acc-ink`  | `#0d0e10` | `#141414`  | tekst na akcencie                     |
| `--acc-text` | `#5ff0d0` | `#06725d`* | tekst w kolorze akcentu               |
| `--hue1–5`   | szkice    | szkice     | tylko szkice projektów (Etap 3)       |

\* wzorzec ma `#0a7a65` (4.23:1 na `--bg2`), u nas `#06725d` (≥ 4.71:1 na każdym jasnym tle; DECISIONS #23).

Kontrast tekstu ≥ 4.5:1 na `bg`, `bg2`, `surface`, `surface2` w obu motywach pilnuje `tests/unit/color.test.ts`.

## 2. Typografia

- **Archivo** (variable, oś `wdth` 62–125%), klasa `.disp`: `font-stretch: 125%`, waga 800, wersaliki, `letter-spacing: -0.01em`. Nagłówki i logo.
- **Inter** 400–600: tekst, 16px / 1.55.
- **JetBrains Mono** 400–700, klasa `.mono`: nawigacja, etykiety, stopka, kod.
- Wszystkie przez Astro Fonts API (fontsource), podzbiory `latin` + `latin-ext`, preload tylko `latin` dla Archivo i Inter.

## 3. Układ

- Kontener `.wrap`: `max-width: 1200px`, boczne `24px`.
- Nawigacja: sticky, `min-height: 64px`, tło `--nav-bg` z `blur(14px)`, pasek postępu 2px (scroll-driven).
- `section[id]` ma `scroll-margin-top: 64px` (116px ≤ 900px, gdy linki schodzą do drugiego rzędu).
- Breakpointy wzorca: **1280** (kreski sekcji znikają), **900** (linki w drugim, przewijanym rzędzie), **520** (znika podpis pod logo).
- Geometria (px) przenoszona 1:1 ze wzorca, bez skali 8pt (DECISIONS #24).

## 4. Ruch

Krzywe i czasy wzorca są tokenami (`--ease-*`, `--t-*`). Zasady:

- przejście motywu `0.5s` na tle i kolorze;
- wejścia `.in` + `.d1–.d5`, odsłanianie `.reveal` / `.wipe` przez `animation-timeline: view()` (bez wsparcia: treść od razu widoczna);
- animacje w pętli pauzują poza ekranem (klasa `.off`, Etap 4);
- `prefers-reduced-motion: reduce` wyłącza wszystkie animacje i przejścia oraz pasek postępu.

## 5. Dostępność

- Focus: `outline: 2px solid var(--acc)`, `offset 3px`.
- Skip link „Przejdź do treści” → `#main`.
- Cele dotykowe przycisków i linków nawigacji ≥ 44px.
- Bez JS: motyw z `prefers-color-scheme`, wszystkie linki działają.

## 6. Komponenty (stan po Etapie 2)

| Komponent                 | Plik                                                                       |
| ------------------------- | -------------------------------------------------------------------------- |
| Nawigacja                 | `src/components/layout/Nav.astro`                                          |
| Linki nawigacji (`.nl`)   | `src/components/layout/NavLinks.astro`                                     |
| Przełącznik motywu        | `src/components/layout/ThemeToggle.astro`                                  |
| Kreski sekcji (`.dots`)   | `src/components/layout/SectionDots.astro`                                  |
| Stopka                    | `src/components/layout/Footer.astro`                                       |
| Klasy wspólne             | `src/styles/global.css`                                                    |
| Strona główna (składanie) | `src/components/home/HomePage.astro`                                       |
| Hero + talia kart         | `Hero`, `HeroDeck`, `DeckSketch`; `src/styles/deck.css`, `src/lib/deck.ts` |
| Taśma                     | `src/components/home/Tape.astro`                                           |
| Projekty                  | `Projects`, `ProjectIndex`, `ProjectPreview`, `ProjectMock` + `mocks/*`    |
| GitHub (szkielet)         | `src/components/home/GithubActivity.astro`                                 |
| O mnie                    | `About`, `AboutSteps`                                                      |
| Stack                     | `src/components/home/Stack.astro`                                          |
| Kontakt                   | `Contact`, `CopyEmail`                                                     |
