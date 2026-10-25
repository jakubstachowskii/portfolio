/**
 * Aktywna sekcja w nav (podkreślenie, aria-current) i w bocznych kreskach — logika onScroll wzorca:
 * linia odniesienia min(40% okna, 360 px), na samym dole aktywny jest Kontakt.
 * Kliknięcie linku do sekcji blokuje przełączanie do pierwszego ruchu kółkiem, dotyku albo klawisza.
 */
import { sections, type SectionId } from '@/config/site';

const LINE_RATIO = 0.4;
const LINE_MAX = 360;
const TOP_OFFSET = 40;
const BOTTOM_SLACK = 4;

function isSection(id: string): id is SectionId {
  return (sections as readonly string[]).includes(id);
}

export function initActiveSection() {
  const marks = [
    ...document.querySelectorAll<HTMLElement>('.nl[data-section], .dot[data-section]'),
  ];
  const dots = document.querySelector<HTMLElement>('[data-dots]');
  let active: SectionId | null = null;
  let lock: SectionId | null = null;
  let raf = 0;

  const apply = (id: SectionId) => {
    if (id === active) return;
    active = id;
    for (const el of marks) {
      const on = el.dataset['section'] === id;
      el.classList.toggle('on', on);
      if (on) el.setAttribute('aria-current', 'true');
      else el.removeAttribute('aria-current');
    }
    // na miętowym tle Kontaktu kreski przechodzą w ciemny kolor
    dots?.classList.toggle('inv', id === 'kontakt');
  };

  const measure = () => {
    raf = 0;
    if (lock) return;
    const vh = window.innerHeight;
    const doc = document.documentElement;
    const line = Math.min(vh * LINE_RATIO, LINE_MAX);
    let cur: SectionId = 'top';
    if (window.scrollY > TOP_OFFSET) {
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) cur = id;
      }
      const atBottom = vh + window.scrollY >= doc.scrollHeight - BOTTOM_SLACK;
      if (doc.scrollHeight > vh + BOTTOM_SLACK && atBottom) cur = 'kontakt';
    }
    apply(cur);
  };
  const onScroll = () => {
    if (!lock && !raf) raf = requestAnimationFrame(measure);
  };

  // kliknięcie dowolnego linku #sekcja: od razu ta sekcja, bez „przeskakiwania” w trakcie płynnego scrolla
  document.addEventListener('click', (e) => {
    const a = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href*="#"]');
    const id = a?.hash.slice(1) ?? '';
    if (!a || a.pathname !== window.location.pathname || !isSection(id)) return;
    lock = id;
    apply(id);
  });
  const unlock = () => {
    lock = null;
  };
  for (const ev of ['wheel', 'touchstart', 'keydown'] as const) {
    window.addEventListener(ev, unlock, { passive: true });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  measure();
}
