# KIERUNKI.md: top 3 (PLAN §6.0, krok 2)

Szkice: `sketches/kierunki.html?d=a|b|c&t=light|dark` (statyczny HTML, poza kodem produkcyjnym) i zrzuty `sketches/{a,b,c}-{light,dark}.png` (1280×800). Treść szkiców to wyłącznie `TODO(content)` i przykłady z PLAN §5.1.

Wspólne dla wszystkich trzech: sygnatury z §2 (⌘K, linia terminala, TOC w case study, View Transitions, status), fonty OFL z latin-ext, kontrasty ≥ AA (zmierzone niżej), zero cudzych zasobów.

---

## A · „Notatnik warsztatowy” (inspiracja: [Convex](convex.md), 90 pkt)

Zrzuty: [jasny](sketches/a-light.png) · [ciemny](sketches/a-dark.png) · źródło: `screens/convex.jpg`

**Bierzemy:** ideę zrzutów produktu jako „wklejek” w notatniku inżyniera, płaską głębię (bez cieni, separacja kolorem i linią 1px), kompaktowe komponenty i dwa równorzędne tryby z tych samych ról kolorów.

**Zmieniamy:**

| Źródło                        | Nasza decyzja                                                                                                                   | Powód                                                                                                                        |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Kremowe tło `#f6f6f6`, ciepłe | Chłodny papier kreślarski `#eef1f3` w **kropki co 20px** + pionowa linia marginesu                                              | Ucieczka od „cream + serif” (dziś szablonowe) i nasz element sygnaturowy                                                     |
| Akcenty plum / ember / blue   | **Marker zakreślacza** `#f2d649` wyłącznie jako tło pod ciemnym tekstem (11.4:1) + atramentowy niebieski link `#1f4b99` (7.3:1) | Własny akcent, który „podkreśla fakty” jak w notatkach; marker nigdy nie jest samodzielnym wskaźnikiem UI (1.28:1 wobec tła) |
| GT America (komercyjny)       | **Geist** + **JetBrains Mono** (OFL, latin-ext)                                                                                 | Licencja i polskie znaki                                                                                                     |
| Promienie 8 / 12px            | 4 / 6px                                                                                                                         | Bardziej „techniczne”, mniej SaaS                                                                                            |
| Brak                          | Podpisy zrzutów jak ryciny: „Rys. 1 · web, single-page”                                                                         | Case studies jak dokumentacja (§2.3)                                                                                         |

**Ryzyko:** najbezpieczniejszy z trzech, a przez to mniej odważny. Wyróżnik stoi na kropkach i markerze.

---

## B · „Instrukcja techniczna / cyjanotypia” (inspiracja: [Zed](zed.md), 90 pkt)

Zrzuty: [jasny](sketches/b-light.png) · [ciemny](sketches/b-dark.png) · źródło: `screens/zed.jpg`

**Bierzemy:** lekki szeryf w nagłówkach + spokojny sans w treści (najlepsza czytelność długich case studies), papier milimetrowy jako tło, ostre 2px narożniki, etykiety skrótów klawiszowych w przyciskach (pasuje do ⌘K).

**Zmieniamy:**

| Źródło                                | Nasza decyzja                                                                                          | Powód                                                                                                                        |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| Fiolet-niebieski `#1348dc` jako marka | **Czerwony ołówek korektora** `#b4232c` (6.4:1) jako akcent, w trybie ciemnym `#ffb4a8` (8.6:1)        | Własny akcent: „adnotacje na marginesie instrukcji”                                                                          |
| Tylko tryb jasny                      | **Tryb ciemny = cyjanotypia** (blueprint): tło `#0e2a47`, białe linie siatki, tekst `#eaf2fb` (12.9:1) | Nasz element sygnaturowy, którego źródło nie ma. Ciemny tryb nie jest odwróconym jasnym, tylko „odbitką” tego samego rysunku |
| Plex Serif 340 + Writer + Zed Mono    | **Source Serif 4** (300) + **Geist** + **Geist Mono** (OFL, latin-ext)                                 | Inne fonty, licencja i polskie znaki                                                                                         |
| Wyśrodkowane hero                     | Hero wyrównane do lewej, ze **spisem treści** po lewej (sticky, z aktywną pozycją)                     | Sygnatura TOC z §2.3 od pierwszego ekranu                                                                                    |
| Karty cech                            | Karta projektu jako **arkusz specyfikacji** (`dl`: typ, rola, rok, stack)                              | Rekruter widzi metadane bez wchodzenia w case study                                                                          |

**Ryzyko:** szeryf + cyjanotypia to najbardziej charakterystyczny kierunek, ale tryb ciemny wymaga starannego dobrania kolorów zrzutów (niebieskie tło zmienia ich odbiór).

---

## C · „Stół świetlny / bursztyn” (inspiracja: [Dovetail](dovetail.md), 84 pkt)

Zrzuty: [ciemny](sketches/c-dark.png) · [jasny](sketches/c-light.png) · źródło: `screens/dovetail.jpg`

**Bierzemy:** dark-first, siatkę tła jako strukturę, głębię przez luminancję powierzchni (bez cieni), nawigację z pigułek i para przycisków: główny + ghost.

**Zmieniamy:**

| Źródło                      | Nasza decyzja                                                                                                             | Powód                                                                         |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Miękkie indygo `#6798ff`    | **Bursztyn fosforu CRT** `#f5b23d` (10:1 na tle), w trybie jasnym `#8a5a00` dla tekstu (5.6:1) i `#b77900` dla UI (3.4:1) | Własny akcent, ciepły, nawiązuje do terminala. Unika „czerń + kwasowa zieleń” |
| Inter + JetBrains Mono      | **Geist** + **IBM Plex Mono** (OFL, latin-ext)                                                                            | Oba fonty inne niż w źródle (źródło = nasza dawna hipoteza)                   |
| Tylko tryb ciemny           | **Tryb jasny = stół świetlny**: `#f7f8f8`, siatka `#e8ecee`, te same role                                                 | Drugi tryb projektujemy sami (§6.0 p. 4)                                      |
| Statyczna siatka            | Siatka z **delikatnym „spotlightem” bursztynu** (desktop, bez reduced-motion)                                             | Sygnatura §2.4                                                                |
| Rzędy KPI z dużymi liczbami | Karta projektu w siatce komórek z wierszem metadanych w mono, metryki tylko gdy są prawdziwe                              | Unikamy „dużej liczby z małym podpisem” bez danych                            |

**Ryzyko:** najbliżej typowego „dark devtool” estetycznie. Rozpoznawalność zależy od bursztynu i siatki.

---

## Rekomendacja

**B (cyjanotypia)** jako pierwszy wybór. Najlepiej czyta się w niej długie case studies, wnosi najmocniejszy własny element (tryb ciemny jako blueprint), a test „podróbki” wobec Zed przechodzi bez trudu (inny akcent, fonty, układ z TOC i zupełnie inny tryb ciemny). Druga w kolejności jest **A**, jako bezpieczna i dwutrybowa.

Decyzja należy do Piotra. Po wyborze powstaje `docs/DESIGN.md` (krok 3) z sekcją „Inspiracja i różnice” na bazie powyższej tabeli.
