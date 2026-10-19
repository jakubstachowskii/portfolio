# PODROBKA.md: test „podróbki” (PLAN §6.0 p. 6)

**Data:** 2026-10-19 · **Co porównano:** pierwszy ekran i scena projektu szkicu D v3.1 (`sketches/kierunek-d3.html?t=dark`, 1440×900) z pierwszymi ekranami 6 źródeł inspiracji: Apple iPhone 18 Pro, Raycast, Resend, Dovetail, Factory, Convex. Zestawienie powstało lokalnie (`screens/`, poza repo, bo zawiera cudze zrzuty).

**Pytanie:** czy ktoś, kto zna źródło, mógłby pomylić z nim naszą stronę?

| Źródło              | Co jest wspólne                                                             | Co nas odróżnia                                                                                                                                            | Ryzyko pomyłki                                          |
| ------------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Apple iPhone 18 Pro | Czerń, ogromny nagłówek, dużo pustej przestrzeni                            | Brak renderu produktu; wyśrodkowane nazwisko + paleta ⌘K; okna aplikacji zamiast sprzętu; bursztyn zamiast niebieskiego; Funnel zamiast SF Pro             | **Brak**                                                |
| Raycast             | Czerń, pływająca nawigacja w pigułce, powierzchnie „klawisza”, motyw palety | Brak gradientowych pasów w hero; paleta pokazuje **nasze** projekty i akcje; bursztyn zamiast koralu; status jako osobny klawisz w nav; inny krój (Funnel) | **Niskie** (najbliższe podobieństwo: kształt nawigacji) |
| Resend              | Czerń, dyscyplina koloru, mono w danych                                     | Brak obiektu 3D; sans display zamiast szeryfu Domaine; wypełnione CTA zamiast ghost                                                                        | **Brak**                                                |
| Dovetail            | Siatka tła, ciemny canvas                                                   | Siatka widoczna tylko w snopie światła i tylko na scenach; nawigacja to jedna pigułka, a nie osobne przyciski; inne fonty i akcent                         | **Brak**                                                |
| Factory             | Czerń, ciasny tracking nagłówków, mono w etykietach                         | Inna kompozycja (centrum vs. split), okna zamiast dashboardu, bursztyn zamiast pomarańczu jako CTA                                                         | **Brak**                                                |
| Convex              | Zrzuty produktu w oknach aplikacji                                          | Czarna scena zamiast oliwkowego panelu; jedno okno na scenę; pasek faktów; inne fonty                                                                      | **Brak**                                                |

**Wynik: zaliczony.** Żadne źródło nie ma kombinacji wyśrodkowanego nazwiska jako „produktu”, podglądu palety ⌘K z własnymi projektami, scen z oknem w snopie światła i paska faktów.

**Do pilnowania w Fazie 1b–2:** nawigacja jest jedynym elementem bliskim źródłu (Raycast). Jeśli na prawdziwej stronie podobieństwo wzrośnie, zmieniamy proporcje pigułki (wysokość 52 → 48, status wewnątrz pigułki bez osobnego tła) albo wyrównanie. **Test powtarzamy na prawdziwej stronie głównej po Fazie 2.**
