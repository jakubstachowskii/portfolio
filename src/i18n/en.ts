import type { pl } from './pl';

export const en = {
  meta: {
    title: 'Desktop and web application developer',
    description:
      'Developer and computer science student. I build desktop and web apps — here you’ll find my projects and how to reach me.',
  },
  nav: {
    skip: 'Skip to content',
    label: 'Main',
    brandSub: 'dev',
    contact: 'CONTACT',
    lang: { short: 'PL', label: 'Wersja polska', code: 'pl' },
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
    made: 'BUILT WITH ASTRO AND TYPESCRIPT',
    top: 'BACK TO TOP ↑',
  },
  home: {
    hero: {
      status: 'STATUS: OPEN TO OFFERS',
      lines: ['Hi,', 'I’m', 'Jakub.'],
      lead: 'I build desktop and web apps. What I enjoy most is taking something people do by hand or on paper and turning it into a program that does it for them. I’m studying computer science, specialising in cybersecurity.',
      ctaProjects: 'SEE PROJECTS',
      ctaGithub: 'GITHUB',
      ctaCv: 'CV.PDF ↓',
    },
    deck: {
      label:
        'Cards showing types of applications: web, mobile and desktop. Press Enter to browse; arrow keys change the card; Esc exits.',
      hintIdle: 'click to browse',
      hintActive: 'drag the card or use ← →',
      prev: 'Previous card',
      next: 'Next card',
      show: 'Show card',
      cards: {
        web: { label: 'WEB', title: 'Web apps', sub: 'run in the browser' },
        mobile: { label: 'MOBILE', title: 'Mobile apps', sub: 'for phone and tablet' },
        desktop: { label: 'DESKTOP', title: 'Desktop apps', sub: 'installed on your computer' },
      },
    },
    tape: ['Desktop apps', 'Web apps', 'JavaScript', 'React', 'Electron', 'Cybersecurity'],
    projects: {
      kicker: '01 — PROJECTS',
      title: ['My', 'projects.'],
      lead: 'They’re all on my GitHub. Hover over or click a project to see a preview.',
      all: 'All repositories ↗',
      preview: 'PREVIEW',
      tech: 'Technologies',
      demo: 'VIEW ↗',
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
      kicker: 'GITHUB',
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
      title: ['A bit', 'about me.'],
      lead: 'I like software that solves a specific problem. That’s how my projects started: an app for delivery bookings and grain purchases that used to be kept on paper, and a program for furniture cutting plans that used to be worked out by hand.',
      body: 'I study computer science at WSB Merito University in Chorzów, specialising in cybersecurity. So in every project I also think about how to protect data and who should have access to what.',
      facts: {
        role: ['ROLE', 'Developer'],
        platforms: ['PLATFORMS', 'Desktop · Web'],
        spec: ['SPECIALISATION', 'Cybersecurity'],
        school: ['UNIVERSITY', 'WSB Merito Chorzów'],
        city: ['LOCATION', ''],
        rule: ['DAY TO DAY', 'JavaScript · React · Electron'],
      },
      steps: [
        {
          title: 'Problem first',
          text: 'Before I write any code, I want to understand what is taking someone’s time. I pick the technology after that.',
        },
        {
          title: 'Security from day one',
          text: 'I think about access and data protection from the first day, not at the very end.',
        },
        {
          title: 'To a working version',
          text: 'I like finishing things: from an idea to a program someone can install and use.',
        },
      ],
    },
    stack: {
      kicker: '03 — STACK',
      title: ['What', 'I use.'],
      cats: { web: 'WEB', ui: 'UI', desktop: 'DESKTOP', data: 'DATABASES', tools: 'TOOLS' },
    },
    contact: {
      kicker: '04 — CONTACT',
      title: ['Get in', 'touch.'],
      copy: 'COPY',
      copied: 'COPIED',
      github: 'GITHUB ↗',
      linkedin: 'LINKEDIN ↗',
      tape: 'Let’s talk',
    },
  },
  project: {
    back: '← Projects',
    details: 'Details →',
    demo: 'DEMO ↗',
    code: 'CODE ON GITHUB ‹/›',
    tech: 'Technologies',
    gallery: 'Gallery',
    others: 'Other projects',
    prev: 'Previous',
    next: 'Next',
  },
  notFound: {
    title: 'Page not found',
    description: 'There is no page at this address.',
    code: '404',
    text: 'This page doesn’t exist.',
    cta: 'BACK TO START',
  },
  ui: {
    theme: {
      toLight: 'Switch to light theme',
      toDark: 'Switch to dark theme',
    },
  },
} satisfies typeof pl;
