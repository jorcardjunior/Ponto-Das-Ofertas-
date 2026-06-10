import { log } from '../lib/logger.mjs';
import { readPrd } from '../lib/finder.mjs';
import { execSync } from 'node:child_process';

function safeExec(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf-8', stdio: 'pipe' });
  } catch (err) {
    return err.stdout?.toString() ?? '';
  }
}

export async function runPlan() {
  log.section('📋 Hefaisto — Plano de Execução');

  const prd = readPrd();
  if (!prd) {
    log.error('PRD não encontrado.');
    return;
  }

  const sections = prd.content
    .split(/\n##\s+/)
    .filter(Boolean)
    .map((s) => s.split('\n')[0].trim());

  log.info(`Seções detectadas no PRD: ${sections.length}`);

  const cycles = [
    { id: 1, name: 'Setup & Infra', steps: ['Configurar .env', 'Rodar `prisma migrate dev`', 'Validar build local'] },
    { id: 2, name: 'Auth & Layout', steps: ['Implementar sign-in/sign-up', 'Proteger rotas com middleware', 'Criar layout autenticado'] },
    { id: 3, name: 'Core: Produtos', steps: ['CRUD de produtos', 'CRUD de categorias', 'Métricas de dashboard'] },
    { id: 4, name: 'Quality & Polish', steps: ['Cobertura de testes ≥ 70%', 'A11y AA', 'Performance LCP < 2.5s'] },
    { id: 5, name: 'Ship', steps: ['CI verde', 'PR aberto', 'Deploy preview'] },
  ];

  log.section('Ciclos sugeridos');
  for (const c of cycles) {
    log.step(c.id, `${c.name}`);
    for (const s of c.steps) {
      console.log(`     ${log.c ? '' : '•'} ${s}`);
    }
  }

  log.section('Critérios de aceitação (do PRD)');
  const m = prd.content.match(/## 7\..*?(?=\n## |\n*$)/s);
  if (m) {
    console.log(m[0].split('\n').slice(0, 12).join('\n'));
  } else {
    log.warn('Seção 7 (Critérios de Aceitação) não encontrada no PRD.');
  }
}
