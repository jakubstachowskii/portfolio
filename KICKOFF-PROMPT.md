# Prompt startowy dla Claude Code

Skopiuj `CLAUDE.md` i folder `docs/` do pustego folderu projektu, otwórz w nim Claude Code i wklej:

---

Przeczytaj `CLAUDE.md`, `docs/PLAN.md` i `docs/CONTENT-CHECKLIST.md` w całości.

Następnie:
1. Streść w 10 punktach, jak rozumiesz cel, stack i fazy — i wypisz wszystko, co w planie jest niejasne lub może być niezgodne z aktualnymi wersjami bibliotek (sprawdź dokumentację Astro i Tailwind v4, zanim to ocenisz).
2. Utwórz `docs/DECISIONS.md` i `docs/PROGRESS.md`.
3. Wejdź w plan mode i rozpisz Fazę 0 na konkretne kroki.
4. Po mojej akceptacji zrealizuj Fazę 0 na gałęzi `feat/faza-0-fundament`, uruchom wszystkie komendy z Definition of Done i pokaż mi wynik oraz odhaczone kryteria akceptacji.

Po Fazie 0 przechodzimy do **Fazy 1a — research stylu**: przejrzyj https://styles.refero.design/ (wszystkie kolekcje plus wyszukiwarkę) według `docs/PLAN.md` §6.0. Oceń shortlistę w `SCORING.md` i pokaż mi top 3 kierunki ze zrzutami oraz tym, co zmienisz w każdym z nich. Wybrany styl ma być inspiracją, nie kopią.

Nie przechodź do kolejnej fazy bez mojej zgody. Jeśli brakuje treści — użyj `TODO(content): ...`, nie wymyślaj faktów o mnie.

---

## Kolejne fazy
Dla każdej następnej fazy:

> Realizujemy Fazę N z `docs/PLAN.md`. Najpierw plan mode i lista kroków, potem implementacja na gałęzi `feat/faza-N-...`, na końcu Definition of Done i kryteria akceptacji z wynikami komend.

## Przydatne w trakcie
- Po każdej fazie z UI: poproś o zrzuty ekranu Playwrightem (dark/light, mobile/desktop) i oceń je sam, zanim zatwierdzisz.
- Raz na kilka faz: „Zrób przegląd kodu całego repo pod kątem CLAUDE.md i PLAN.md — wypisz odstępstwa i dług techniczny.”
- Przed launchem: „Uruchom pełną Fazę 9 i daj mi raport z wynikami Lighthouse, axe i securityheaders.”
