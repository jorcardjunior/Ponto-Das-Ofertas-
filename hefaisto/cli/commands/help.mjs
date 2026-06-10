import { log, c } from '../lib/logger.mjs';

export async function runHelp() {
  log.section('🔥 Hefaisto CLI — Ajuda');

  const commands = [
    { cmd: 'init', desc: 'Inicializa o projeto a partir do PRD' },
    { cmd: 'plan', desc: 'Mostra o plano de execução em ciclos' },
    { cmd: 'check', desc: 'Roda todos os checks de qualidade (typecheck, lint, test, build)' },
    { cmd: 'status', desc: 'Mostra o status geral do projeto' },
    { cmd: 'help', desc: 'Mostra esta ajuda' },
  ];

  for (const item of commands) {
    console.log(`  ${c('cyan', item.cmd.padEnd(10))} ${item.desc}`);
  }

  console.log('\nAtalhos npm:');
  console.log('  npm run hefaisto:init   →  hefaisto init');
  console.log('  npm run hefaisto:plan   →  hefaisto plan');
  console.log('  npm run hefaisto:check  →  hefaisto check');
}
