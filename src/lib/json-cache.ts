/** Kopie danych z API w src/data/ (commitowane): odczyt i zapis tylko przy zmianie treści. */
import { mkdir, readFile, writeFile } from 'node:fs/promises';

export async function readJson<T>(file: URL): Promise<T | null> {
  try {
    return JSON.parse(await readFile(file, 'utf8')) as T;
  } catch {
    return null;
  }
}

/** Zapisuje tylko przy zmianie danych (bez znacznika czasu: brak szumu w gicie). */
export async function writeJson(file: URL, data: unknown): Promise<boolean> {
  const next = `${JSON.stringify(data, null, 2)}\n`;
  const prev = await readFile(file, 'utf8').catch(() => '');
  if (prev === next) return false;
  await mkdir(new URL('.', file), { recursive: true });
  await writeFile(file, next);
  return true;
}
