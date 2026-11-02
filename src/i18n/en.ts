import type { pl } from './pl';

export const en = {
  meta: {
    title: 'Desktop and web application developer',
    description:
      'Developer and computer science student (cybersecurity specialisation). I build desktop and web applications in JavaScript, React and Electron that automate everyday work.',
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
      stack: '03 TECHNOLOGIES',
      kontakt: '04 CONTACT',
    },
  },
  footer: {
    made: 'BUILT WITH ASTRO AND TYPESCRIPT',
    top: 'BACK TO TOP ↑',
  },
  home: {
    hero: {
      status: 'STATUS: OPEN TO COLLABORATION',
      lines: ['Code that', 'makes work', 'easier.'],
      lead: 'I’m a developer and a computer science student. I build desktop and web applications that automate everyday work — from delivery bookings at a grain purchase point to furniture cutting plans.',
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
        desktop: { label: 'DESKTOP', title: 'Desktop apps', sub: 'installed locally' },
      },
    },
    tape: [
      'Desktop applications',
      'Web applications',
      'Process automation',
      'From analysis to deployment',
      'Cybersecurity',
    ],
    projects: {
      kicker: '01 — PROJECTS',
      title: ['Selected', 'projects.'],
      lead: 'Applications from my GitHub, with a description, technologies and source code. Hover over or click a project to see a preview.',
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
      kicker: 'ACTIVITY — GITHUB',
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
      title: ['From problem', 'to product.'],
      lead: 'I build software around specific needs: delivery bookings and grain purchases kept on paper, furniture cuts worked out by hand. I analyse the process, design the solution and take it to a working version.',
      body: 'I study computer science at WSB Merito University in Chorzów, specialising in cybersecurity. That is why I plan data protection and access control from the start of a project, not just before release.',
      facts: {
        role: ['ROLE', 'Developer'],
        platforms: ['PLATFORMS', 'Desktop · Web'],
        spec: ['SPECIALISATION', 'Cybersecurity'],
        school: ['UNIVERSITY', 'WSB Merito Chorzów'],
        city: ['LOCATION', ''],
        rule: ['MAIN TECHNOLOGIES', 'JavaScript · React · Electron'],
      },
      steps: [
        {
          title: 'Understanding needs',
          text: 'I start by understanding the process and the user’s problem, then choose technology that fits the requirements.',
        },
        {
          title: 'Security from day one',
          text: 'I plan permissions, data protection and access control together with features, not at the end.',
        },
        {
          title: 'The full cycle',
          text: 'I take a project from the idea, through implementation and testing, to a version ready for users.',
        },
      ],
    },
    stack: {
      kicker: '03 — STACK',
      title: ['Technologies', '& tools.'],
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
    text: 'Page not found.',
    cta: 'BACK TO START',
  },
  ui: {
    theme: {
      toLight: 'Switch to light theme',
      toDark: 'Switch to dark theme',
    },
  },
} satisfies typeof pl;
