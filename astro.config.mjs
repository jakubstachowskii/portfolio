// @ts-check
import { defineConfig, envField } from 'astro/config';
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
