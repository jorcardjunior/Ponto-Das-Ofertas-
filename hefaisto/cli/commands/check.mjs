import { log } from '../lib/logger.mjs';
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(process.cwd());

function runStep(label, cmd) {
  process.stdout.write(`  ${label.padEnd(30)}`);
  try {
    const out = execSync(cmd, { encoding: 'utf-8', stdio: 'pipe', cwd: ROOT });
    const lines = out.split('\n').filter(Boolean).length;
    console.log(log.c('green', `✓ OK`) + ` (${lines} linhas)`);
    return true;
  } catch (err) {
    console.log(log.c('red', '✗ FALHOU'));
    if (err.stdout) console.log(err.stdout.toString());
    if (err.stderr) console.error(err.stderr.toString());
    return false;
  }
}

export async function runCheck() {
  log.section('🔍 Hefaisto — Quality Check');

  const checks = [
    { label: 'TypeScript', cmd: 'npx tsc --noEmit' },
    { label: 'ESLint', cmd: 'npm run lint --silent' },
    { label: 'Testes', cmd: 'npm test --silent -- --run' },
    { label: 'Build', cmd: 'npm run build --silent' },
  ];

  let pass = 0;
  for (const c of checks) {
    const ok = runStep(c.label, c.cmd);
    if (ok) pass++;
  }

  log.section('Resumo');
  log.info(`${pass}/${checks.length} checks passaram.`);

  if (pass === checks.length) {
    log.success('Pronto para SHIP 🚀');
  } else {
    log.warn('Corrija as falhas antes de prosseguir.');
    process.exit(1);
  }
}
