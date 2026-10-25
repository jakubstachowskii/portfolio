import type { pl } from './pl';

export const en = {
  meta: {
    title: 'Developer: web, mobile and desktop apps',
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
  home: {
    hero: {
      status: 'STATUS: OPEN TO PROJECTS',
      lines: ['I write code', 'that gets the', 'job done.'],
      lead: 'I’m a developer. I build desktop, mobile and web apps that take over what people still do by hand — from delivery bookings to furniture cutting plans.',
      ctaProjects: 'SEE PROJECTS',
      ctaGithub: 'GITHUB',
      ctaCv: 'CV.PDF ↓',
    },
    deck: {
      label:
        'Card stack: web, mobile and desktop apps. Press Enter to browse; arrow keys change the card; Esc exits.',
      hintIdle: 'click to browse',
      hintActive: 'drag the card or use ← →',
      prev: 'Previous card',
      next: 'Next card',
      show: 'Show card',
      cards: {
        web: { label: 'WEB', title: 'Web apps', sub: 'in every browser' },
        mobile: { label: 'MOBILE', title: 'Mobile apps', sub: 'in your pocket, in the field' },
        desktop: { label: 'DESKTOP', title: 'Desktop apps', sub: 'everyday tools' },
      },
    },
    tape: ['Desktop', 'Mobile', 'Web', 'From idea to launch', 'Cybersecurity'],
    projects: {
      kicker: '01 — PROJECT INDEX',
      title: ['Things that', 'work.'],
      lead: 'Projects straight from my GitHub. Hover or click to see a preview.',
      all: 'All repositories ↗',
      preview: 'PREVIEW',
      tech: 'Technologies',
      demo: 'VIEW ↗',
      code: 'CODE ON GITHUB ‹/›',
    },
    mocks: {
      booking: 'BOOKING',
      delivery: 'DELIVERY',
      send: 'SEND',
      sent: 'Sent',
      freq: 'NUMBER FREQUENCY',
      year: 'YEAR',
      player: 'PLAYER',
    },
    gh: {
      label: 'GitHub activity',
      kicker: 'LIVE — GITHUB',
      title: ['Code', 'on GitHub.'],
      repos: {
        one: 'public repository',
        few: 'public repositories',
        many: 'public repositories',
        other: 'public repositories',
      },
      lastCommit: 'last commit',
      calendar: 'Contribution calendar: {total} in the last {weeks} weeks',
      less: 'less',
      more: 'more',
    },
    about: {
      kicker: '02 — ABOUT',
      title: ['I start with', 'what hurts.'],
      lead: 'Delivery bookings and grain purchases kept on paper, furniture cuts worked out on a scrap of paper. I take a problem like that and build a tool that does it for people.',
      body: 'I study computer science with a cybersecurity specialisation, so I think about security from the first line of code, not after launch.',
      facts: {
        role: ['ROLE', 'Developer'],
        platforms: ['PLATFORMS', 'Desktop · Mobile · Web'],
        spec: ['SPECIALISATION', 'Cybersecurity'],
        school: ['UNIVERSITY', 'WSB Merito Chorzów'],
        city: ['LOCATION', ''],
        rule: ['PRINCIPLE', 'Simple, solid, secure.'],
      },
      steps: [
        {
          title: 'A concrete problem',
          text: 'I start with what eats people’s time — the technology comes after.',
        },
        {
          title: 'Secure from the start',
          text: 'I design permissions, data and access together with features, not at the end.',
        },
        {
          title: 'All the way',
          text: 'From the idea to a working version you can hand to users.',
        },
      ],
    },
    stack: {
      kicker: '03 — STACK',
      title: ['The', 'toolbox.'],
      cats: { web: 'WEB', ui: 'UI', desktop: 'DESKTOP', data: 'DATA', tools: 'TOOLS' },
    },
    contact: {
      kicker: '04 — CONTACT',
      title: ['Write', 'to me.'],
      copy: 'COPY',
      copied: 'COPIED',
      github: 'GITHUB ↗',
      linkedin: 'LINKEDIN ↗',
      tape: 'Let’s talk',
    },
  },
  project: {
    back: '← Projects',
    details: 'Details →',
    demo: 'DEMO ↗',
    code: 'CODE ON GITHUB ‹/›',
    tech: 'Technologies',
    gallery: 'Gallery',
    others: 'Other projects',
    prev: 'Previous',
    next: 'Next',
  },
  notFound: {
    title: 'Page not found',
    description: 'This page does not exist.',
    code: '404',
    text: 'This page is not here.',
    cta: 'BACK TO START',
  },
  ui: {
    theme: {
      toLight: 'Switch to light theme',
      toDark: 'Switch to dark theme',
    },
  },
} satisfies typeof pl;
