/**
 * Indeks projektów: najechanie, fokus albo kliknięcie wybiera projekt (wypełnienie wiersza + podgląd).
 * Telefon (≤ 900 px): podgląd jest pod listą, więc po stuknięciu przewijamy do niego płynnie.
 */
const NARROW = '(max-width: 900px)';
const REDUCED = '(prefers-reduced-motion: reduce)';

export function initProjects(root: HTMLElement) {
  const rows = [...root.querySelectorAll<HTMLButtonElement>('[data-project]')];
  const previews = [...root.querySelectorAll<HTMLElement>('[data-preview]')];
  const box = root.querySelector<HTMLElement>('[data-previews]');
  let current = rows.find((r) => r.getAttribute('aria-pressed') === 'true')?.dataset['project'];
  // dwie identyczne animacje na zmianę: zmiana nazwy restartuje wejście podglądu
  let flip = false;

  const pick = (id: string | undefined) => {
    if (!id || id === current) return;
    current = id;
    flip = !flip;
    for (const r of rows) {
      const on = r.dataset['project'] === id;
      r.classList.toggle('on', on);
      r.setAttribute('aria-pressed', on ? 'true' : 'false');
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
    row.addEventListener('click', () => {
      pick(id);
      if (box && matchMedia(NARROW).matches) {
        box.scrollIntoView({
          behavior: matchMedia(REDUCED).matches ? 'auto' : 'smooth',
          block: 'start',
        });
      }
    });
  }
}
