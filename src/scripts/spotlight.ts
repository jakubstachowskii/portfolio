/**
 * Snop światła za kursorem na scenach projektów (DESIGN.md §7.2 p. 3).
 * Tylko desktop (pointer: fine) i bez reduced-motion. rAF + lerp, bez bibliotek.
 */
const EASE = 0.08;
const REST = { x: 50, y: 40 };

export function initSpotlight(root: ParentNode = document): void {
  if (!matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;

  for (const stage of root.querySelectorAll<HTMLElement>('[data-stage]')) {
    if (stage.dataset['spotlight'] === 'on') continue;
    stage.dataset['spotlight'] = 'on';

    const target = { ...REST };
    const pos = { ...REST };
    let frame = 0;

    const tick = () => {
      pos.x += (target.x - pos.x) * EASE;
      pos.y += (target.y - pos.y) * EASE;
      stage.style.setProperty('--mx', `${pos.x}%`);
      stage.style.setProperty('--my', `${pos.y}%`);
      const moving = Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.1;
      frame = moving ? requestAnimationFrame(tick) : 0;
    };
    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    stage.addEventListener('pointermove', (event) => {
      const rect = stage.getBoundingClientRect();
      target.x = ((event.clientX - rect.left) / rect.width) * 100;
      target.y = ((event.clientY - rect.top) / rect.height) * 100;
      start();
    });
    stage.addEventListener('pointerleave', () => {
      Object.assign(target, REST);
      start();
    });
  }
}
