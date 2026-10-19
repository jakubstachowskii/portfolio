# KIERUNKI.md: kierunki A–D (PLAN §6.0, krok 2)

Szkice: `sketches/kierunki.html?d=a|b|c&t=light|dark` (statyczny HTML, poza kodem produkcyjnym) i zrzuty `sketches/{a,b,c}-{light,dark}.png` (1280×800). Treść szkiców to wyłącznie `TODO(content)` i przykłady z PLAN §5.1.

Wspólne dla wszystkich trzech: sygnatury z §2 (⌘K, linia terminala, TOC w case study, View Transitions, status), fonty OFL z latin-ext, kontrasty ≥ AA (zmierzone niżej), zero cudzych zasobów.

---

## A · „Notatnik warsztatowy” (inspiracja: [Convex](convex.md), 102 pkt)

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

## B · „Instrukcja techniczna / cyjanotypia” (inspiracja: [Zed](zed.md), 99 pkt)

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

## C · „Stół świetlny / bursztyn” (inspiracja: [Dovetail](dovetail.md), 96 pkt)

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

## D · „Premiera”: synteza (rekomendowana, v2 po uwagach Piotra)

Zrzuty: [ciemny](sketches/d-dark-desktop.png) · [jasny](sketches/d-light-desktop.png) · [mobile ciemny](sketches/d-dark-mobile.png) · [mobile jasny](sketches/d-light-mobile.png) · szkic: `sketches/kierunek-d.html?t=dark|light` · **wideo ruchu:** `sketches/d-motion.webm` · klatki: `sketches/d-motion-*.png`

**Uwagi Piotra (2026-10-19) → v2:** bursztyn zostaje; hero zostaje; **domyślnie ciemny**; typografia bardziej premium; snop i siatka bez zmian; kształty **odrobinę bardziej zaokrąglone** (bliżej Apple); animacje **efektowne, ale bez przesady**.

**Idea.** Portfolio programisty sprzedane tak, jak Apple sprzedaje produkty. Każdy wyróżniony projekt dostaje **własną scenę** na pełną szerokość, jak premiera produktu: ogromna nazwa, jedno zdanie efektu, zrzut aplikacji „oświetlony” na scenie, a pod spodem rzeczowa **specyfikacja techniczna**. Charakter developerski zostaje: okna aplikacji, mono w danych technicznych, linia terminala, ⌘K i status.

**Skąd co bierzemy (zasady, nie zasoby):**

| Źródło                                                          | Bierzemy                                                                                                                                                          |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Apple iPhone 18 Pro](apple-iphone.md), [Apple ES](apple-es.md) | Jedna rzecz na scenę, ogromna pusta przestrzeń, nagłówek jako bohater, sceny na zmianę z pasmami detali, specyfikacja jako osobny blok, **sztywny rytm odstępów** |
| [Convex](convex.md), [Factory](factory.md)                      | Projekt pokazany w oknie aplikacji (soft, nie sprzęt), Geist o ciasnym trackingu, akcent jako sygnał statusu                                                      |
| [Framer](framer.md)                                             | Siatka kafli projektów na liście, akcent na krawędziach (focus ring, stany aktywne)                                                                               |
| [Dovetail](dovetail.md) / nasz szkic C                          | Bursztyn jako jedyny akcent, siatka tła                                                                                                                           |

**Co zmieniamy względem źródeł (≥ 3, wymóg §6.0):**

| Źródło                             | Nasza decyzja                                                                                                                      | Powód                                                                                                                                                                                                                                             |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Apple: render sprzętu jako bohater | **Zrzut aplikacji w oknie** na scenie                                                                                              | Sprzedajemy oprogramowanie                                                                                                                                                                                                                        |
| Apple: niebieski `#0071e3`         | **Bursztyn** `#f5b23d` (CTA na ciemnym: 10:1 z ciemnym tekstem); w jasnym CTA czarne, bursztyn `#8a5a00` dla tekstu (5.6:1)        | Własny akcent, ciepły, „terminalowy”                                                                                                                                                                                                              |
| Apple: SF Pro (bez licencji web)   | **Funnel Display** (nagłówki) + **Funnel Sans** (treść, UI) + **Geist Mono** (dane techniczne); wszystkie OFL, latin-ext, variable | Licencja i polskie znaki. Funnel Display wygrał porównanie 9 krojów (Geist, Inter Tight, Host Grotesk, Onest, Schibsted, Mona Sans, Bricolage, Hanken) jako najbardziej „premium” w skali nagłówka; Funnel Sans z tej samej rodziny daje spójność |
| Apple: 28px na wszystkim           | Hierarchia **10 / 18 / 26px** + pigułki dla przycisków                                                                             | Bliżej Apple (uwaga Piotra), ale z hierarchią: małe elementy, karty, okna i sceny                                                                                                                                                                 |
| Brak w źródłach                    | **Snop światła + siatka widoczna tylko w świetle** za oknem projektu (CSS, 0 KB JS)                                                | Nasz element sygnaturowy: „oświetlamy pracę”, odpowiednik studyjnego oświetlenia produktu                                                                                                                                                         |
| Apple: specyfikacja sprzętu        | **Specyfikacja projektu**: typ, rola, stack, efekt (tylko prawdziwe liczby)                                                        | Rekruter widzi konkret w 5 sekund                                                                                                                                                                                                                 |

**Rytm (jak u Apple: wszędzie te same odstępy).** Jedna skala 8pt: `8 · 16 · 24 · 32 · 48 · 64 · 96 · 128`. Sekcja zawsze `128` (scena) lub `96` (pasmo), odstęp nagłówek→treść zawsze `24`, między przyciskami zawsze `16`. Żadnej innej wartości w CSS. To trafi do `tokens.css` jako jedyne dozwolone odstępy.

**Tryby.** **Domyślny: ciemny** (gdy brak zapisanej preferencji i systemowej preferencji jasnej). Ciemny = czarna scena `#000` + grafitowe pasma `#0f1112`. Jasny = biała scena + pasma `#f4f5f6`, jak białe galerie Apple. Te same role, ten sam rytm.

**Ruch (v2, „efektownie, ale bez przesady”).** Trzy świadome momenty, nic więcej:

1. **Wejście hero (raz, przy ładowaniu, ~1.1 s):** wiersze nazwiska wyjeżdżają spod maski z rozmyciem → ostrość (stagger 90 ms), potem fade-up linii wartości i CTA, a linia terminala „wpisuje się” znak po znaku z mrugającym kursorem.
2. **Premiera sceny (przy przewijaniu, CSS scroll-driven `view()`):** okno projektu wstaje z perspektywy (`rotateX 22° → 0`, `translateY 96 → 0`, przyciemnienie → pełna jasność), a snop światła i siatka „zapalają się” za nim. Podpis i specyfikacja dochodzą chwilę później.
3. **Snop za kursorem (desktop, ~15 linii JS, rAF + lerp):** światło miękko podąża za myszą po scenie.
   Mikro: przyciski unoszą się sprężyście o 2px, CTA dostaje bursztynową poświatę, link „Zobacz case study” wydłuża kreskę. Status „Otwarty na oferty” pulsuje.
   **Reguły:** `prefers-reduced-motion` wyłącza wszystko (pełna treść widoczna statycznie, zweryfikowane zrzutami); bez `animation-timeline` (Firefox, starsze Safari) sceny są po prostu statyczne; tylko `transform`/`opacity`/`filter` (kompozytor, bez reflow). **Pułapka:** scena musi mieć `overflow: clip`, nie `hidden`, bo `hidden` tworzy scroller i `view()` przestaje działać (znalezione i naprawione w szkicu).

**Wydajność.** Zero JS w scenach, gradienty i maska w CSS, LCP = nagłówek albo pierwszy zrzut (AVIF ≤ 120 KB). Mieści się w §11.

**Ryzyko.** Siła D stoi na **jakości zrzutów projektów**: scena bez dobrego zrzutu będzie pusta. Dlatego CONTENT-CHECKLIST (zrzuty ≥ 2400px, czyste dane) staje się krytyczny przed Fazą 3.

---

### D v3: „Premiera” + DNA Raycasta (na prośbę Piotra, 2026-10-19)

Zrzuty: [ciemny](sketches/d3-dark-desktop.png) · [jasny](sketches/d3-light-desktop.png) · [mobile ciemny](sketches/d3-dark-mobile.png) · [mobile jasny](sketches/d3-light-mobile.png) · [pierwszy ekran](sketches/d3-hero-dark.png) · wideo: `sketches/d3-motion.webm` · szkic: `sketches/kierunek-d3.html?t=dark|light`

Ocena Raycasta jako całej strony: **nie** (80/115; ciężkie hero z grafiką, tekst 3.82:1 poniżej AA, tylko dark, styl landing page, nie dokumentacji). Jako źródło elementów: **tak**, bo produktem Raycasta jest paleta poleceń, a u nas ⌘K to główna sygnatura (PLAN §2.1), a w planie jest projekt „Command Center”.

| Od Raycasta (zasada)                 | Nasza wersja                                                                                                                                                                                                                                                                                                                       | Czego nie bierzemy                                               |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Powierzchnie „klawisza” (key shadow) | Token `--key` (światło z góry, cień od dołu, pierścień 1px) na `Kbd`, przyciskach drugorzędnych, oknach projektów i palecie; `--key-pressed` dla `:active`                                                                                                                                                                         | Ich dokładnego stosu cieni i promieni 16–20px                    |
| Produkt = paleta poleceń             | **Paleta ⌘K jako bohater hero**: pod CTA „żywy” podgląd z wpisanym zapytaniem, wynikami (projekty + akcje) i podpowiedziami klawiszy. Sekwencja: paleta wjeżdża → zapytanie się wpisuje → wyniki dochodzą kaskadą → pierwszy wynik zapala się bursztynem. Zastępuje osobną linię terminala („teraz buduję” jest metadanymi wyniku) | Wyglądu ich okna i ikon rozszerzeń                               |
| Szklana pływająca nawigacja          | Pigułka z blur, max 960px, unosząca się 16px nad sceną; status „Otwarty na oferty” jako osobny klawisz                                                                                                                                                                                                                             | Ich gradientowego hero i koralowego `#ff6363` (zostaje bursztyn) |

**Uwaga do Fazy 2/8:** w szkicu paleta w hero jest statycznym podglądem. W produkcji to ten sam komponent co prawdziwa paleta: kliknięcie lub `Ctrl K` otwiera ją w dialogu (wyspa `client:idle`), a podgląd w hero renderuje się jako HTML bez JS.

**Do decyzji przy DESIGN.md:** paleta zaczyna się ok. 700px od góry, więc na laptopie 800px widać tylko pole wyszukiwania. To celowy „teaser”, który zachęca do przewinięcia. Alternatywa: mniejszy H1 (~88px) i cała paleta na pierwszym ekranie.

---

### D v3.1: szeryf à la Resend + fakty w scenie (2026-10-19)

Porównanie krojów nagłówka: [Funnel Display](sketches/font-funnel-hero.png) · [Instrument Serif](sketches/font-instrument-hero.png) · [Newsreader](sketches/font-newsreader-hero.png). Szkic: `kierunek-d3.html?h=funnel|instrument|newsreader` (domyślnie newsreader).

- **Nagłówki (H1, nazwy projektów): Newsreader 400** (OFL, latin-ext, variable z osią optyczną). Od [Resenda](resend.md) bierzemy zasadę „szeryf na czerni = premium dla devów”, nie ich krój (Domaine, komercyjny).
  - Funnel Display odpada: mocny, ale „technologiczny”; premium daje dopiero kontrast szeryf ↔ sans.
  - Instrument Serif odpada: wąski, modowy i dziś bardzo częsty w modnych landingach, więc ryzyko szablonowości.
- **Treść i UI: Funnel Sans. Dane techniczne: Geist Mono.** Funnel Display wypada z zestawu: 2 pliki preload (Newsreader + Funnel Sans), Geist Mono bez preloadu. Zgodne z §11.
- **Usunięte osobne pasmo „Specyfikacja”.** Wyglądało na oderwaną sekcję (Piotr nie wiedział, do czego służy). Te same fakty (Typ · Moja rola · Stack · Efekt) są teraz **paskiem faktów w każdej scenie**, pod opisem projektu, oddzielone linią 1px. Rekruter widzi konkret bez wchodzenia w case study, a pasek jednoznacznie dotyczy projektu nad nim.
- Od Resenda również: **kolor jako składnia**. Bursztyn tylko w statusach, metadanych (kicker, „teraz buduję”), wybranym wyniku palety i jednym wypełnionym CTA. Nie bierzemy przycisków ghost jako głównych CTA ani obiektu WebGL w hero.

---

## Rekomendacja

**D „Premiera”, w wersji v2 albo v3** (v3 = v2 + DNA Raycasta; rekomenduję **v3.1** (v3 + Newsreader + fakty w scenie), bo paleta w hero od razu pokazuje sygnaturę strony i Twój profil „buduję narzędzia”). Jako jedyny kierunek łączy charakter programisty (okna aplikacji, terminal, ⌘K, specyfikacja) z siłą sprzedaży Apple (sceny, skala, rytm). Działa w obu trybach i domyka słabości każdego źródła. Test „podróbki”: nie da się go pomylić ani z Apple (soft zamiast sprzętu, bursztyn, Geist, okna), ani z Dovetail czy Factory (sceny, snop światła, specyfikacja).

Alternatywy: **A** (bezpieczny, jasny notatnik) i **C** (ciemny bursztyn bez scen, czyli prostsza wersja D).

Decyzja należy do Piotra. Po wyborze powstaje `docs/DESIGN.md` (krok 3) z sekcją „Inspiracja i różnice” na bazie powyższych tabel.
