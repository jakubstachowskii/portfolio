# Resend: „Black velvet with violet neon”

- **Refero:** https://styles.refero.design/style/0d914ef0-fa84-4c60-a9aa-cef0b5eb6e5d · źródło: https://resend.com
- **Tryb:** ciemny
- **Zrzut:** `screens/resend.jpg` (lokalnie, poza repo)

**Nastrój.** „Luksusowy terminal”: czysta czerń, hairline 1px, biała typografia jak druk na matowym szkle. Hero jest antydekoracyjne: jeden wielki szeryfowy nagłówek obok obiektu 3D (WebGL), bez gradientów i ilustracji.

**Paleta.** `#000` canvas, `#292d30` hairline, `#fff` / `#f0f0f0` tekst, `#a1a4a5` muted. Fiolet `#9281f7` (gradient do `#9a54dc`) **tylko** w ciągach kodu, adresach e-mail i statusach, jak podświetlanie składni, nigdy na przyciskach. Niebieski `#3b9eff` sporadycznie.

**Typografia.** Domaine (szeryf, komercyjny) 96px / 400 w hero; ABC Favorit (komercyjny) 56px z trackingiem −0.05em w sekcjach; Inter w treści; Commit Mono w kodzie, badge'ach i etykietach.

**Kształty i głębia.** Dwa promienie: 6px (przyciski, badge, inputy) i 16px (karty, okna kodu), panele 24px. Zero cieni, tylko obramowania 1px.

**Komponenty.** Przyciski ghost (przezroczyste + obramowanie), pigułka ogłoszenia, okno kodu / terminala, badge z adresem e-mail, kropka statusu, obracający się sześcian 3D.

**Kontrasty (zmierzone na `#000`).** `#a1a4a5` 8.37:1 ✅ · `#6e727a` 4.35:1 (poniżej AA dla tekstu < 18px) · `#464a4d` w kodzie inline **2.35:1 ❌** · hairline `#292d30` 1.51:1 (dla kontrolek formularzy WCAG wymaga 3:1).

**Dla nas.**

- ✅ Najlepszy przykład **„premium dla developerów”**: szeryf w hero na czerni + mono w danych. To odpowiedź na „typografia bardziej premium”.
- ✅ Akcent jako „składnia” (kolor tylko w kodzie i identyfikatorach) to elegancka zasada.
- ❌ Hero stoi na obiekcie **WebGL 3D**. PLAN §1 wyklucza ciężki WebGL na starcie, a sześcian to ich sygnatura (test „podróbki”).
- ❌ Tylko tryb ciemny; dwa fonty komercyjne; przyciski ghost bez wypełnienia osłabiają CTA „Zobacz projekty” u rekrutera.
- ❌ Brak miejsca na prezentację projektów: to landing jednego produktu.
