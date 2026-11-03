/**
 * Talia kart w hero: interakcje 1:1 z logiki wzorca (deckDown, fling, prev, rotateTo).
 * Tryby: spoczynek → zerknięcie (~0,3 s najechania) → aktywna (klik, Tab, przeciągnięcie).
 * Wyjście: Esc, utrata fokusu, opuszczenie myszą na ~1 s.
 */
import { initialDeck, nextOrder, prevOrder, rotateTo, type DeckState } from '@/lib/deck';
import { queryDeck, renderDeck } from '@/scripts/deck-render';

const PEEK_DELAY = 280;
const LEAVE_DELAY = 1000;
const FLY_MS = 360;
/** przeciągnięcie dalej niż próg albo szybkie „pstryknięcie” przerzuca kartę */
const DRAG_THRESHOLD = 90;
const FLICK_SPEED = 0.6;
const FLICK_MIN = 25;
const MOVE_START = 6;

export function initDeck(scene: HTMLElement) {
  const dom = queryDeck(scene);
  if (!dom) return;
  let s: DeckState = { ...initialDeck, order: [...initialDeck.order] };
  let peekT = 0;
  let leaveT = 0;
  let flyT = 0;
  let raf = 0;

  const set = (patch: Partial<DeckState>) => {
    s = { ...s, ...patch };
    renderDeck(dom, s);
  };
  const activate = () => {
    window.clearTimeout(leaveT);
    if (!s.active) set({ active: true, peek: false });
  };
  /** powrót do spoczynku z oddaniem fokusu (bez tego Safari na iOS trzymałby talię aktywną) */
  const rest = () => {
    const focused = document.activeElement;
    if (focused instanceof HTMLElement && scene.contains(focused)) focused.blur();
    set({ active: false, peek: false });
  };
  const fling = (dir: number) => {
    if (s.fly) return;
    set({ fly: dir, dragging: false, dx: 0, active: true });
    window.clearTimeout(flyT);
    flyT = window.setTimeout(() => set({ order: nextOrder(s.order), fly: 0 }), FLY_MS);
  };
  const prev = () => {
    if (!s.fly) set({ order: prevOrder(s.order), active: true });
  };

  // ── przeciąganie przedniej karty ──
  for (const [id, card] of dom.cards) {
    card.addEventListener('pointerdown', (e) => {
      if (s.order[0] !== id || s.fly) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      // stan sprzed kliknięcia odczytujemy PRZED fokusem: fokus sam aktywuje talię
      const wasActive = s.active;
      const mouse = e.pointerType === 'mouse';
      // fokus aktywuje talię: przy dotyku dopiero po stuknięciu albo przeciągnięciu w bok,
      // bo palec na karcie to często początek przewijania strony
      const focusScene = () => scene.focus({ preventScroll: true, focusVisible: false });
      if (mouse) {
        e.preventDefault(); // bez zaznaczania tekstu
        // preventDefault blokuje fokus — ustawiamy ręcznie; focusVisible: false, bo to klik myszą
        // (inaczej przy pierwszym kliknięciu Chrome rysuje ramkę jak dla klawiatury)
        focusScene();
      }
      window.clearTimeout(leaveT);
      const sx = e.clientX;
      const sy = e.clientY;
      let lastX = e.clientX;
      let lastT = performance.now();
      let vel = 0;
      let moved = false;
      let dx = 0;
      try {
        card.setPointerCapture(e.pointerId);
      } catch {
        // przechwycenie niedostępne: ruch i tak śledzimy na window
      }
      const onMove = (ev: PointerEvent) => {
        if (ev.pointerType === 'mouse' && ev.buttons === 0) return onUp();
        const now = performance.now();
        dx = ev.clientX - sx;
        const dy = ev.clientY - sy;
        if (now > lastT) vel = (ev.clientX - lastX) / (now - lastT);
        lastX = ev.clientX;
        lastT = now;
        // ruch w pionie przed poziomym = przewijanie strony: talia zostaje albo wraca do spoczynku
        if (!moved && !mouse && Math.abs(dy) > MOVE_START && Math.abs(dy) > Math.abs(dx)) {
          stop();
          if (s.active) rest();
          return;
        }
        if (!moved && Math.abs(dx) > MOVE_START) {
          moved = true;
          if (!mouse) focusScene();
          set({ dragging: true, active: true, peek: false });
        }
        if (!moved || raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          set({ dx });
        });
      };
      // przeglądarka przejęła gest (przewijanie): bez aktywacji i bez przerzucania karty
      const onCancel = () => {
        stop();
        if (moved) set({ dragging: false, dx: 0 });
      };
      const onUp = () => {
        stop();
        if (!mouse && !moved) focusScene(); // stuknięcie palcem = jak klik
        const quick = Math.abs(vel) > FLICK_SPEED && Math.abs(dx) > FLICK_MIN;
        if (moved && (Math.abs(dx) > DRAG_THRESHOLD || quick)) fling((dx || vel) > 0 ? 1 : -1);
        else if (!moved && wasActive)
          fling(1); // klik w aktywną talię = następna karta
        else if (!moved)
          set({ active: true, peek: false }); // pierwszy klik tylko aktywuje
        else set({ dragging: false, dx: 0 });
      };
      const stop = () => {
        cancelAnimationFrame(raf);
        raf = 0;
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
        window.removeEventListener('pointercancel', onCancel);
        window.removeEventListener('blur', onUp);
      };
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
      window.addEventListener('pointercancel', onCancel);
      window.addEventListener('blur', onUp);
    });
  }

  // ── przyciski pod talią ──
  const button = (el: Element | null, fn: () => void) =>
    el?.addEventListener('click', (e) => {
      e.stopPropagation();
      fn();
    });
  button(scene.querySelector('[data-deck-prev]'), prev);
  button(scene.querySelector('[data-deck-next]'), () => fling(1));
  for (const [id, btn] of dom.inds) {
    button(btn, () => !s.fly && set({ order: rotateTo(s.order, id), active: true }));
  }

  // ── tryby: najechanie, fokus, klawiatura ──
  dom.stage.addEventListener('click', activate);
  scene.addEventListener('mouseenter', () => {
    window.clearTimeout(leaveT);
    window.clearTimeout(peekT);
    peekT = window.setTimeout(() => set({ peek: true }), PEEK_DELAY);
  });
  scene.addEventListener('mouseleave', () => {
    window.clearTimeout(peekT);
    if (s.peek) set({ peek: false });
    window.clearTimeout(leaveT);
    if (s.active && !s.dragging) {
      leaveT = window.setTimeout(() => set({ active: false }), LEAVE_DELAY);
    }
  });
  scene.addEventListener('focusin', activate);
  scene.addEventListener('focusout', (e) => {
    const next = e.relatedTarget as Node | null;
    if (next && scene.contains(next)) return;
    if (s.active && !s.dragging) set({ active: false });
  });
  // Safari na iOS nie zdejmuje fokusu po stuknięciu w tło strony, więc focusout nie przychodzi:
  // dotknięcie gdziekolwiek poza talią (także początek przewijania) wraca do spoczynku
  document.addEventListener('pointerdown', (e) => {
    if (s.active && !s.dragging && !scene.contains(e.target as Node)) rest();
  });
  scene.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      fling(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    } else if (e.key === 'Escape') {
      set({ active: false });
    } else if ((e.key === 'Enter' || e.key === ' ') && e.target === scene) {
      e.preventDefault();
      activate();
    }
  });
}
