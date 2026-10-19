# SCORING.md: macierz ocen shortlisty (PLAN §6.0, krok 2)

Skala 1–5. Wynik = Σ (ocena × waga). Maksimum: **115**.

| Kryterium                                                                                                 | Waga  |
| --------------------------------------------------------------------------------------------------------- | ----- |
| K1 Pasuje do portfolio programisty                                                                        | 3     |
| K2 Czytelność długiej treści (case studies, kod)                                                          | 3     |
| K3 Prezentacja projektów (zrzuty, wideo, metryki)                                                         | 3     |
| K4 Dark **i** light (lub sensowny drugi tryb)                                                             | 2     |
| K5 Dostępność (kontrasty AA, czytelne fonty)                                                              | 2     |
| K6 Polskie znaki (latin-ext albo łatwy zamiennik OFL)                                                     | 2     |
| K7 Wyróżnia się na tle typowych portfolio                                                                 | 2     |
| K8 Wykonalność w budżetach §11                                                                            | 2     |
| K9 Zgodność z sygnaturami §2 (⌘K, terminal, TOC)                                                          | 1     |
| **K10 Siła sprzedaży: przyciąga oko pracodawcy w 2026, „efekt premiery” (wymaganie Piotra z 2026-10-19)** | **3** |

## Macierz (16 stylów, posortowane)

| #   | Styl                                   | K1  | K2  | K3  | K4  | K5  | K6  | K7  | K8  | K9  | K10 | **Wynik** |
| --- | -------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --------- |
| 1   | [Convex](convex.md)                    | 5   | 4   | 5   | 5   | 4   | 4   | 4   | 5   | 4   | 4   | **102**   |
| 2   | [Zed](zed.md)                          | 5   | 5   | 4   | 3   | 5   | 5   | 4   | 5   | 4   | 3   | **99**    |
| 3   | [Dovetail](dovetail.md)                | 5   | 4   | 4   | 3   | 4   | 5   | 3   | 5   | 5   | 4   | **96**    |
| 4   | [Factory](factory.md)                  | 5   | 4   | 4   | 2   | 4   | 5   | 3   | 5   | 4   | 4   | **93**    |
| 5   | [Vercel](vercel.md)                    | 4   | 4   | 3   | 4   | 5   | 5   | 2   | 5   | 4   | 3   | 88        |
| 6   | [Framer](framer.md)                    | 4   | 3   | 5   | 2   | 4   | 4   | 3   | 4   | 3   | 5   | 88        |
| 7   | [Apple ES](apple-es.md)                | 3   | 3   | 5   | 5   | 4   | 2   | 4   | 3   | 3   | 5   | 87        |
| 8   | [Linear](linear.md)                    | 4   | 4   | 4   | 2   | 4   | 5   | 2   | 4   | 4   | 4   | 86        |
| 9   | [Apple iPhone 18 Pro](apple-iphone.md) | 3   | 3   | 5   | 4   | 4   | 2   | 4   | 3   | 3   | 5   | 85        |
| 10  | [Axiom](axiom.md)                      | 5   | 2   | 4   | 2   | 4   | 4   | 4   | 5   | 5   | 3   | 85        |
| 11  | [Firecrawl](firecrawl.md)              | 4   | 4   | 4   | 3   | 4   | 4   | 3   | 4   | 4   | 3   | 85        |
| 12  | [Verse](verse.md)                      | 4   | 2   | 5   | 2   | 4   | 5   | 4   | 5   | 3   | 3   | 85        |
| 13  | [Dul Zorigoo](dul-zorigoo.md)          | 3   | 4   | 5   | 3   | 4   | 5   | 3   | 5   | 2   | 2   | 84        |
| 14  | [Raycast](raycast.md)                  | 4   | 3   | 3   | 2   | 3   | 5   | 3   | 2   | 5   | 5   | 80        |
| 15  | [Monad](monad.md)                      | 3   | 4   | 3   | 2   | 4   | 4   | 4   | 4   | 3   | 3   | 78        |
| 16  | [PlanetScale](planetscale.md)          | 4   | 2   | 2   | 3   | 4   | 4   | 4   | 5   | 4   | 1   | 71        |

**Synteza D „Premiera”** (nie styl źródłowy, tylko nasza propozycja z KIERUNKI.md): 5/4/5/5/5/5/5/4/5/5 = **110**. Ocena orientacyjna, bo oceniam własny projekt. Służy tylko do pokazania, które słabości źródeł D domyka.

## Uzasadnienia kluczowych ocen

- **Convex K4 = 5.** Styl jest już mieszany (krem + ciemne pasma), więc oba tryby wynikają z tych samych ról kolorów. **K6 = 4:** GT America jest komercyjny, ale zamiennik OFL z latin-ext (Geist / Inter) nie zmienia charakteru.
- **Zed K2 = 5.** Lekki szeryf + spokojny sans to najlepszy zestaw do długich case studies. **K10 = 3:** spokojny i „podręcznikowy”, mało efektu premiery.
- **Dovetail K7 = 3.** Ciemna siatka + Inter + JetBrains Mono to dziś częsty zestaw w dev-toolach. **K9 = 5:** siatka tła i mono-eyebrow to dokładnie sygnatury z §2.
- **Apple K10 = 5, K1 = 3, K6 = 2.** Wzór sprzedaży (jedna rzecz na scenę, rytm, specyfikacja), ale styl sprzedaje sprzęt, nie oprogramowanie. SF Pro nie ma licencji na strony spoza Apple.
- **Framer K10 = 5, K4 = 2.** Kinowa czerń z siatką realizacji, ale bez trybu jasnego.
- **Vercel K7 = 2, Linear K7 = 2.** Najczęściej naśladowane style w branży, więc test „podróbki” byłby trudny.
- **Axiom, Verse, PlanetScale K2 = 2.** Cały tekst w monospace jest za męczący dla akapitów case study.
- **Raycast K8 = 2.** Hero oparte na dużej grafice gradientowej i backdrop-blur. **K5 = 3:** tekst `#6a6b6c` na `#040506` ma 3.82:1, poniżej AA dla zwykłego tekstu.
- **Firecrawl K5 = 4.** `#ff4d00` na `#f9f9f9` = 3.16:1, za mało dla tekstu.

## Metoda przeglądu

1. **Pełny katalog:** API listy Refero (`/api/styles`, 27 stron) zwraca **1342 style** (916 jasnych, 293 ciemne, 133 dwutrybowe). Hasło „2000+” na stronie głównej jest wyższe niż publiczny katalog.
2. **Kolekcje:** wszystkie 95 kolekcji (lista z kodu strony, bo w UI rotuje 8) + 10 fraz z PLAN §6.0 przez wyszukiwarkę (`/api/styles/search`), co dało 1326 unikalnych stylów.
3. **Filtr metadanych całego katalogu:** 55 stylów Apple / Apple-like, 42 kinowe sceny produktu, 57 portfoliów i stron „engineering”, 173 ciemne terminale i konsole.
4. **Arkusz kontaktowy:** 24 kandydatów z filtra (Apple ×5, Max Yinger, Framer, Factory, Analogue, Elektron, Superlative, Osmo, teenage engineering, OpenAI Developers, Dia, Notion, Huly, Jam, Fey, Brisbane Web Developer, Rou Hun Fan, basement.studio, Active Theory, Flighty) obejrzanych wizualnie. 4 z nich weszły do macierzy.
5. Dla każdego z 16 stylów w macierzy przeczytany DESIGN.md (tokeny, typografia, komponenty, do/don't, layout).

## Wynik

Najwyżej oceniane źródła: Convex (102), Zed (99), Dovetail (96), Factory (93). Żadne pojedyncze źródło nie łączy „developerskiego” charakteru z siłą sprzedaży Apple, dlatego rekomendacją jest synteza **D „Premiera”**. Karty kierunków A–D ze szkicami: [`KIERUNKI.md`](KIERUNKI.md).
