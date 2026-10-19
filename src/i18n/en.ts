import type { pl } from './pl';

export const en = {
  meta: {
    title: 'Portfolio',
    // TODO(content): opis strony do meta description (CONTENT-CHECKLIST → rola + zdanie wartości)
    description: 'TODO(content): opis strony',
  },
  home: {
    heading: 'Portfolio',
  },
  ui: {
    theme: {
      toLight: 'Switch to light theme',
      toDark: 'Switch to dark theme',
    },
    lang: {
      switchLabel: 'Switch to the Polish version',
      short: 'PL',
    },
    link: {
      external: '(external site)',
    },
    toast: {
      close: 'Dismiss notification',
    },
    availability: {
      open: 'Open to work',
      busy: 'Currently busy',
      off: 'Unavailable',
    },
    projectStatus: {
      live: 'live',
      'in-progress': 'in progress',
      archived: 'archived',
    },
  },
} satisfies typeof pl;
