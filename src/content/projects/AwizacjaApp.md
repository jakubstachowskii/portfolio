---
summary: 'Aplikacja do obsługi punktu skupu zbóż: kalendarz awizacji, przyjęcia na skupie, magazyn, kontrola jakości i sprzedaż. Wszystko w lokalnej bazie SQLite.'
summaryEn: 'An app for running a grain purchase point: delivery booking calendar, intake, warehouse, quality control and sales. Everything in a local SQLite database.'
platforms: [desktop]
tags: [Electron, React, SQLite]
mock: awizacja
order: 1
---

## Co robi

Aplikacja prowadzi cały obieg punktu skupu zbóż w pięciu modułach:

- **Awizacje** — kalendarz awizacji, kontrahenci, przewoźnicy, zboża, raporty.
- **Skup** — przyjęcia, dostawy, cenniki, kontrakty, dokumenty, reguły jakości.
- **Magazyn** — magazyny, stany, partie, ruchy, przesunięcia, inwentaryzacja.
- **Jakość** — badania laboratoryjne, certyfikaty, procesy HACCP/GMP.
- **Sprzedaż** — klienci, zamówienia, faktury.

## Jak działa

Przyjęcie na skupie automatycznie tworzy ruch magazynowy: zboże ze słownika skupu jest dopasowywane do magazynu i zapisywane w jednej transakcji SQLite, więc stany nie rozjeżdżają się między modułami.

Dane leżą w lokalnej bazie SQLite. Kopię zapasową, przywracanie i eksport do JSON obsługują ustawienia na ekranie startowym. Aplikacja buduje się do instalatora dla Windows.
