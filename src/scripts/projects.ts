/**
 * Indeks projektów. Wiersz to link do podstrony (działa bez JS); z JS:
 * - najechanie albo fokus wybiera projekt (wypełnienie wiersza, aria-current, podgląd z wejściem);
 * - desktop: kliknięcie w wybrany wiersz otwiera podstronę (najechanie wybiera, więc klik = wejście);
 * - telefon (≤ 900 px): stuknięcie wybiera i przewija do podglądu (tam „Szczegóły →”, DECISIONS #32);
 * - Ctrl/Cmd/Shift/środkowy przycisk: zwykłe zachowanie linku (nowa karta).
 */
const NARROW = '(max-width: 900px)';
const REDUCED = '(prefers-reduced-motion: reduce)';

export function initProjects(root: HTMLElement) {
  const rows = [...root.querySelectorAll<HTMLAnchorElement>('[data-project]')];
  const previews = [...root.querySelectorAll<HTMLElement>('[data-preview]')];
  const box = root.querySelector<HTMLElement>('[data-previews]');
  let current = rows.find((r) => r.getAttribute('aria-current') === 'true')?.dataset['project'];
  // dwie identyczne animacje na zmianę: zmiana nazwy restartuje wejście podglądu
  let flip = false;

  const pick = (id: string | undefined) => {
    if (!id || id === current) return;
    current = id;
    flip = !flip;
    for (const r of rows) {
      const on = r.dataset['project'] === id;
      r.classList.toggle('on', on);
      if (on) r.setAttribute('aria-current', 'true');
      else r.removeAttribute('aria-current');
    }
    for (const p of previews) {
      const on = p.dataset['preview'] === id;
      p.hidden = !on;
      if (on) {
        p.classList.remove('pva', 'pvb');
        p.classList.add(flip ? 'pvb' : 'pva');
      }
    }
  };

  for (const row of rows) {
    const id = row.dataset['project'];
    row.addEventListener('mouseenter', () => pick(id));
    row.addEventListener('focus', () => pick(id));
    row.addEventListener('click', (e) => {
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) return;
      const narrow = matchMedia(NARROW).matches;
      if (!narrow && id === current) return; // wybrany wiersz na desktopie: przejdź do podstrony
      e.preventDefault();
      pick(id);
      if (narrow && box) {
        box.scrollIntoView({
          behavior: matchMedia(REDUCED).matches ? 'auto' : 'smooth',
          block: 'start',
        });
      }
    });
  }
}
