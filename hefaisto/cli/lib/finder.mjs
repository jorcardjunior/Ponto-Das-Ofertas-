import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(process.cwd());

export function findPrd() {
  const candidates = ['docs/PRD.md', 'PRD.md', 'prd.md', 'PRD.txt'];
  for (const rel of candidates) {
    const full = join(ROOT, rel);
    if (existsSync(full)) return { path: full, rel };
  }
  return null;
}

export function readPrd() {
  const found = findPrd();
  if (!found) return null;
  return { ...found, content: readFileSync(found.path, 'utf-8') };
}

export function listStories() {
  const dir = join(ROOT, 'docs', 'stories');
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({ name: f, path: join(dir, f) }));
}

export function listResources() {
  const dir = join(ROOT, 'brand-brain', '03-resources');
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => f.endsWith('.md'));
}

export function listAreas() {
  const dir = join(ROOT, 'brand-brain', '02-areas');
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => f.endsWith('.md'));
}

export function pathExists(rel) {
  return existsSync(join(ROOT, rel));
}

export function isDir(rel) {
  const p = join(ROOT, rel);
  return existsSync(p) && statSync(p).isDirectory();
}
