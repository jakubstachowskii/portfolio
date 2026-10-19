import type { AstroIntegration } from 'astro';

/**
 * Wstrzykuje katalog design systemu pod /design tylko w `astro dev`
 * albo gdy build uruchomiono z DESIGN_PAGE=1 (e2e). Produkcja go nie zawiera.
 * Pliki z prefiksem `_` w src/pages nie są trasami, stąd integracja (DECISIONS #8).
 */
export default function designPage(): AstroIntegration {
  return {
    name: 'portfolio:design-page',
    hooks: {
      'astro:config:setup': ({ command, injectRoute }) => {
        const enabled = command === 'dev' || process.env['DESIGN_PAGE'] === '1';
        if (!enabled) return;
        injectRoute({ pattern: '/design', entrypoint: './src/dev/design.astro' });
      },
    },
  };
}
