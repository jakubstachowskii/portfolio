// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import expressiveCode from 'astro-expressive-code';
import icon from 'astro-icon';
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
  // TODO(content): docelowa domena (CONTENT-CHECKLIST → Podstawy)
  site: 'https://example.com',
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
    react(),
    icon(),
    sitemap({
      i18n: { defaultLocale: 'pl', locales: { pl: 'pl-PL', en: 'en-US' } },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    // Sekrety opcjonalne do Fazy 5 (kontakt) — DECISIONS #12
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      TURNSTILE_SECRET_KEY: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      PUBLIC_TURNSTILE_SITE_KEY: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      CONTACT_TO_EMAIL: envField.string({ context: 'server', access: 'secret', optional: true }),
      GITHUB_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
});
