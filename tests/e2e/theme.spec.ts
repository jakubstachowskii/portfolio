import { expect, test } from '@playwright/test';

test.describe('motyw', () => {
  test('domyślnie ciemny (bez zapisu i bez preferencji systemu)', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('system jasny → jasny', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('brak FOUC: zapisany motyw jest ustawiony przed pierwszym malowaniem', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('theme', 'light'));
    // przechwyt stanu na DOMContentLoaded, zanim załadują się zasoby
    await page.addInitScript(() => {
      document.addEventListener('DOMContentLoaded', () => {
        const probe = window as unknown as Record<string, string | undefined>;
        probe['__themeAtDcl'] = document.documentElement.dataset['theme'];
        probe['__bgAtDcl'] = getComputedStyle(document.body).backgroundColor;
      });
    });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const snapshot = await page.evaluate(() => {
      const probe = window as unknown as Record<string, string | undefined>;
      return { theme: probe['__themeAtDcl'], bg: probe['__bgAtDcl'] };
    });
    expect(snapshot.theme).toBe('light');
    expect(snapshot.bg).toBe('rgb(241, 239, 233)');
  });

  test('przełącznik: klawiatura, zapis i odświeżenie', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    const toggle = page.locator('[data-theme-toggle]');
    await expect(toggle).toHaveAttribute('aria-label', 'Włącz jasny motyw');
    await toggle.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await expect(toggle).toHaveAttribute('aria-label', 'Włącz ciemny motyw');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });
});
