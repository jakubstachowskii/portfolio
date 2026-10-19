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
import designPage from './src/integrations/design-page.ts';

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
      name: 'Funnel Display',
      cssVariable: '--font-funnel-display',
      provider: fontProviders.fontsource(),
      weights: ['500 600'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['sans-serif'],
    },
    {
      name: 'Funnel Sans',
      cssVariable: '--font-funnel-sans',
      provider: fontProviders.fontsource(),
      weights: ['400 500'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['sans-serif'],
    },
    {
      name: 'Geist Mono',
      cssVariable: '--font-geist-mono',
      provider: fontProviders.fontsource(),
      weights: ['400 500'],
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
    // /design: tylko dev i build testowy (DESIGN_PAGE=1) — DECISIONS #8
    designPage(),
    sitemap({
      i18n: { defaultLocale: 'pl', locales: { pl: 'pl-PL', en: 'en-US' } },
      filter: (page) => !page.includes('/design'),
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
