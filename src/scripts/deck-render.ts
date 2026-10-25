import { cardStyle, cardView, type DeckId, type DeckState } from '@/lib/deck';

/** Elementy talii (atrybuty data-deck* z HeroDeck.astro). */
export interface DeckDom {
  scene: HTMLElement;
  stage: HTMLElement;
  deck: HTMLElement;
  ctrl: HTMLElement;
  hint: HTMLElement;
  cards: Map<DeckId, HTMLElement>;
  inds: Map<DeckId, HTMLButtonElement>;
}

export function queryDeck(scene: HTMLElement): DeckDom | null {
  const stage = scene.querySelector<HTMLElement>('[data-deck-stage]');
  const deck = scene.querySelector<HTMLElement>('[data-deck-cards]');
  const ctrl = scene.querySelector<HTMLElement>('[data-deck-ctrl]');
  const hint = scene.querySelector<HTMLElement>('[data-deck-hint]');
  if (!stage || !deck || !ctrl || !hint) return null;
  const byId = <T extends HTMLElement>(sel: string, attr: string) =>
    new Map([...scene.querySelectorAll<T>(sel)].map((el) => [el.getAttribute(attr) as DeckId, el]));
  return {
    scene,
    stage,
    deck,
    ctrl,
    hint,
    cards: byId<HTMLElement>('[data-card]', 'data-card'),
    inds: byId<HTMLButtonElement>('[data-deck-ind]', 'data-deck-ind'),
  };
}

/** Stan → DOM (odpowiednik renderVals() wzorca dla talii). */
export function renderDeck(dom: DeckDom, s: DeckState) {
  const on = s.active || s.dragging;
  dom.deck.classList.toggle('flat', on);
  dom.deck.classList.toggle('peek', !on && s.peek);
  dom.stage.classList.toggle('active', on);
  dom.ctrl.classList.toggle('show', on);
  const hint = on ? dom.hint.dataset['active'] : dom.hint.dataset['idle'];
  if (hint && dom.hint.textContent !== hint) dom.hint.textContent = hint;

  for (const [id, el] of dom.cards) {
    const v = cardView(id, s);
    el.setAttribute('style', cardStyle(v));
    el.classList.toggle('front', v.front);
    el.classList.toggle('live', v.front && on);
    el.classList.toggle('dragging', v.front && s.dragging);
    el.setAttribute('aria-hidden', v.front ? 'false' : 'true');
  }
  for (const [id, btn] of dom.inds) {
    const isFront = s.order[0] === id;
    btn.classList.toggle('on', isFront);
    btn.setAttribute('aria-pressed', isFront ? 'true' : 'false');
  }
}
