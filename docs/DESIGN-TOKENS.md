# DESIGN-TOKENS.md: paleta i zmierzone kontrasty

> Plik generowany: `pnpm tokens:report` (źródło: `src/styles/tokens.css`, obliczenia: `src/lib/color.ts`).
> Nie edytuj ręcznie. Te same pary pilnuje test `tests/unit/color.test.ts`.
> Hex jest wyliczony z OKLCH (sRGB, przycięcie do gamutu); kolory z alfą liczone bez tła.

## Kolory

| Token                  | Dark (domyślny)                         | Light                                  |
| ---------------------- | --------------------------------------- | -------------------------------------- |
| `--color-canvas`       | `oklch(0 0 0)` #000000                  | `oklch(1 0 0)` #ffffff                 |
| `--color-band`         | `oklch(0.176 0.004 229)` #0f1112        | `oklch(0.97 0.002 248)` #f4f5f6        |
| `--color-surface`      | `oklch(0.211 0.006 237)` #16191b        | `oklch(1 0 0)` #ffffff                 |
| `--color-window`       | `oklch(0.157 0.004 229)` #0b0d0e        | `oklch(0.978 0.001 197)` #f7f8f8       |
| `--color-line`         | `oklch(0.277 0.009 234)` #24292c        | `oklch(0.923 0.004 237)` #e3e6e8       |
| `--color-line-strong`  | `oklch(0.373 0.013 229)` #3a4246        | `oklch(0.849 0.008 242)` #c9ced2       |
| `--color-line-control` | `oklch(0.498 0.012 229)` #5c6468        | `oklch(0.637 0.008 242)` #878c90       |
| `--color-fg`           | `oklch(0.97 0.002 248)` #f4f5f6         | `oklch(0.189 0.006 237)` #111416       |
| `--color-muted`        | `oklch(0.71 0.013 237)` #9aa3a9         | `oklch(0.481 0.015 245)` #575f66       |
| `--color-dim`          | `oklch(0.611 0.014 237)` #7c858b        | `oklch(0.536 0.016 241)` #666f76       |
| `--color-accent`       | `oklch(0.807 0.148 77)` #f5b23e         | `oklch(0.625 0.133 73)` #b77901        |
| `--color-accent-text`  | `oklch(0.807 0.148 77)` #f5b23e         | `oklch(0.508 0.108 73)` #8a5a01        |
| `--color-cta`          | `oklch(0.807 0.148 77)` #f5b23e         | `oklch(0.189 0.006 237)` #111416       |
| `--color-on-cta`       | `oklch(0.189 0.006 237)` #111416        | `oklch(1 0 0)` #ffffff                 |
| `--color-success`      | `oklch(0.751 0.142 158)` #4fc98b        | `oklch(0.513 0.119 153)` #1e7a44       |
| `--color-danger`       | `oklch(0.743 0.156 26)` #ff8077         | `oklch(0.544 0.178 28)` #c2362e        |
| `--color-spot`         | `oklch(0.807 0.148 77 / 0.24)` #f5b23e  | `oklch(0.625 0.133 73 / 0.13)` #b77901 |
| `--color-grid`         | `oklch(0.807 0.148 77 / 0.32)` #f5b23e  | `oklch(0.508 0.108 73 / 0.22)` #8a5a01 |
| `--color-row-active`   | `oklch(0.807 0.148 77 / 0.1)` #f5b23e   | `oklch(0.625 0.133 73 / 0.1)` #b77901  |
| `--color-glass`        | `oklch(0.176 0.004 229 / 0.62)` #0f1112 | `oklch(1 0 0 / 0.7)` #ffffff           |

## Kontrasty WCAG 2.x (pary z DESIGN.md §3.2)

Wynik: **wszystkie pary spełniają wymóg**.

| Para                  | Dark     | Light    | Min |
| --------------------- | -------- | -------- | --- |
| fg / canvas           | 19.26 ✅ | 18.49 ✅ | 4.5 |
| fg / band             | 17.36 ✅ | 16.96 ✅ | 4.5 |
| fg / surface          | 16.20 ✅ | 18.49 ✅ | 4.5 |
| muted / canvas        | 8.18 ✅  | 6.49 ✅  | 4.5 |
| muted / band          | 7.37 ✅  | 5.96 ✅  | 4.5 |
| muted / surface       | 6.88 ✅  | 6.49 ✅  | 4.5 |
| dim / canvas          | 5.58 ✅  | 5.13 ✅  | 4.5 |
| dim / band            | 5.03 ✅  | 4.71 ✅  | 4.5 |
| dim / window          | 5.18 ✅  | 4.82 ✅  | 4.5 |
| dim / surface         | 4.69 ✅  | 5.13 ✅  | 4.5 |
| accent-text / canvas  | 11.31 ✅ | 5.92 ✅  | 4.5 |
| accent-text / band    | 10.19 ✅ | 5.43 ✅  | 4.5 |
| on-cta / cta          | 9.96 ✅  | 18.49 ✅ | 4.5 |
| success / canvas      | 10.05 ✅ | 5.36 ✅  | 4.5 |
| success / band        | 9.06 ✅  | 4.92 ✅  | 4.5 |
| danger / canvas       | 8.62 ✅  | 5.44 ✅  | 4.5 |
| danger / band         | 7.77 ✅  | 4.99 ✅  | 4.5 |
| accent / canvas       | 11.31 ✅ | 3.66 ✅  | 3   |
| accent / band         | 10.19 ✅ | 3.36 ✅  | 3   |
| line-control / canvas | 3.48 ✅  | 3.40 ✅  | 3   |
| line-control / band   | 3.14 ✅  | 3.12 ✅  | 3   |

`--color-line` i `--color-line-strong` są dekoracyjne (separatory), nie identyfikują kontrolek, więc nie podlegają 3:1 (WCAG 1.4.11). Kontrolki używają `--color-line-control`.
