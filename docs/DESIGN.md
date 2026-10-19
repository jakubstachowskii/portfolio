# DESIGN.md: design system „Premiera”

Źródło prawdy dla całego UI (PLAN §6.0, krok 3). Każda wartość w `src/styles/tokens.css` musi mieć tu odpowiednik, a każda decyzja wizualna w kodzie musi z tego pliku wynikać. Zaakceptowany przez Piotra 2026-10-19 (kierunek **D v3.1**, nagłówki Funnel Display). Szkic referencyjny: `docs/style-research/sketches/kierunek-d3.html` (+ `d3-motion.webm`).

---

## 1. Nastrój

Portfolio programisty sprzedane tak, jak Apple sprzedaje produkty: każdy projekt dostaje własną scenę, ogromną nazwę i rzeczowe fakty, a wokół jest dużo czerni i ciszy. Charakter jest wyraźnie developerski: zrzuty w oknach aplikacji, paleta poleceń jako wizytówka, dane techniczne w monospace i powierzchnie, które wyglądają jak dobrze zrobione klawisze. Jeden ciepły, bursztynowy akcent działa jak dioda statusu: mówi „tu jest coś ważnego”, a nigdy nie dekoruje.

---

## 2. Inspiracja i różnice

Research: `docs/style-research/` (17 stylów w `SCORING.md`, pełny katalog Refero 1342 stylów, kierunki A–D w `KIERUNKI.md`). Bierzemy **zasady, nie zasoby**: żadnych logotypów, zdjęć, ilustracji, tekstów, fontów komercyjnych ani odtworzonych 1:1 sekcji.

| Źródło (Refero)                                                                                                                                                                     | Bierzemy (zasada)                                                                                                     | Nasza decyzja (różnica)                                                                                                     | Powód                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| [Apple iPhone 18 Pro](https://styles.refero.design/style/40be36d7-7fe6-4451-9f2d-7ceccfd43be8), [Apple ES](https://styles.refero.design/style/da7e5084-9e5d-4eb2-bb10-4c2d7733a56e) | Jedna rzecz na scenę, nagłówek jako bohater, sztywny rytm odstępów, fakty jako osobny rzeczowy element, sceny i pasma | Bohaterem jest **zrzut aplikacji w oknie**, nie render sprzętu. Fakty to **pasek w każdej scenie**, nie strona „Tech Specs” | Sprzedajemy oprogramowanie. Pasek faktów od razu wiadomo, czego dotyczy |
| Apple                                                                                                                                                                               | Niebieski `#0071e3` jako jedyny kolor akcji                                                                           | **Bursztyn** `#f5b23d` (dark) / czarne CTA (light)                                                                          | Własny, ciepły akcent „diody”                                           |
| Apple                                                                                                                                                                               | SF Pro (licencja tylko dla Apple), promienie 28px                                                                     | **Funnel Display + Funnel Sans + Geist Mono** (OFL, latin-ext), promienie **10 / 18 / 26**                                  | Licencja, polskie znaki, hierarchia kształtów                           |
| [Raycast](https://styles.refero.design/style/3b6a17f0-3bdf-418c-a95e-0b89e5a8b2f8)                                                                                                  | Powierzchnie „klawisza”, produkt = paleta poleceń, szklana pływająca nawigacja                                        | Własny stos `--key`; **paleta ⌘K jako podgląd w hero** z naszymi projektami i akcjami; pigułka nav 960px                    | ⌘K to sygnatura strony (PLAN §2.1). Bez ich koralu i gradientowego hero |
| [Convex](https://styles.refero.design/style/f71e92b0-d7a5-4203-b975-394f185218c2), [Factory](https://styles.refero.design/style/13d6fc89-eba2-4724-ac37-20f4f2e5efec)               | Zrzut produktu w oknie aplikacji, akcent jako sygnał statusu                                                          | Okno z paskiem tytułu w mono (nazwa projektu), dark-first z pełnym light                                                    | Charakter „narzędzia”                                                   |
| [Resend](https://styles.refero.design/style/0d914ef0-fa84-4c60-a9aa-cef0b5eb6e5d)                                                                                                   | Kolor jako „składnia”: akcent tylko w danych, identyfikatorach i statusach                                            | Bursztyn tylko w: CTA, statusie, kickerach, wybranym wyniku palety, linkach „Zobacz case study”, focus ringu                | Dyscyplina koloru = premium. Bez ich WebGL-owego hero                   |
| [Dovetail](https://styles.refero.design/style/108e2695-6970-47d5-b5b0-eea8fc34e048)                                                                                                 | Siatka tła jako struktura, głębia przez luminancję                                                                    | Siatka **widoczna tylko w snopie światła** za oknem projektu                                                                | Nasz element sygnaturowy (PLAN §2.4)                                    |
| Brak w źródłach                                                                                                                                                                     | —                                                                                                                     | **Snop światła + siatka w świetle**, „premiera” sceny przy przewijaniu, snop podążający za kursorem                         | Element, którego nie ma żadne źródło                                    |

**Minimum 3 udokumentowane zmiany (§6.0 p. 3):** ✅ inny akcent (bursztyn), ✅ inne fonty (Funnel/Geist Mono zamiast SF Pro, Inter, GT Walsheim, Domaine), ✅ własny element sygnaturowy (snop + siatka w świetle + premiera sceny), ✅ inne promienie i układ (pasek faktów, paleta w hero). Test „podróbki”: §11.

---

## 3. Kolory

Wszystkie wartości w **OKLCH** (hex dla wygody przeglądu). Tryb **ciemny jest domyślny**: jasny włącza się tylko przy zapisanej preferencji `light` albo `prefers-color-scheme: light`.

### 3.1 Role i wartości

| Token                            | Rola                                                             | Dark                               | Light                              |
| -------------------------------- | ---------------------------------------------------------------- | ---------------------------------- | ---------------------------------- |
| `--color-canvas`                 | Tło strony, scena projektu                                       | `oklch(0 0 0)` `#000000`           | `oklch(1 0 0)` `#ffffff`           |
| `--color-band`                   | Pasmo / tło podniesione (status, hover wierszy, sekcje „O mnie”) | `oklch(0.176 0.004 229)` `#0f1112` | `oklch(0.97 0.002 248)` `#f4f5f6`  |
| `--color-surface`                | Karty, przyciski drugorzędne, `Kbd`                              | `oklch(0.211 0.006 237)` `#16191b` | `oklch(1 0 0)` `#ffffff`           |
| `--color-window`                 | Wnętrze okna projektu i palety                                   | `oklch(0.157 0.004 229)` `#0b0d0e` | `oklch(0.978 0.001 197)` `#f7f8f8` |
| `--color-line`                   | Linie dekoracyjne 1px (separatory, obramowania kart)             | `oklch(0.277 0.009 234)` `#24292c` | `oklch(0.923 0.004 237)` `#e3e6e8` |
| `--color-line-strong`            | Hover obramowań, kropki okna                                     | `oklch(0.373 0.013 229)` `#3a4246` | `oklch(0.849 0.008 242)` `#c9ced2` |
| `--color-line-control`           | Obramowania pól formularza (WCAG 1.4.11)                         | `oklch(0.498 0.012 229)` `#5c6468` | `oklch(0.637 0.008 242)` `#878c90` |
| `--color-fg`                     | Tekst główny, nagłówki                                           | `oklch(0.97 0.002 248)` `#f4f5f6`  | `oklch(0.189 0.006 237)` `#111416` |
| `--color-muted`                  | Tekst drugorzędny, opisy                                         | `oklch(0.710 0.013 237)` `#9aa3a9` | `oklch(0.481 0.015 245)` `#575f66` |
| `--color-dim`                    | Etykiety, metadane, podpowiedzi                                  | `oklch(0.611 0.014 237)` `#7c858b` | `oklch(0.536 0.016 241)` `#666f76` |
| `--color-accent`                 | Bursztyn UI: kropki statusu, focus ring, wskaźniki               | `oklch(0.807 0.148 77)` `#f5b23d`  | `oklch(0.625 0.133 73)` `#b77900`  |
| `--color-accent-text`            | Bursztyn jako tekst (kickery, linki akcji)                       | `oklch(0.807 0.148 77)` `#f5b23d`  | `oklch(0.508 0.108 73)` `#8a5a00`  |
| `--color-cta` / `--color-on-cta` | Główne CTA (jedno na widok)                                      | `#f5b23d` / `#111416`              | `#111416` / `#ffffff`              |
| `--color-spot`                   | Snop światła (radial)                                            | `#f5b23d` @ 24%                    | `#b77900` @ 13%                    |
| `--color-grid`                   | Siatka w świetle                                                 | `#f5b23d` @ 32%                    | `#8a5a00` @ 22%                    |
| `--color-row-active`             | Wybrany wiersz palety                                            | `#f5b23d` @ 10%                    | `#b77900` @ 10%                    |
| `--color-success`                | Stan powodzenia (toast, formularz)                               | `oklch(0.751 0.142 158)` `#4fc98b` | `oklch(0.513 0.119 153)` `#1d7a45` |
| `--color-danger`                 | Stan błędu (toast, walidacja)                                    | `oklch(0.743 0.156 26)` `#ff8077`  | `oklch(0.544 0.178 28)` `#c2362d`  |

### 3.2 Zmierzone kontrasty (WCAG 2.x)

Pełna tabela: **[`docs/DESIGN-TOKENS.md`](DESIGN-TOKENS.md)** (generowana: `pnpm tokens:report`). Te same 21 par w obu motywach sprawdza test `tests/unit/color.test.ts`, więc regresja kontrastu wywala `pnpm test`.

Pary i wymagania: `fg`, `muted` na canvas/band/surface; `dim` na canvas/band/window/surface; `accent-text`, `success`, `danger` na canvas/band; `on-cta` na cta (wszystkie ≥ 4.5:1); `accent` (focus, kropki) i `line-control` na canvas/band (≥ 3:1). Najniższe wartości: `dim / band` 5.03 (dark) i 4.71 (light), `line-control / band` 3.14 / 3.12.

`--color-line` i `--color-line-strong` są **wyłącznie dekoracyjne** (separatory i obramowania kart, które nie identyfikują kontrolki), więc nie podlegają 3:1. Kontrolki formularzy używają `--color-line-control`.

**Zmiany po audycie Fazy 1b:** `dim` dark `#767f85` → `#7c858b` (axe: 4.32:1 na `surface`); odcienie niemal neutralnych tokenów poprawione (hue 0 → 248/197, bo przy hue 0 biel była różowawa).

### 3.3 Zasady koloru („kolor jako składnia”)

- Strona jest w ~98% achromatyczna. Bursztyn pojawia się tylko w: głównym CTA, kropce statusu, kickerach (`web · single-page`), wybranym wyniku palety, linkach akcji („Zobacz case study”), focus ringu, snopie i siatce.
- **Jedno wypełnione CTA na widok.** Reszta to przyciski drugorzędne (surface + klawisz) albo linki.
- Bursztyn nigdy nie jest tłem dużych powierzchni ani kolorem akapitów.
- W jasnym trybie bursztyn jako tekst ma zawsze wartość `accent-text` (`#8a5a00`), nigdy `#b77900`.

---

## 4. Typografia

### 4.1 Kroje (wszystkie OFL-1.1, latin-ext, variable)

| Rola                                                                    | Krój               | Wagi     | Ładowanie            |
| ----------------------------------------------------------------------- | ------------------ | -------- | -------------------- |
| Display: H1, nazwy projektów, nagłówki sekcji                           | **Funnel Display** | 500, 600 | `preload` (LCP)      |
| Tekst i UI: akapity, nawigacja, przyciski, paleta                       | **Funnel Sans**    | 400, 500 | `preload`            |
| Dane techniczne: fakty, kickery, `Kbd`, kod inline, okna, linia statusu | **Geist Mono**     | 400, 500 | bez preload (`swap`) |

Ładowanie przez **Astro Fonts API** (`fontProviders.fontsource()`, `subsets: ['latin', 'latin-ext']`, DECISIONS #6). Fallback z `size-adjust` ogranicza CLS. Kod w case studies (Expressive Code) też w Geist Mono.

### 4.2 Skala

| Token                           | Krój / waga        | Rozmiar                      | Interlinia | Tracking |
| ------------------------------- | ------------------ | ---------------------------- | ---------- | -------- |
| `display` (H1 hero)             | Funnel Display 600 | `clamp(40px, 10.5vw, 112px)` | 0.98       | −0.045em |
| `h2` (nazwa projektu na scenie) | Funnel Display 600 | `clamp(38px, 5.2vw, 60px)`   | 1.02       | −0.035em |
| `h3` (nagłówek sekcji)          | Funnel Display 600 | 34px                         | 1.1        | −0.025em |
| `lead` (zdanie wartości)        | Funnel Sans 400    | `clamp(20px, 2.2vw, 26px)`   | 1.35       | −0.01em  |
| `body`                          | Funnel Sans 400    | 17px                         | 1.5        | 0        |
| `body-lg` (opis projektu)       | Funnel Sans 400    | 19px                         | 1.5        | 0        |
| `ui` (nav, przyciski)           | Funnel Sans 500    | 14–16px                      | 1.4        | 0        |
| `caption` (`dt`, grupy palety)  | Funnel Sans 400    | 13px                         | 1.4        | 0        |
| `mono` (fakty, kicker, status)  | Geist Mono 400     | 13–14px                      | 1.4        | 0        |
| `mono-sm` (`Kbd`, pasek okna)   | Geist Mono 400/500 | 11–12px                      | 1.3        | 0        |

### 4.3 Zasady

- Nagłówki: `text-wrap: balance`. Akapity: `text-wrap: pretty`, maksymalnie **68ch** (case study) albo 34ch (opisy na scenach).
- **Bez wersalików jako etykiet** i bez trackingu „pieczątek”. Kickery w mono, małe litery.
- Ciasny tracking tylko w skali display (od 34px w górę). Tekst zostaje w trackingu 0.
- Pogrubienia przez wagę 600 w display; w treści maksymalnie 500.

---

## 5. Odstępy, siatka i rytm

### 5.1 Skala 8pt: jedyne dozwolone odstępy

| Token   | `--space-1` | `--space-2` | `--space-3` | `--space-4` | `--space-6` | `--space-8` | `--space-12` | `--space-16` |
| ------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ------------ | ------------ |
| Wartość | 8px         | 16px        | 24px        | 32px        | 48px        | 64px        | 96px         | 128px        |

Wyjątek: 4px dozwolone wyłącznie wewnątrz mikrokomponentów (`Kbd`, odstęp `dt`→`dd`) jako `--space-0_5`.

### 5.2 Rytm (stały na całej stronie)

- **Scena projektu:** `padding-block: 96 / 128`. **Pasmo:** `96 / 96`. **Hero:** `128 / 64` (mobile `96 / 48`).
- Nagłówek → treść: zawsze `24`. Okno → podpis: `48`. Podpis → pasek faktów: `32`.
- Między przyciskami: `16`. Wewnątrz kart: `24`.

### 5.3 Kontener i siatka

- Kontener: **1120px** treści, gutter **16px** (< 768) / **24px** (768–1279) / **32px** (≥ 1280).
- Okno projektu, podpis i pasek faktów: **960px**, wyśrodkowane.
- Desktop: siatka 12 kolumn dla listy projektów (kafle). Pasek faktów: 4 kolumny → 2 na mobile.
- Paleta w hero: 640px.

---

## 6. Kształty i głębia

### 6.1 Promienie

| Token           | Wartość | Użycie                                                 |
| --------------- | ------- | ------------------------------------------------------ |
| `--radius-xs`   | 8px     | Ikony w palecie, paski w katalogu                      |
| `--radius-sm`   | 10px    | `Kbd`, ikony w palecie (8px), tagi, focus ring, inputy |
| `--radius-md`   | 18px    | Paleta, karty listy projektów, toasty                  |
| `--radius-lg`   | 26px    | Okna projektów, duże panele                            |
| `--radius-pill` | 999px   | Przyciski, nawigacja, status                           |

### 6.2 Głębia

- **Podstawa: luminancja powierzchni.** Kolejność canvas → window → band → surface. Separacja przez linie 1px.
- **Powierzchnia „klawisza”** (`--shadow-key`) na: `Kbd`, przyciskach drugorzędnych, nawigacji, statusie, oknach i palecie.
  - Dark: `inset 0 1px 0 rgb(255 255 255 / .07), inset 0 -1px 0 rgb(0 0 0 / .6), 0 0 0 1px rgb(255 255 255 / .03)`
  - Light: `inset 0 1px 0 #fff, inset 0 -1px 0 rgb(17 20 22 / .08), 0 1px 2px rgb(17 20 22 / .06)`
  - `:active`: `--shadow-key-pressed` (wciśnięcie).
- **Cień sceny** (`--shadow-stage`), tylko okna i paleta: dark `0 60px 120px -50px rgb(0 0 0 / .9)`, light `0 40px 80px -48px rgb(17 20 22 / .35)`.
- **Szkło** tylko na nawigacji: `backdrop-filter: saturate(1.6) blur(18px)` na `--color-glass` (dark `rgb(14 16 17 / .62)`, light `rgb(255 255 255 / .7)`).

---

## 7. Ruch

### 7.1 Tokeny

| Token                                                      | Wartość                                                            |
| ---------------------------------------------------------- | ------------------------------------------------------------------ |
| `--ease-out`                                               | `cubic-bezier(0.22, 1, 0.36, 1)`                                   |
| `--ease-spring`                                            | `cubic-bezier(0.34, 1.4, 0.64, 1)` (tylko hover przycisków)        |
| `--duration-fast` / `-base` / `-slow` / `-hero` / `-pulse` | 160 / 240 / 700 / 1100 / 2400 ms (pulse: kropka statusu, skeleton) |
| `--stage-perspective` / `--stage-tilt`                     | 1600px / 22° (premiera sceny)                                      |
| Motion (wyspy React)                                       | `spring { stiffness: 400, damping: 30 }`                           |

### 7.2 Trzy momenty („efektownie, ale bez przesady”)

1. **Wejście hero (raz, przy ładowaniu):** wiersze H1 wyjeżdżają spod maski (`translateY 105% → 0`, blur 10px → 0, stagger 90ms). Potem lead (+350ms), CTA (+480ms), nawigacja (+600ms). Paleta wjeżdża (+650ms), zapytanie „wpisuje się” (+1.5s), wyniki dochodzą kaskadą co 80ms, a pierwszy zapala się bursztynem (+2.4s).
2. **Premiera sceny (przy przewijaniu, CSS `animation-timeline: view()`):** okno `translateY 96 → 0`, `rotateX 22° → 0`, `scale .9 → 1`, jasność 0.5 → 1, w zakresie `entry 0% → cover 42%`. Snop i siatka „zapalają się” (`opacity 0 → 1`, `scale .6 → 1`) na timeline sceny. Podpis i pasek faktów: fade-up.
3. **Snop za kursorem (desktop, `pointer: fine`):** ~15 linii vanilla TS (rAF + lerp 0.08), ustawia `--mx/--my` na scenie.

**Mikro:** przyciski `translateY(-2px)` sprężyście; CTA dostaje poświatę `0 0 0 6px spot`; link akcji wydłuża kreskę 20 → 36px; kropka statusu pulsuje (`ping` 2.4s); hover wierszy palety i okna to zmiana koloru (`--duration-fast`).

### 7.3 Reguły

- Wszystko w `@media (prefers-reduced-motion: no-preference)`. Przy `reduce` treść jest **w pełni widoczna statycznie** (zweryfikowane zrzutami szkicu).
- Scroll-driven w `@supports (animation-timeline: view())`. Bez wsparcia (Firefox, starsze Safari) sceny są po prostu statyczne.
- Animujemy tylko `transform`, `opacity`, `filter`. Nigdy layoutu.
- **Pułapka:** scena ma `overflow: clip`, **nie** `hidden`. `hidden` tworzy kontener przewijania i `view()` przestaje działać (wykryte w szkicu).
- Maksymalnie jeden efekt hover na element. Bez parallaxu, bez fade-in na każdej sekcji tekstowej.
- View Transitions (lista → case study): okno projektu „przelatuje” w nagłówek case study (`view-transition-name: project-<slug>`), w Fazie 3.

---

## 8. Komponenty

Każdy interaktywny element ma 5 stanów: **default / hover / focus-visible / active / disabled**. Focus ring wszędzie: `2px solid --color-accent`, `outline-offset: 3px`, promień `--radius-sm`. Cel dotyku ≥ 24×24px (przyciski 44px).

| Komponent                   | Warianty                                                                                         | Anatomia i stany                                                                                                                                            |
| --------------------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Button`                    | `primary` (CTA, jeden na widok), `secondary` (surface + klawisz), `link` (`as="a"`) · `sm/md/lg` | Pigułka, padding 12/24, Funnel Sans 500 16px. Hover: −2px + (primary) poświata. Active: scale .98 + `key-pressed`. Disabled: opacity .5, bez hover          |
| `IconButton`                | `secondary`, `ghost`                                                                             | Zawsze `aria-label`. 44×44, pigułka                                                                                                                         |
| `Kbd`                       | `sm`, `md`                                                                                       | Geist Mono 11–12px, surface + `--shadow-key`, `--radius-sm`, min-width 24px. Skróty platformowe: `Ctrl K` / `⌘K`                                            |
| `NavPill`                   | —                                                                                                | Sticky `top: 16`, max 960px, szkło + klawisz. Mobile: monogram + `Kbd` + status (kropka). Menu mobilne = dialog pełnoekranowy (focus trap, Esc)             |
| `StatusDot`                 | `open`, `busy`, `off`                                                                            | Kropka 8px w kolorze accent + `ping`; tekst w mono. Sterowany z `site.ts`                                                                                   |
| `Stage`                     | `default`, `flip` (podpis wyrównany do prawej)                                                   | Sekcja z warstwami `.light` + `.grid` + oknem. `overflow: clip`. `aria-labelledby` = nazwa projektu                                                         |
| `ProjectWindow`             | `browser`, `desktop`, `phone` (Faza 3)                                                           | Pasek 40px (3 kropki + nazwa w mono), wnętrze = `<Picture>` AVIF. `--radius-lg`, klawisz + cień sceny                                                       |
| `ProjectCaption`            | —                                                                                                | Kicker (mono, accent-text) → H2 (display) → opis (body-lg, muted, 34ch) → link akcji                                                                        |
| `ProjectFacts`              | 4 pola (Typ, Moja rola, Stack, Efekt)                                                            | `dl` w siatce 4 → 2 kolumny, linia 1px u góry; `dt` caption/dim, `dd` mono/fg. **Efekt tylko z prawdziwymi liczbami**, inaczej pole znika                   |
| `PalettePreview` (hero)     | —                                                                                                | Statyczny HTML (0 KB JS): pole z zapytaniem, wyniki (Projekty / Akcje), stopka z `Kbd`. Klik / `Ctrl K` otwiera prawdziwą paletę                            |
| `CommandPalette` (wyspa)    | —                                                                                                | `cmdk`, `client:idle`, dialog. Ten sam wygląd co podgląd. Strzałki, Enter, Esc, przywracanie fokusu                                                         |
| `ProjectCard` (lista)       | `featured`, `default`                                                                            | Okno-miniatura (`--radius-md`) + nazwa + kicker + tagi; hover: snop lokalny (maks. 1 efekt)                                                                 |
| `Tag`                       | `default`, `status` (`live` / `w budowie` / `archiwum`)                                          | Geist Mono 12px, `--radius-sm`, obramowanie line; status z kropką                                                                                           |
| `Link`                      | wewnętrzny, zewnętrzny (↗ + `rel`)                                                               | Podkreślenie na hover; zewnętrzny bez `target=_blank` domyślnie                                                                                             |
| `SectionHeading`            | —                                                                                                | H3 display 34px; opcjonalny kicker mono. **Numeracja tylko, gdy treść jest sekwencją** (np. oś czasu), więc nie `01 — Projekty` (zmiana względem PLAN §6.5) |
| `Toast`                     | `info`, `success`, `danger`                                                                      | Surface + klawisz, `--radius-md`, `aria-live="polite"`, auto-hide 4s, pauza na hover                                                                        |
| `Tooltip`                   | —                                                                                                | CSS-only, mono 12px, surface + klawisz                                                                                                                      |
| `ThemeToggle`, `LangSwitch` | —                                                                                                | `IconButton` / pigułka; LangSwitch prowadzi do odpowiednika strony                                                                                          |
| `Divider`                   | —                                                                                                | 1px `--color-line`                                                                                                                                          |
| `Skeleton`                  | —                                                                                                | `--color-band`, `--radius-sm`; shimmer tylko bez reduced-motion                                                                                             |

---

## 9. Obrazy i media

- **Bohater = zrzut aplikacji w `ProjectWindow`.** Źródła ≥ 2400px szerokości (CONTENT-CHECKLIST), czyste dane testowe, eksport AVIF + WebP przez `astro:assets`, obraz LCP ≤ 120 KB, `fetchpriority="high"` tylko dla pierwszego.
- Zrzuty muszą być spójne z trybem: preferowane wersje ciemne aplikacji na scenie dark (jeśli projekt ma jasny UI, to też jest OK, bo okno go „oprawia”).
- Wideo: pętla 10–20 s, bez dźwięku, `preload="none"`, poster, przycisk pauzy; reduced-motion → poster.
- Zdjęcie właściciela (`/o-mnie`): neutralne, bez filtrów; w ramce `--radius-lg`.
- Poufne projekty: zanonimizowane zrzuty + dopisek (`confidential`).
- Ikony: Lucide (stroke 1.5px) przez astro-icon; logotypy technologii: Simple Icons w odcieniu `--color-muted`.

---

## 10. Czego unikamy

- Gradientowych „mgieł” i dużych grafik w hero, WebGL na starcie, blur poza nawigacją.
- Drugiego koloru akcentu; bursztynu na dużych powierzchniach; kolorowych przycisków poza jednym CTA.
- Wersalików z trackingiem jako etykiet, numerowania sekcji, które nie są sekwencją, separatorów „ · ” w każdej linii metadanych (tylko w kickerach).
- Identycznych kart z tym samym cieniem w siatce (SaaS-kit), animacji wejścia na każdej sekcji, efektów hover na wszystkim.
- Pasków umiejętności w procentach, karuzel, wymyślonych metryk.
- Kopiowania czegokolwiek ze źródeł: sześcianu Resenda, gradientowych pasów Raycasta, trójkąta Vercela, renderów Apple.

---

## 11. Test „podróbki” (PLAN §6.0 p. 6)

Porównanie zrzutu szkicu (`sketches/d3-dark-desktop.png`) ze stronami źródłowymi (`style-research/screens/`, lokalnie). Wynik: `docs/style-research/PODROBKA.md`. Test powtarzamy na prawdziwej stronie głównej po Fazie 2.

---

## 12. Mapowanie na `tokens.css` (stan po Fazie 1b)

- **Tokeny stałe** w `@theme` (`src/styles/tokens.css`): `--spacing: 8px` (utility `p-1`=8 … `p-16`=128, `p-0.5`=4), `--container-content/stage/palette` (`max-w-*`), `--radius-xs/sm/md/lg/pill` (`rounded-*`), `--text-*` z `--line-height` i `--letter-spacing` (`text-display`, `text-h2` …), `--ease-out/spring`. Domyślne przestrzenie Tailwinda są wyczyszczone (`--color-*: initial` itd.), więc poza tokenami nie ma żadnych wartości.
- **Tokeny motywu**: surowe `--c-*` / `--sh-*` w blokach `:root, [data-theme='dark']`, `[data-theme='light']` i `@media (prefers-color-scheme: light) :root:not([data-theme])` (bez JS). Mapowane przez `@theme inline` na `--color-*` / `--shadow-*`, więc `bg-canvas`, `text-muted`, `shadow-key` przełączają się też w zagnieżdżonych panelach.
- **Poza przestrzeniami Tailwinda** (`:root`): `--duration-*`, `--size-nav/window-bar/target/dot`, `--measure-prose/caption`, `--stage-perspective/tilt`, `--toggle-sun/moon` (ikona przełącznika z najbliższego motywu).
- **Fonty**: `--font-funnel-display`, `--font-funnel-sans`, `--font-geist-mono` tworzy Astro Fonts API, a `@theme inline` mapuje je na `font-display` / `font-sans` / `font-mono`.
- **Stany**: warianty `is-hover:`, `is-active:`, `is-disabled:` (`src/styles/global.css`) = prawdziwy stan albo `data-state` (tylko katalog `/design`). Focus: `:focus-visible, [data-state=focus]`.
- **Strażnik**: `tests/unit/no-magic-values.test.ts` wywala test, gdy w komponentach lub layoutach pojawi się hex, funkcja koloru, arbitrary value Tailwinda z liczbą, surowy czas w ms albo wymiar w px (poza 1px linią).
