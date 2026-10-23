import type { Locale, SectionId } from '@/config/site';
import { getLocalizedPath } from '@/lib/paths';

/**
 * Link do sekcji strony głównej. Na stronie głównej sama kotwica (płynny scroll),
 * na podstronach adres strony głównej w danym języku + kotwica.
 */
export function sectionHref(id: SectionId, locale: Locale, onHome: boolean): string {
  return onHome ? `#${id}` : `${getLocalizedPath('/', locale)}#${id}`;
}
