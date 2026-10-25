---
summary: 'Aplikacja do analizy wyników Lotto: statystyki częstości liczb, historia losowań, import CSV i pobieranie najnowszych wyników. Projekt edukacyjny.'
summaryEn: 'An app for analysing Lotto results: number frequency stats, draw history, CSV import and fetching the latest results. An educational project.'
platforms: [desktop]
tags: [Electron, JavaScript, SQLite]
mock: lotto
order: 3
---

## Co robi

Aplikacja do analizy wyników polskiego Lotto. Projekt edukacyjny i rozrywkowy: żadna analiza nie zwiększa szans na wygraną, bo każda kombinacja liczb ma takie same szanse.

- **Dashboard** — podsumowanie statystyk, ostatnie wyniki, „gorące” i „zimne” liczby, wykres częstotliwości.
- **Statystyki** — częstotliwość wszystkich liczb z filtrowaniem po okresach (tydzień, miesiąc, rok).
- **Generator** — „strategie” losowania (losowe, gorące, zimne, zrównoważone) dla zabawy.
- **Historia** — przeglądanie archiwalnych losowań.
- **Aktualizacja i import** — pobieranie najnowszych wyników z lotto.pl oraz import danych z CSV.

## Technologia

Electron i JavaScript, dane w lokalnej bazie SQLite tworzonej przy pierwszym uruchomieniu.
