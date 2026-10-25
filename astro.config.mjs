// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import expressiveCode from 'astro-expressive-code';
import { securityHeaders } from './src/integrations/security-headers.ts';
import { LATIN, POLISH } from './src/lib/font-ranges.mjs';

/**
 * Dwa pliki na krój: łacina i polskie litery (dociągane przez unicode-range tylko gdy potrzebne).
 * @param {string} file
 * @param {string} weight
 * @param {string} [stretch]
 */
function variants(file, weight, stretch) {
  /** @param {string} part @param {string[]} range */
  const variant = (part, range) => ({
    src: /** @type {[string]} */ ([`./src/assets/fonts/${file}-${part}.woff2`]),
    weight,
    style: /** @type {'normal'} */ ('normal'),
    stretch,
    unicodeRange: /** @type {[string, ...string[]]} */ (range),
  });
  return /** @type {[ReturnType<typeof variant>, ReturnType<typeof variant>]} */ ([
    variant('latin', LATIN),
    variant('pl', POLISH),
  ]);
}

// https://astro.build/config
export default defineConfig({
  // Adres produkcji na Vercelu do czasu własnej domeny (TODO(content): domena) — jedno miejsce do zmiany.
  site: 'https://portfolio-jakubstachowskii.vercel.app',
  output: 'static',
  adapter: vercel(),
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  i18n: {
    defaultLocale: 'pl',
    locales: ['pl', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  // Sätteri (domyślny w Astro 7) nie obsługuje pluginów remark/rehype — DECISIONS #5
  markdown: {
    processor: unified(),
    // bloki kodu koloruje expressive-code; wbudowany Shiki niepotrzebny (i niezgodny z CSP)
    syntaxHighlight: false,
  },
  // Fonty OFL, variable, własne podzbiory: łacina + polskie litery, osie przycięte do użycia
  // (DECISIONS #29, pliki z `pnpm fonts:subset`). Preload tylko łaciny Archivo + Inter w BaseLayout.
  fonts: [
    {
      name: 'Archivo',
      cssVariable: '--font-archivo',
      provider: fontProviders.local(),
      fallbacks: ['sans-serif'],
      // nagłówki .disp: waga 800, szerokość 125% (100% w wąskich tytułach projektów)
      options: { variants: variants('archivo', '800', '100% 125%') },
    },
    {
      name: 'Inter',
      cssVariable: '--font-inter',
      provider: fontProviders.local(),
      fallbacks: ['sans-serif'],
      options: { variants: variants('inter', '400 600') },
    },
    {
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains-mono',
      provider: fontProviders.local(),
      fallbacks: ['monospace'],
      options: { variants: variants('jetbrains-mono', '400 700') },
    },
  ],
  // expressiveCode musi być przed mdx()
  integrations: [
    expressiveCode(),
    mdx(),
    sitemap({
      i18n: { defaultLocale: 'pl', locales: { pl: 'pl-PL', en: 'en-US' } },
    }),
    securityHeaders(),
  ],
  // CSP z hashami skryptów w <meta> na każdej stronie (DECISIONS #36). Style: 'unsafe-inline', bo szkice
  // i talia kart używają atrybutów style (Astro nie generuje wtedy hashy dla style-src).
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
      styleDirective: { resources: ["'self'", "'unsafe-inline'"] },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    // Jedyny sekret: token GitHub przy buildzie (sekcja aktywności, limit API) — DECISIONS #35, #38
    schema: {
      GITHUB_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
});
