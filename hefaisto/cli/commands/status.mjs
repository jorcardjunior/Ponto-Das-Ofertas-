import { log, c } from '../lib/logger.mjs';
import { readPrd, listAreas, listResources, listStories } from '../lib/finder.mjs';
import { existsSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';

const ROOT = resolve(process.cwd());

function line(label, value, ok) {
  const symbol = ok ? c('green', '✓') : c('red', '✗');
  console.log(`  ${symbol} ${label.padEnd(32)} ${value}`);
}

export async function runStatus() {
  log.section('📊 Hefaisto — Status do Projeto');

  const checks = [];

  // PRD
  const prd = readPrd();
  checks.push({ ok: !!prd, label: 'PRD (docs/PRD.md)', value: prd ? `${prd.content.length} chars` : 'ausente' });

  // Brand brain
  checks.push({ ok: listAreas().length > 0, label: 'brand-brain/02-areas', value: `${listAreas().length} arquivos` });
  checks.push({ ok: listResources().length > 0, label: 'brand-brain/03-resources', value: `${listResources().length} arquivos` });

  // Stories
  const stories = listStories();
  checks.push({ ok: true, label: 'docs/stories', value: `${stories.length} stories` });

  // Prisma
  checks.push({ ok: existsSync(join(ROOT, 'prisma/schema.prisma')), label: 'Prisma schema', value: existsSync(join(ROOT, 'prisma/schema.prisma')) ? 'presente' : 'ausente' });

  // Middleware
  checks.push({ ok: existsSync(join(ROOT, 'middleware.ts')), label: 'Auth middleware', value: existsSync(join(ROOT, 'middleware.ts')) ? 'presente' : 'ausente' });

  // CI
  checks.push({ ok: existsSync(join(ROOT, '.github/workflows/ci.yml')), label: 'CI/CD (GitHub Actions)', value: existsSync(join(ROOT, '.github/workflows/ci.yml')) ? 'presente' : 'ausente' });

  // Tests
  checks.push({ ok: existsSync(join(ROOT, 'vitest.config.ts')), label: 'Vitest config', value: existsSync(join(ROOT, 'vitest.config.ts')) ? 'presente' : 'ausente' });

  // Node modules
  checks.push({ ok: existsSync(join(ROOT, 'node_modules')), label: 'node_modules', value: existsSync(join(ROOT, 'node_modules')) ? 'instalado' : 'rode npm install' });

  for (const c of checks) {
    line(c.label, c.value, c.ok);
  }

  const pass = checks.filter((c) => c.ok).length;
  log.info(`\n  ${pass}/${checks.length} checks verdes`);
}
