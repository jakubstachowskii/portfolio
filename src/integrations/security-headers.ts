/**
 * Nagłówki bezpieczeństwa dla Vercela (DECISIONS #36). Adapter statyczny nie ma na to opcji,
 * więc po buildzie dopisujemy trasę z nagłówkami na początek .vercel/output/config.json
 * (Build Output API v3). CSP z hashami skryptów generuje Astro (`security.csp` → <meta>);
 * tu tylko to, czego <meta> nie obsługuje (frame-ancestors) i pozostałe nagłówki.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import type { AstroIntegration } from 'astro';

export const SECURITY_HEADERS: Record<string, string> = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Content-Security-Policy': "frame-ancestors 'none'",
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
};

interface VercelConfig {
  routes?: Record<string, unknown>[];
}

export function securityHeaders(): AstroIntegration {
  return {
    name: 'security-headers',
    hooks: {
      'astro:build:done': async ({ logger }) => {
        const file = new URL('.vercel/output/config.json', pathToFileURL(`${process.cwd()}/`));
        let config: VercelConfig;
        try {
          config = JSON.parse(await readFile(file, 'utf8')) as VercelConfig;
        } catch {
          logger.warn('brak .vercel/output/config.json — nagłówki nie zostały dodane');
          return;
        }
        const route = { src: '^/(.*)$', headers: SECURITY_HEADERS, continue: true };
        config.routes = [
          route,
          ...(config.routes ?? []).filter((r) => r['src'] !== route.src || !r['headers']),
        ];
        await writeFile(file, JSON.stringify(config, null, 2));
        logger.info(`dodano ${Object.keys(SECURITY_HEADERS).length} nagłówków bezpieczeństwa`);
      },
    },
  };
}
