import { expect, test } from '@playwright/test';

test.describe('SEO i podglądy linków', () => {
  test('główna: tytuł, canonical, hreflang, Open Graph, Twitter, JSON-LD Person', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(
      /^Jakub .+ — Programista: aplikacje webowe, mobilne i desktopowe$/,
    );
    const head = page.locator('head');
    await expect(head.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/$/);
    await expect(head.locator('link[hreflang="en"]')).toHaveAttribute('href', /\/en\/$/);
    await expect(head.locator('link[hreflang="x-default"]')).toHaveCount(1);
    await expect(head.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      /\/og\.png$/,
    );
    await expect(head.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'pl_PL');
    await expect(head.locator('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image',
    );
    const ld = JSON.parse(
      (await head.locator('script[type="application/ld+json"]').textContent()) ?? '{}',
    ) as { '@type': string; sameAs: string[] };
    expect(ld['@type']).toBe('Person');
    expect(ld.sameAs.join(' ')).not.toContain('[');
  });

  test('podstrona projektu: SoftwareApplication i wersja EN', async ({ page }) => {
    await page.goto('/');
    const href = (await page.locator('[data-project]').first().getAttribute('href'))!;
    await page.goto(href);
    const ld = JSON.parse(
      (await page.locator('script[type="application/ld+json"]').textContent()) ?? '{}',
    ) as { '@type': string };
    expect(ld['@type']).toBe('SoftwareApplication');
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', /\/en\/projects\//);
  });

  test('404 bez canonical i z noindex', async ({ page }) => {
    await page.goto('/nie-ma-takiej-strony');
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  });

  test('robots.txt, sitemap, favicon, obrazek OG i licencje fontów są dostępne', async ({
    request,
  }) => {
    const robots = await request.get('/robots.txt');
    expect(await robots.text()).toMatch(/Sitemap: https?:\/\/.+\/sitemap-index\.xml/);
    for (const path of [
      '/sitemap-index.xml',
      '/favicon.svg',
      '/apple-touch-icon.png',
      '/og.png',
      '/licenses/fonts.txt',
    ]) {
      expect((await request.get(path)).status(), path).toBe(200);
    }
  });
});
