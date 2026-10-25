import { describe, expect, it } from 'vitest';
import { cardView, initialDeck, nextOrder, prevOrder, rotateTo } from '@/lib/deck';

describe('talia kart', () => {
  it('spoczynek: lekkie 3D, przednia na wierzchu', () => {
    const front = cardView('web', initialDeck);
    const back = cardView('desktop', initialDeck);
    expect(front).toMatchObject({ front: true, zIndex: 30, brightness: 1, delay: 90 });
    expect(back.transform).toBe('translate3d(0, -80px, -160px)');
    expect(back.brightness).toBe(0.76);
  });

  it('aktywna: płaska talia ze skalą', () => {
    const v = cardView('mobile', { ...initialDeck, active: true });
    expect(v.transform).toBe('translate3d(0, -24px, 0) scale(0.945)');
    expect(v.delay).toBe(45);
  });

  it('odlot przedniej karty w prawo', () => {
    expect(cardView('web', { ...initialDeck, fly: 1 }).transform).toBe(
      'translate3d(440px, -24px, 0) rotate(18deg)',
    );
  });

  it('kolejność: następna, poprzednia, obrót do karty', () => {
    expect(nextOrder(['web', 'mobile', 'desktop'])).toEqual(['mobile', 'desktop', 'web']);
    expect(prevOrder(['web', 'mobile', 'desktop'])).toEqual(['desktop', 'web', 'mobile']);
    expect(rotateTo(['web', 'mobile', 'desktop'], 'desktop')).toEqual(['desktop', 'web', 'mobile']);
  });
});
