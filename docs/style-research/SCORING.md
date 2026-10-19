# SCORING.md: macierz ocen shortlisty (PLAN §6.0, krok 2)

Skala 1–5. Wynik = Σ (ocena × waga). Maksimum: 100.

| Kryterium                                             | Waga |
| ----------------------------------------------------- | ---- |
| K1 Pasuje do portfolio programisty                    | 3    |
| K2 Czytelność długiej treści (case studies, kod)      | 3    |
| K3 Prezentacja projektów (zrzuty, wideo, metryki)     | 3    |
| K4 Dark **i** light (lub sensowny drugi tryb)         | 2    |
| K5 Dostępność (kontrasty AA, czytelne fonty)          | 2    |
| K6 Polskie znaki (latin-ext albo łatwy zamiennik OFL) | 2    |
| K7 Wyróżnia się na tle typowych portfolio             | 2    |
| K8 Wykonalność w budżetach §11                        | 2    |
| K9 Zgodność z sygnaturami §2 (⌘K, terminal, TOC)      | 1    |

## Macierz

| #   | Styl                          | K1  | K2  | K3  | K4  | K5  | K6  | K7  | K8  | K9  | **Wynik** |
| --- | ----------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --------- |
| 1   | [Convex](convex.md)           | 5   | 4   | 5   | 5   | 4   | 4   | 4   | 5   | 4   | **90**    |
| 2   | [Zed](zed.md)                 | 5   | 5   | 4   | 3   | 5   | 5   | 4   | 5   | 4   | **90**    |
| 3   | [Dovetail](dovetail.md)       | 5   | 4   | 4   | 3   | 4   | 5   | 3   | 5   | 5   | **84**    |
| 4   | [Vercel](vercel.md)           | 4   | 4   | 3   | 4   | 5   | 5   | 2   | 5   | 4   | 79        |
| 5   | [Dul Zorigoo](dul-zorigoo.md) | 3   | 4   | 5   | 3   | 4   | 5   | 3   | 5   | 2   | 78        |
| 6   | [Axiom](axiom.md)             | 5   | 2   | 4   | 2   | 4   | 4   | 4   | 5   | 5   | 76        |
| 7   | [Firecrawl](firecrawl.md)     | 4   | 4   | 4   | 3   | 4   | 4   | 3   | 4   | 4   | 76        |
| 8   | [Verse](verse.md)             | 4   | 2   | 5   | 2   | 4   | 5   | 4   | 5   | 3   | 76        |
| 9   | [Linear](linear.md)           | 4   | 4   | 4   | 2   | 4   | 5   | 2   | 4   | 4   | 74        |
| 10  | [Monad](monad.md)             | 3   | 4   | 3   | 2   | 4   | 4   | 4   | 4   | 3   | 69        |
| 11  | [PlanetScale](planetscale.md) | 4   | 2   | 2   | 3   | 4   | 4   | 4   | 5   | 4   | 68        |
| 12  | [Raycast](raycast.md)         | 4   | 3   | 3   | 2   | 3   | 5   | 3   | 2   | 5   | 65        |

## Uzasadnienia kluczowych ocen

- **Convex K4 = 5.** Styl jest już mieszany (krem + ciemne pasma), więc oba tryby wynikają z tych samych ról kolorów. **K6 = 4:** GT America jest komercyjny, ale zamiennik OFL z latin-ext (Geist / Inter) nie zmienia charakteru.
- **Zed K2 = 5.** Lekki szeryf w nagłówkach + spokojny sans w treści to najlepszy zestaw do długich case studies. **K4 = 3:** ciemny tryb trzeba zaprojektować od zera. **K6 = 5:** Plex Serif jest OFL z latin-ext.
- **Dovetail K7 = 3.** Ciemna siatka + Inter + JetBrains Mono to dziś częsty zestaw w dev-toolach. Wyróżnienie musi przyjść z naszych zmian. **K9 = 5:** siatka tła i mono-eyebrow to dokładnie sygnatury z §2.
- **Vercel K7 = 2, Linear K7 = 2.** Najczęściej naśladowane style w branży, więc test „podróbki” byłby trudny.
- **Axiom, Verse, PlanetScale K2 = 2.** Cały tekst w monospace jest za męczący dla akapitów case study.
- **Raycast K8 = 2.** Hero oparte na dużej grafice gradientowej i backdrop-blur. **K5 = 3:** tekst `#6a6b6c` na `#040506` ma 3.82:1, poniżej AA dla zwykłego tekstu.
- **Firecrawl K5 = 4.** `#ff4d00` na `#f9f9f9` = 3.16:1, za mało dla tekstu (tylko duże elementy i tła CTA z ciemnym tekstem).

## Metoda przeglądu

- Przejrzane: strona główna i **wszystkie 95 kolekcji** Refero (lista wyciągnięta z kodu strony, bo w UI rotuje tylko 8), plus 10 fraz z PLAN §6.0 (`developer`, `portfolio`, `terminal`, `monospace`, `dark`, `precision`, `editorial`, `docs`, `minimal`, `command`). Wyniki pochodzą z wyszukiwarki strony (`/api/styles/search`), łącznie **1326 unikalnych stylów**.
- Wstępny ranking: ważone trafienia w kolekcjach powiązanych z dev, edytorstwem, siatkami i portfolio, a potem ręczny dobór 12 zróżnicowanych kierunków (ciemne terminale, jasne blueprinty, edytorskie, portfolio).
- Dla każdego z 12 przeczytany DESIGN.md (tokeny, typografia, komponenty, do/don't) i obejrzany zrzut.

## Wynik → top 3

1. **Convex** (90): kremowy notatnik inżyniera, dwa tryby.
2. **Zed** (90): podręcznik techniczny na papierze milimetrowym, szeryf.
3. **Dovetail** (84): blueprint nocą, dark-first.

Karty kierunków ze szkicami: [`KIERUNKI.md`](KIERUNKI.md).
