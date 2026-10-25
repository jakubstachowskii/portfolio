import { describe, expect, it } from 'vitest';
import { filterRepos, prettifyName, readmeExcerpt } from '@/lib/github';
import { repo } from './fixtures';

describe('filterRepos', () => {
  it('odrzuca forki, archiwa, ukryte z listy i z topikiem portfolio-hide', () => {
    const list = [
      repo('AwizacjaApp'),
      repo('Fork', { fork: true }),
      repo('Old', { archived: true }),
      repo('portfolio'),
      repo('Pig-Game', { topics: ['portfolio-hide'] }),
    ];
    expect(filterRepos(list, ['Portfolio']).map((r) => r.name)).toEqual(['AwizacjaApp']);
  });
});

describe('prettifyName', () => {
  it.each([
    ['AwizacjaApp', 'Awizacja App'],
    ['Pig-Game', 'Pig Game'],
    ['LottoAnalyzer', 'Lotto Analyzer'],
    ['my_tool', 'My Tool'],
    ['HTMLParser', 'HTML Parser'],
  ])('%s → %s', (input, out) => {
    expect(prettifyName(input)).toBe(out);
  });
});

describe('readmeExcerpt', () => {
  it('pierwszy akapit tekstu, bez nagłówków i formatowania', () => {
    const md = `# AwizaxjaApp – Grain Logistics

Aplikacja desktopowa (Electron + React + SQLite) do **zarządzania** punktem skupu zbóż.

## Moduły

| Moduł | Opis |`;
    expect(readmeExcerpt(md)).toBe(
      'Aplikacja desktopowa (Electron + React + SQLite) do zarządzania punktem skupu zbóż.',
    );
  });

  it('pomija odznaki, obrazki, listy i kod; linki zostawia jako tekst', () => {
    const md = `# X\n\n[![CI](b.svg)](ci)\n\n- punkt\n\n\`\`\`bash\nnpm i\n\`\`\`\n\nZobacz [demo](https://x.dev) online.`;
    expect(readmeExcerpt(md)).toBe('Zobacz demo online.');
  });

  it('tnie długi tekst na granicy słowa', () => {
    const out = readmeExcerpt(`# T\n\n${'słowo '.repeat(80)}`, 40)!;
    expect(out.length).toBeLessThanOrEqual(41);
    expect(out.endsWith('słowo…')).toBe(true);
  });

  it('brak akapitu → null', () => {
    expect(readmeExcerpt('# Tylko nagłówek\n\n## I drugi')).toBeNull();
  });
});
