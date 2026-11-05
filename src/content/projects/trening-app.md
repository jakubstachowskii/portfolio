---
title: 'Trening App'
summary: 'Aplikacja na iPhone’a do treningu siłowego: plany, zapis serii i ciężaru, postępy i baza ćwiczeń. W budowie: dane i logika już działają, teraz powstają ekrany.'
summaryEn: 'An iPhone app for strength training: plans, logging sets and weight, progress and an exercise library. In progress: the data and logic work, the screens come next.'
platforms: [mobile]
tags: [React Native, Expo, TypeScript, SQLite]
mock: trening
order: 4
wip: true
---

## Co ma robić

Aplikacja do treningu na siłowni. W planie: gotowe programy albo własne plany, zapis serii, powtórzeń i ciężaru, minutnik przerwy, rekordy i wykresy postępów oraz baza ćwiczeń. Ma prowadzić początkującego gotowymi ustawieniami, a zaawansowanemu dać pełną kontrolę.

## Stan

Projekt jest w budowie. Gotowe są fundament aplikacji, zatwierdzony wygląd i design system, lokalna baza danych z migracjami oraz logika: szacowany maksymalny ciężar (1RM), objętość, rekordy i podpowiedź ciężaru na kolejny trening, z testami. Następne w kolejce są ekrany treningu i postępów.

## Technologia

Expo, React Native i TypeScript w trybie strict. Dane zostają w telefonie w bazie SQLite, bez konta i serwera. Testy Jest, lint i sprawdzenia w GitHub Actions.
