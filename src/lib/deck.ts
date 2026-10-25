/**
 * Talia kart w hero: kolejność i transformacje kart 1:1 z logiki wzorca (renderVals → cards).
 * Wspólne dla renderu (Etap 2, stan spoczynku) i skryptu interakcji (Etap 4).
 */
export const DECK_IDS = ['web', 'mobile', 'desktop'] as const;
export type DeckId = (typeof DECK_IDS)[number];

export interface DeckState {
  order: DeckId[];
  /** aktywna: płaska talia 2D (klik, Tab, przeciągnięcie) */
  active: boolean;
  /** zerknięcie: po ~0,3 s najechania */
  peek: boolean;
  dragging: boolean;
  dx: number;
  /** -1 / 1: przednia karta odlatuje w lewo / prawo */
  fly: number;
}

export const initialDeck: DeckState = {
  order: [...DECK_IDS],
  active: false,
  peek: false,
  dragging: false,
  dx: 0,
  fly: 0,
};

export interface CardView {
  front: boolean;
  transform: string;
  brightness: number;
  zIndex: number;
  delay: number;
}

export function cardView(id: DeckId, s: DeckState): CardView {
  const k = s.order.indexOf(id);
  const front = k === 0;
  const on = s.active || s.dragging;
  const peek = !on && s.peek;
  // tylne karty podjeżdżają, gdy ciągniesz przednią
  const pull = s.dragging ? Math.min(Math.abs(s.dx) / 140, 1) : 0;
  const kk = front ? 0 : Math.max(k - pull, 0);
  let transform: string;
  let op = 1;
  if (front && s.fly) {
    transform = `translate3d(${s.fly * 440}px, -24px, 0) rotate(${s.fly * 18}deg)`;
  } else if (front && s.dragging) {
    transform = `translate3d(${s.dx}px, ${-Math.abs(s.dx) * 0.04}px, 0) rotate(${s.dx * 0.05}deg)`;
  } else if (on) {
    transform = `translate3d(0, ${-kk * 24}px, 0) scale(${(1 - kk * 0.055).toFixed(3)})`;
    op = 1 - kk * 0.14;
  } else if (peek) {
    transform = `translate3d(0, ${-k * 50}px, ${-k * 100}px)`;
    op = 1 - k * 0.1;
  } else {
    transform = `translate3d(0, ${-k * 40}px, ${-k * 80}px)`;
    op = 1 - k * 0.12;
  }
  const delay = s.dragging ? 0 : (on ? k : 2 - k) * 45;
  return { front, transform, brightness: Number(op.toFixed(2)), zIndex: 30 - k, delay };
}

export function cardStyle(v: CardView): string {
  return `transform: ${v.transform}; filter: brightness(${v.brightness}); z-index: ${v.zIndex}; transition-delay: ${v.delay}ms`;
}

/** Następna karta na wierzch (przednia idzie na koniec). */
export function nextOrder(order: DeckId[]): DeckId[] {
  return [...order.slice(1), order[0]!];
}

export function prevOrder(order: DeckId[]): DeckId[] {
  return [order[order.length - 1]!, ...order.slice(0, -1)];
}

export function rotateTo(order: DeckId[], id: DeckId): DeckId[] {
  let o = order;
  for (let guard = 0; o[0] !== id && guard < order.length; guard++) o = nextOrder(o);
  return o;
}
