import type { pl } from './pl';

export const en = {
  meta: {
    title: 'Portfolio',
    // TODO(content): opis strony do meta description
    description: 'Jakub — developer. Web, mobile and desktop apps.',
  },
  nav: {
    skip: 'Skip to content',
    label: 'Main',
    brandSub: 'dev',
    contact: 'CONTACT',
    links: {
      projekty: 'Projects',
      'o-mnie': 'About',
      stack: 'Stack',
    },
  },
  dots: {
    label: 'Page sections',
    items: {
      top: 'START',
      projekty: '01 PROJECTS',
      'o-mnie': '02 ABOUT',
      stack: '03 STACK',
      kontakt: '04 CONTACT',
    },
  },
  footer: {
    made: 'DESIGNED AND BUILT BY HAND',
    top: 'BACK TO TOP ↑',
  },
  ui: {
    theme: {
      toLight: 'Switch to light theme',
      toDark: 'Switch to dark theme',
    },
  },
} satisfies typeof pl;
