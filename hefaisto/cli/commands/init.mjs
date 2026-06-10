import { log } from '../lib/logger.mjs';
import { readPrd, findPrd, listAreas, listResources } from '../lib/finder.mjs';

export async function runInit() {
  log.section('🔥 Hefaisto — Inicialização do Projeto');

  log.step(1, 'Procurando PRD...');
  const prd = readPrd();

  if (!prd) {
    log.error('PRD não encontrado.');
    log.info('Crie docs/PRD.md com base no template ou descreva o projeto ao Gaios.');
    process.exit(1);
  }

  log.success(`PRD encontrado: ${prd.rel} (${prd.content.length} caracteres)`);

  log.step(2, 'Validando estrutura do brand-brain...');
  const areas = listAreas();
  const resources = listResources();

  if (areas.length === 0) {
    log.warn('brand-brain/02-areas está vazia. Considere popular com dados do projeto.');
  } else {
    log.success(`${areas.length} áreas encontradas: ${areas.join(', ')}`);
  }

  if (resources.length === 0) {
    log.warn('brand-brain/03-resources está vazio.');
  } else {
    log.success(`${resources.length} resources encontrados: ${resources.join(', ')}`);
  }

  log.step(3, 'Resumo do projeto:');
  const titleMatch = prd.content.match(/^# PRD\s*—\s*(.+)$/m);
  if (titleMatch) {
    log.info(`Projeto: ${titleMatch[1].trim()}`);
  }

  const statusMatch = prd.content.match(/\*\*Status:\*\*\s*(.+)$/m);
  if (statusMatch) {
    log.info(`Status: ${statusMatch[1].trim()}`);
  }

  log.section('Próximos passos');
  log.info('1. Execute `npm run hefaisto:plan` para ver o plano de execução');
  log.info('2. Execute `npm run hefaisto:check` para validar a qualidade');
  log.info('3. Execute `npm run dev` para iniciar o servidor de desenvolvimento');
}
