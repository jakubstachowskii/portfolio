/** „KOPIUJ” → schowek, potem „SKOPIOWANO” na 2 s. Bez Clipboard API zostaje link mailto obok. */
const DONE_MS = 2000;

export function initCopyEmail(btn: HTMLButtonElement) {
  const label = btn.querySelector<HTMLElement>('[data-copy-label]');
  const idle = label?.textContent ?? '';
  const done = btn.dataset['labelDone'] ?? idle;
  const email = btn.dataset['copyEmail'] ?? '';
  let timer = 0;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      window.location.href = `mailto:${email}`;
      return;
    }
    btn.classList.add('done');
    if (label) label.textContent = done;
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      btn.classList.remove('done');
      if (label) label.textContent = idle;
    }, DONE_MS);
  };
  btn.addEventListener('click', () => void copy());
}
