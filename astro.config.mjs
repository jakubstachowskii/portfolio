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
  // Fonty: OFL, latin-ext, variable (DESIGN.md §4.1). Preload tylko Display + Sans w BaseLayout.
  fonts: [
    {
      name: 'Archivo',
      cssVariable: '--font-archivo',
      provider: fontProviders.fontsource(),
      weights: ['100 900'],
      // oś szerokości wdth (62–125%): nagłówki używają font-stretch: 125%
      stretch: '62% 125%',
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['sans-serif'],
    },
    {
      name: 'Inter',
      cssVariable: '--font-inter',
      provider: fontProviders.fontsource(),
      weights: ['400 600'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['sans-serif'],
    },
    {
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains-mono',
      provider: fontProviders.fontsource(),
      weights: ['400 700'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['monospace'],
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
