import type { Locale } from '@/config/site';

/** Szkic w podglądzie projektu (ProjectMock). `generic` = szkic dla repo bez własnego. */
export type MockKind = 'awizacja' | 'formatka' | 'lotto' | 'pig' | 'generic';

export interface Project {
  id: string;
  title: string;
  platforms: string;
  desc: Record<Locale, string>;
  tags: string[];
  repo: string;
  demo?: string;
  mock: MockKind;
}

const GH = 'https://github.com/jakubstachowskii/';

/**
 * Etap 2: lista statyczna 1:1 ze wzorca (opisy na podstawie README repozytoriów).
 * Etap 3 zastępuje ją danymi z GitHub API + nadpisaniami z src/content/projects/.
 */
export const staticProjects: Project[] = [
  {
    id: 'awizacja',
    title: 'Awizacja App',
    platforms: 'DESKTOP',
    desc: {
      pl: 'Aplikacja do obsługi punktu skupu zbóż: kalendarz awizacji, przyjęcia na skupie, magazyn, kontrola jakości i sprzedaż. Wszystko w lokalnej bazie SQLite.',
      en: 'An app for running a grain purchase point: delivery booking calendar, intake, warehouse, quality control and sales. Everything in a local SQLite database.',
    },
    tags: ['Electron', 'React', 'SQLite'],
    repo: `${GH}AwizacjaApp`,
    mock: 'awizacja',
  },
  {
    id: 'formatka',
    title: 'Formatka App',
    platforms: 'DESKTOP',
    desc: {
      pl: 'Lokalna aplikacja do planowania zabudowy i rozkroju mebli. Projekty, katalog i historia rozkrojów zapisują się w bazie SQLite.',
      en: 'A local app for planning furniture builds and board cutting. Projects, the catalogue and cutting history are stored in SQLite.',
    },
    tags: ['Electron', 'React', 'Vite', 'SQLite'],
    repo: `${GH}FormatkaApp`,
    mock: 'formatka',
  },
  {
    id: 'lotto',
    title: 'Lotto Analyzer',
    platforms: 'DESKTOP',
    desc: {
      pl: 'Aplikacja do analizy wyników Lotto: statystyki częstości liczb, historia losowań, import CSV i pobieranie najnowszych wyników. Projekt edukacyjny.',
      en: 'An app for analysing Lotto results: number frequency stats, draw history, CSV import and fetching the latest results. An educational project.',
    },
    tags: ['Electron', 'JavaScript', 'SQLite'],
    repo: `${GH}LottoAnalyzer`,
    mock: 'lotto',
  },
  {
    id: 'pig',
    title: 'Pig Game',
    platforms: 'WEB',
    desc: {
      pl: 'Gra w kości „Pig” w przeglądarce, napisana w czystym HTML, CSS i JavaScripcie.',
      en: 'The “Pig” dice game in the browser, written in plain HTML, CSS and JavaScript.',
    },
    tags: ['HTML', 'CSS', 'JavaScript'],
    repo: `${GH}Pig-Game`,
    mock: 'pig',
  },
];
