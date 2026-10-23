# Zadanie: zbuduj moje portfolio programisty jako prawdziwą stronę

> **Jak użyć:** wrzuć ten plik i `design-reference.html` do katalogu projektu (np. `docs/`), a w Claude Code napisz:
> `Przeczytaj docs/PROMPT-dla-Claude-Code.md i docs/design-reference.html, a potem zrealizuj zadanie etapami.`

---

## 0. Kontekst

Jestem Jakub, programista (desktop, mobile, web). Studiuję informatykę (specjalizacja: cyberbezpieczeństwo) w WSB Merito Chorzów.
Chcę mieć portfolio, do którego łatwo dodam kolejne swoje aplikacje, **bez ruszania kodu komponentów**.

**Wzór wyglądu:** `docs/design-reference.html` to działający wzorzec 1:1. Otwórz go w przeglądarce: ma kolory, typografię, odstępy, sekcje, treść, animacje i interakcje (stos kart, lista projektów, motyw, kopiowanie e-maila). Odtwórz go wiernie i nie wymyślaj nowego stylu.

Jak czytać wzorzec:

- Style są w bloku `<style>` wewnątrz `<helmet>`, a znaczniki w `<x-dc>`.
- `{{nazwa}}`, `<sc-for>` i `<sc-if>` to szablon. Wartości i zachowanie są w klasie `Component` na dole pliku (`renderVals()`, `deckDown()`, `fling()` itd.).
- Skrypt wbudowany w `<head>` (morphdom + mały runtime) służy **tylko do podglądu wzorca**. Nie przenoś go do strony.
- We wzorcu są opcje do porównania wariantów: `heroArt` (`warstwy` / `pipeline` / `kod` / `etykieta`) i `accent` (`mint` / `orange` / `iris` / `amber`). **Na stronę idzie tylko `heroArt = warstwy` (stos kart) i akcent `mint`.** Pozostałych wariantów nie implementuj.

**Repo już istnieje:** `github.com/jakubstachowskii/portfolio` (Astro, TypeScript strict, Tailwind CSS v4, MDX, wyspy React, pnpm, Vitest, Playwright + axe, Lighthouse CI, deploy na Vercel; etap „Phase 0”). Najpierw przeczytaj `CLAUDE.md`, `KICKOFF-PROMPT.md`, `README.md` i `docs/`. **Stack i zasady pracy z repo mają pierwszeństwo przed sekcją 1 tego pliku** (np. tokeny wzorca przenieś do motywu Tailwinda v4 przez `@theme`, a stos kart możesz zrobić jako wyspę React). Wygląd ma być 1:1 ze wzorcem niezależnie od narzędzi. Jeśli coś się wyklucza, zapytaj mnie, zanim cokolwiek nadpiszesz.

---

## 1. Stack (domyślnie, jeśli repo nie mówi inaczej)

- **Astro** (aktualna stabilna wersja) + **TypeScript**. Strona statyczna (SSG): szybka, lekka, łatwa do hostowania za darmo.
- Style: **zwykły CSS ze zmiennymi**. Tokeny obu motywów z klas `.t-dark` / `.t-light` we wzorcu przenieś do `src/styles/tokens.css` (np. `:root[data-theme="dark"]` i `:root[data-theme="light"]`), resztę do `global.css` albo stylów komponentów. Bez Tailwinda i bez bibliotek UI.
- Fonty (self-hosting zamiast Google Fonts):
  - **Archivo** (nagłówki, zmienna oś szerokości `wdth` do 125%) → `@fontsource-variable/archivo`. Sprawdź, że plik zawiera oś `wdth`; jeśli nie, użyj wariantu `wdth` z tego pakietu.
  - **Inter** (tekst) → `@fontsource-variable/inter`.
  - **JetBrains Mono** (etykiety, numery) → `@fontsource/jetbrains-mono` (400, 500, 700).
- Interaktywność w **czystym TypeScripcie/JS** (małe skrypty w komponentach Astro), bez Reacta. Strona musi być czytelna i używalna też bez JS.
- Menedżer pakietów i linting: jak w repo (pnpm, ESLint, Prettier, `astro check`).

---

## 2. Struktura

```
src/
  lib/github.ts          ← pobieranie repozytoriów i kontrybucji z GitHub API przy buildzie
  content/
    projects/            ← opcjonalne nadpisania: 1 plik .md = 1 repo (nazwa pliku = nazwa repo)
      AwizacjaApp.md
      FormatkaApp.md
      LottoAnalyzer.md
      Pig-Game.md
  content.config.ts      ← schema nadpisań (zod)
  components/
    Nav.astro  SectionDots.astro  Hero.astro  CardDeck.astro  Tape.astro
    ProjectIndex.astro  ProjectPreview.astro  ProjectMock.astro
    GitHubActivity.astro  About.astro  Stack.astro  Contact.astro  Footer.astro
    ThemeToggle.astro  Button.astro
  layouts/BaseLayout.astro   ← <head>, SEO, OG, fonty, skrypt motywu (bez mignięcia)
  pages/
    index.astro
    projekty/[slug].astro    ← podstrona projektu
    404.astro
  styles/tokens.css  global.css
  site.config.ts             ← imię (Jakub), nazwisko, e-mail, GitHub (jakubstachowskii), LinkedIn, CV, miasto, status „otwarty na projekty”, lista ukrytych repo
public/
  cv.pdf  (placeholder)  favicon.svg  og.png
```

### Projekty: z mojego GitHuba, nie wpisywane ręcznie

Lista projektów to **moje publiczne repozytoria z `github.com/jakubstachowskii`**, pobierane przy buildzie (`lib/github.ts`):

1. Pobierz `GET /users/jakubstachowskii/repos?per_page=100&sort=pushed`. Token `GITHUB_TOKEN` z `.env` jest opcjonalny (wyższy limit zapytań) i nigdy nie trafia do kodu ani do przeglądarki.
2. Odrzuć forki, repo zarchiwizowane, repo `portfolio` (to ta strona) i repo z listy `hiddenRepos` w `site.config.ts`. Repo z topikiem `portfolio-hide` też pomiń.
3. Z każdego repo weź: nazwę, `description`, `topics`, `language`, `homepage` (→ przycisk „ZOBACZ ↗”, tylko gdy jest), `html_url` (→ „KOD NA GITHUBIE”), `pushed_at` (rok) i `stargazers_count`.
4. Nałóż opcjonalne nadpisanie z `src/content/projects/<nazwa-repo>.md`. Frontmatter: `title`, `summary`, `platforms`, `tags`, `mock`, `order`, `cover`, `gallery`, `featured`, `hidden`. Treść pliku to opis na podstronę projektu. Nadpisanie wygrywa z danymi z GitHuba.
5. Bez nadpisania tytuł to nazwa repo zamieniona na czytelną (`AwizacjaApp` → „Awizacja App”, `Pig-Game` → „Pig Game”). Opis to `description`, a jeśli jest pusty, pierwszy akapit README (`GET /repos/{owner}/{repo}/readme`, bez nagłówków, max ~200 znaków). Tagi to `topics`, a jeśli ich brak, `language`. Platforma: topik `desktop` / `web` / `mobile`, inaczej `web`. Szkic: `mock` z nadpisania, inaczej `generic`.
6. Kolejność: najpierw `order` z nadpisań, potem po `pushed_at` malejąco. Numery 01, 02… nadawaj po sortowaniu.
7. Gdy API nie odpowiada przy buildzie, użyj ostatniej zapisanej kopii (`src/data/github-cache.json`, aktualizowanej przy udanym buildzie), żeby deploy się nie wywalił.
8. Nowe repo pojawia się na stronie po kolejnym buildzie. Ustaw codzienny rebuild na Vercelu (Deploy Hook + GitHub Action z `schedule`).

Startowe nadpisania (4 pliki `.md`) przygotuj z danych w tablicy `data` w `renderVals()` we wzorcu. Opisy pochodzą z README moich repo. Szkice we wzorcu: `awizacja`, `formatka` (rozkrój), `lotto` (wykres częstości i kule), `pig` (dwóch graczy i kostka). Dla nowych repo bez szkicu zrób neutralny `generic` w tym samym stylu (okno z paskiem i liniami kodu). **Nie wymyślaj faktów ani liczb.**

**Podgląd nowych projektów (żeby nie trzeba było wracać do projektowania):**

- Każdy podgląd działa od razu. Nowe repo bez niczego dostaje szkic `generic`, więc nic się nie psuje.
- Najlepszy podgląd to **prawdziwy screenshot**: wrzucam plik do `src/assets/projects/<nazwa-repo>.png` (albo podaję `cover` w nadpisaniu) i pokazuje się zamiast szkicu, w tej samej ramce, z tym samym wejściem i tłem w kropki.
- Dla repo z `homepage` (aplikacje webowe) zrób skrypt `pnpm screenshots`, który robi zrzut strony Playwrightem i zapisuje go jako cover.
- Szkice rób jako osobne małe komponenty w `src/components/mocks/` (`Awizacja.astro`, `Formatka.astro`…) według jednej zasady opisanej w komentarzu `ProjectMock.astro`: ramka 1px `--line2`, tło `--surface`, mono 11px, akcent tylko na jednym elemencie, kolory `--hue*`, jedna delikatna animacja w pętli, pauzowana poza ekranem. Dzięki temu przy nowym projekcie wystarczy poprosić Claude Code: „dodaj szkic dla repo X w stylu istniejących”.

---

## 3. Strona główna (`/`): sekcje i zachowanie

Kolejność jak we wzorcu:

1. **Nav** (sticky, półprzezroczyste tło z blurem, linia 1px na dole):
   - Bez znaku graficznego: sam napis „Jakub” (Archivo) i pod nim „dev / [nazwisko]” (mono) (podpis znika poniżej 520 px).
   - Linki „01 Projekty / 02 O mnie / 03 Stack”. Aktywna sekcja przy przewijaniu dostaje podkreślenie i `aria-current="true"` (logika `onScroll` we wzorcu: linia odniesienia `min(40% wysokości okna, 360px)`, na samym dole aktywny jest Kontakt). Kliknięcie linku blokuje przełączanie do pierwszego ruchu kółkiem, dotyku albo klawisza (`lock` / `unlock`).
   - Przełącznik motywu (słońce/księżyc) i przycisk „KONTAKT ↗”.
   - Pasek postępu przewijania (2px, akcent) pod navem, przez `animation-timeline: scroll(root)` w `@supports`.
   - Poniżej 900 px linki przechodzą do drugiego rzędu z przewijaniem w poziomie.
2. **Boczna nawigacja kreskami** (`SectionDots`): stała po prawej, etykieta po najechaniu, na sekcji Kontakt kolory odwrócone. Ukryta poniżej 1280 px.
3. **Hero**:
   - Siatka 80 px w tle z wygaszaniem w dół.
   - Odznaka „STATUS: OTWARTY NA PROJEKTY · 2026” z pulsującą kropką. Tekst i rok z `site.config.ts`.
   - H1 „Piszę kod, / który robi / robotę.” w Archivo 125%, wersalikami, ostatnie słowo w kolorze akcentu. Każda linia wjeżdża od dołu z opóźnieniem.
   - Lead, przyciski „ZOBACZ PROJEKTY ↓” (akcent, połysk), „GITHUB”, „CV.PDF ↓”.
   - **Stos kart** (`CardDeck`, 3 karty WEB / MOBILE / DESKTOP): dokładnie jak we wzorcu (`deckDown`, `fling`, `prev`, `rotateTo`, tryby spoczynek → zerknięcie → aktywny). Wymagania:
     - Spoczynek: lekkie 3D i delikatne unoszenie. Po ~0,3 s najechania delikatne rozsunięcie.
     - Pierwsze kliknięcie tylko aktywuje (płaska talia, strzałki, wskaźniki). Kolejne kliknięcie przerzuca kartę. **Stan „czy aktywna” odczytuj przed ustawieniem fokusu** (we wzorcu to już poprawione).
     - Przeciąganie myszą i palcem z `setPointerCapture`, próg 90 px albo szybkie pstryknięcie (prędkość > 0,6 px/ms i > 25 px). Tylne karty podjeżdżają podczas przeciągania.
     - Klawiatura: fokus na figurze, Enter/Spacja aktywuje, ← → zmienia kartę, Esc kończy. Wyjście myszą z talii po ~1 s ją dezaktywuje.
     - `aria-label` na figurze, `aria-hidden` na tylnych kartach, podpowiedź w `aria-live`.
     - Na ekranach dotykowych (`hover: none`) strzałki i wskaźniki są widoczne od razu.
4. **Taśma** pod hero: przewijany w pętli pasek w kolorze akcentu (Desktop ✱ Mobile ✱ Web ✱ Od pomysłu do wdrożenia ✱ Cyberbezpieczeństwo), `aria-hidden`.
5. **Projekty** (`#projekty`): nadtytuł „01 — INDEKS PROJEKTÓW”, H2 „Rzeczy, które działają.” z odsłanianiem od lewej, a obok krótki tekst i link „Wszystkie repozytoria ↗” do mojego GitHuba.
   - Lewa kolumna: lista przycisków z danych z GitHuba (patrz sekcja 2) (numer, tytuł, platformy, strzałka). Najechanie, fokus lub kliknięcie wybiera projekt. Wybrany ma wypełnienie akcentem od lewej (dwie warstwy i `clip-path`, tekst zmienia kolor razem z wypełnieniem) i `aria-pressed="true"`.
   - Prawa kolumna: sticky podgląd wybranego projektu (szkic albo cover, platformy, tytuł, opis, tagi, „ZOBACZ ↗” tylko przy `homepage`, „KOD NA GITHUBIE ‹/›” zawsze). Zmiana projektu odpala krótkie wejście (przesunięcie i rozmycie).
   - Podgląd to też link do `/projekty/[slug]` (dodaj „Szczegóły →”).
   - **Telefon (≤ 900 px):** podgląd jest pod listą, więc po stuknięciu w projekt przewiń płynnie do podglądu (albo rozwiń szczegóły pod wierszem; wybierz rozwiązanie i pokaż mi). Bez JS każdy wiersz jest zwykłym linkiem do podstrony.
6. **GitHub** (`#gh`): „LIVE — GITHUB”, „Kod na GitHubie.” i siatka 44×7 z falą. **Na stronie siatka ma pokazywać prawdziwe dane**: pobierz kalendarz kontrybucji użytkownika `jakubstachowskii` przy buildzie (GitHub GraphQL API `contributionsCollection`, token w zmiennej środowiskowej, nigdy w kodzie). Zamiast tekstu w nawiasie pokaż liczbę publicznych repo i datę ostatniego commita. Kolor komórki zależy od liczby commitów, fala zostaje jako animacja wejścia. Jeśli tokenu nie ma, sekcja się nie renderuje. Nie pokazuj siatki bez danych.
7. **O mnie** (`#o-mnie`): „02 — O MNIE”, „Zaczynam od tego, co boli.”, dwa akapity, miejsce na zdjęcie (placeholder), tabela faktów (rola, platformy, specjalizacja, uczelnia, lokalizacja, zasada) i 3 zasady 01/02/03 w siatce z liniami 1px.
8. **Stack** (`#stack`): „03 — STACK”, „Skrzynka z narzędziami.”, 8 kafelków (HTML · CSS, JavaScript, React, Electron, SQLite, Vite, Git, Claude Code, czyli to, czego używam w repo). Dane trzymaj w tablicy w `site.config.ts`. Kafelek-placeholder ma przerywaną ramkę (styl `[uzupełnij]` we wcześniejszej wersji).
9. **Kontakt** (`#kontakt`): cała sekcja w kolorze akcentu, „04 — KONTAKT”, wielki „Napisz do mnie.”, ramka z e-mailem (`mailto:`) i przyciskiem „KOPIUJ” (Clipboard API, potem „SKOPIOWANO” na 2 s, `aria-live`, ikona z animacją), GitHub ↗, LinkedIn ↗, taśma „Porozmawiajmy ✱” w drugą stronę. Poniżej 520 px e-mail i „Kopiuj” są w dwóch rzędach na pełną szerokość.
10. **Stopka**: „© 2026 JAKUB [NAZWISKO]”, „ZAPROJEKTOWANE I ZBUDOWANE RĘCZNIE”, „NA GÓRĘ ↑”.

### Motyw

- Domyślnie ciemny. Przy pierwszej wizycie uwzględnij `prefers-color-scheme`, a wybór zapisz w `localStorage` (w `try/catch`).
- Ustaw `data-theme` na `<html>` małym skryptem inline w `<head>` **przed** renderem, żeby nie było mignięcia.
- Zmiana motywu: płynne przejście tła i koloru (0,5 s), ikona wjeżdża z obrotem.

### Animacje

- Odsłanianie sekcji (`.reveal`) i nagłówków (`.wipe`) przez `animation-timeline: view()` w `@supports`. Bez wsparcia wszystko jest od razu widoczne.
- Animacje w pętli (taśmy, kropka, fala, połysk, unoszenie talii) pauzuj, gdy sekcja jest poza ekranem (IntersectionObserver, `rootMargin: 200px`, klasa `.off`), jak we wzorcu.
- `prefers-reduced-motion: reduce` wyłącza wszystkie animacje i przejścia, ukrywa pasek postępu i wyłącza płynne przewijanie.

---

## 4. Podstrona projektu (`/projekty/[slug]`) i 404

**Podstrona** w tym samym stylu: nav i stopka jak na głównej, breadcrumb „← Projekty”, nadtytuł z numerem i platformami, tytuł w Archivo, tagi, przyciski Demo / Kod (tylko przy linkach), cover albo szkic (`ProjectMock`), treść markdown (max ~68 znaków w linii, kolor `--text2`, nagłówki w Archivo), galeria, a na dole „poprzedni / następny projekt” jako duże wiersze jak w indeksie.

**404:** krótka strona w tym stylu: wielkie „404”, „Tej strony tu nie ma.”, przycisk „WRÓĆ NA START”.

---

## 5. Zasady designu (nie łam ich)

- Tła ciemne: `--bg #0d0e10` → `--bg2` → `--surface` → `--surface2`. Jasny motyw ma własne tokeny we wzorcu. **Powierzchnie oddzielaj liniami 1px (`--line` / `--line2`).** Cienie są tylko pod kartami w hero i pod talią.
- Akcent: **mint `#3ee6c1`**. Tekst w kolorze akcentu ma osobny token `--acc-text` (`#5ff0d0` w ciemnym, `#0a7a65` w jasnym), żeby trzymać kontrast. Na tle akcentu tekst jest `--acc-ink`.
- Kolory `--hue1…--hue4` służą tylko szkicom projektów.
- Typografia:
  - Nagłówki: Archivo, `font-stretch: 125%`, waga 800, wersaliki, `letter-spacing: -0.01em` (H2 sekcji `clamp(32px, 5.6vw, 76px)`, kontakt do 168px).
  - Tekst: Inter 400–600, 16px, `line-height: 1.55`.
  - Mono: JetBrains Mono tylko w etykietach, numerach, przyciskach i tabelach faktów.
- Kąty proste (bez zaokrągleń). Wyjątki: szkice telefonów i kropki.
- Kontrast tekstu ≥ 4.5:1 w obu motywach. Szary drobny tekst to `--text2`, nie ciemniej.

---

## 6. Jakość (kryteria odbioru)

- **Responsywność:** 360 px → 1440 px bez poziomego scrolla (taśmy w kontenerach z `overflow: hidden`). Cele dotyku ≥ 44 px. `<meta name="viewport" content="width=device-width, initial-scale=1">`. Sprawdź 360, 375, 768, 1024, 1280 i 1440 w obu motywach.
- **Dostępność:**
  - Semantyczne `header/nav/main/section/footer`, jeden `h1`, widoczny focus (2px w kolorze akcentu).
  - Ikony SVG mają `aria-hidden`, dekoracje (taśmy, siatka, szkice) też.
  - Działa skip-link „Przejdź do treści”.
  - Stos kart i lista projektów są w pełni obsługiwane z klawiatury.
- **SEO:**
  - `<title>`/`description` per strona, Open Graph + Twitter card.
  - `sitemap` (@astrojs/sitemap), `robots.txt`, kanoniczne URL-e.
  - JSON-LD `Person` na głównej i `SoftwareApplication` na podstronach projektów.
- **Wydajność:**
  - Lighthouse ≥ 95 we wszystkich kategoriach (mobile).
  - Obrazy przez `astro:assets` (AVIF/WebP, lazy).
  - Animacje tylko na `transform`, `opacity` i `clip-path`, bez animowania `top`, `width` i kolorów setek elementów.
- `npm run build` przechodzi bez błędów i ostrzeżeń `astro check`.

---

## 7. Etapy (po każdym: pokaż mi efekt i poczekaj na OK)

1. **Szkielet:** init Astro, tokeny obu motywów, global.css, fonty, BaseLayout ze skryptem motywu, Nav, SectionDots i Footer.
2. **Strona główna statycznie:** wszystkie sekcje 1:1 ze wzorcem, dane z `site.config.ts`.
3. **Projekty z GitHuba:** `lib/github.ts`, cache, schema nadpisań, 4 pliki `.md`, ProjectIndex, ProjectPreview, ProjectMock (z `generic`). Pokaż mi listę, jaka wyszła z API.
4. **Interakcje:** stos kart, wybór projektu (też na telefonie), motyw, kopiowanie e-maila, aktywna sekcja w nav, odsłanianie, pauzowanie animacji, reduced motion.
5. **Podstrony projektów + 404.**
6. **Sekcja GitHub:** kontrybucje przy buildzie i codzienny rebuild. Bez tokenu sekcja się nie pokazuje.
7. **SEO, dostępność, wydajność:** sitemap, OG image, JSON-LD, audyt Lighthouse i poprawki.
8. **Deploy na Vercel** (repo już jest tak skonfigurowane) + README: „jak dodać nowy projekt”. Wystarczy wrzucić repo na GitHuba z opisem i topikami. Opcjonalnie dodaj plik `.md` z nadpisaniem i screenshotem w `src/assets/projects/`. „Jak ukryć repo”: topik `portfolio-hide` albo `hiddenRepos`.

---

## 8. Do uzupełnienia przeze mnie (zostaw jako placeholdery i wypisz na koniec)

- `[Nazwisko]`, `[twoj@email.pl]`, `[link-linkedin]`, `[link-do-CV]`, `[miasto]` → `site.config.ts` (GitHub już znany: `https://github.com/jakubstachowskii`)
- Zdjęcie do sekcji O mnie (kwadrat, min. 400×400)
- Opisy (About) i topiki w moich repo na GitHubie, bo teraz są puste. Topiki `desktop` / `web` / `mobile` ustawiają platformę.
- Screenshoty projektów (opcjonalnie, inaczej zostaje szkic)
- Token GitHub (zmienna środowiskowa) do sekcji aktywności
- Docelowa domena (do `site` w `astro.config`)
