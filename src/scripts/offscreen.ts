/**
 * Animacje w pętli stoją, gdy sekcja jest daleko od widoku: sekcja dostaje klasę .off
 * (reguła pauzy w global.css). Wygląd się nie zmienia, oszczędza CPU i baterię.
 */
const IDS = ['top', 'tasma', 'projekty', 'gh', 'kontakt'];

export function initOffscreen() {
  if (typeof IntersectionObserver === 'undefined') return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) en.target.classList.toggle('off', !en.isIntersecting);
    },
    { rootMargin: '200px 0px' },
  );
  for (const id of IDS) {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  }
}
