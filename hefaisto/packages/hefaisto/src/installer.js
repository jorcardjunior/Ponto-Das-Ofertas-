import { confirm } from '@inquirer/prompts';
import { banner, info, success, warn, error, step, summary } from './ui.js';
import { analyzeProject } from './detect.js';
import { ask } from './questions.js';
import { copyHefaistoCore, copyRules, copyCommands, copyHooks, ensureDirectories } from './copy.js';
import { handleClaudeMd } from './merge.js';
import { generateCoreConfig, generateSettingsJson, generateSettingsLocal } from './config.js';
import { update as updateGitignore } from './gitignore.js';

const TOTAL_STEPS = 8;

export async function run(targetDir) {
  banner();

  // 1. Detect project type
  step(1, TOTAL_STEPS, 'Analisando diretorio...');
  const detection = await analyzeProject(targetDir);

  if (detection.type === 'empty') {
    info('Diretorio vazio detectado — instalacao greenfield');
  } else if (detection.type === 'has-claude') {
    info('Projeto existente com .claude/CLAUDE.md detectado');
    warn('O conteudo existente do CLAUDE.md sera preservado');
  } else {
    info('Projeto existente detectado — instalacao brownfield');
  }

  if (detection.hasHefaistoCore) {
    warn('Hefaisto ja esta instalado neste diretorio');
  }

  console.log('');

  // 2. Ask questions
  step(2, TOTAL_STEPS, 'Configuracao do projeto...');
  console.log('');
  const answers = await ask(targetDir, detection);

  if (answers.abort) {
    info('Instalacao cancelada.');
    return;
  }

  // 3. Confirm
  console.log('');
  const ok = await confirm({
    message: `Instalar Hefaisto em ${targetDir}?`,
    default: true,
  });

  if (!ok) {
    info('Instalacao cancelada.');
    return;
  }

  console.log('');
  const overwrite = detection.hasHefaistoCore && answers.reinstall;

  // 4. Copy .hefaisto-core/
  step(3, TOTAL_STEPS, 'Copiando framework core...');
  await copyHefaistoCore(targetDir, overwrite);
  success('.hefaisto-core/ instalado');

  // 5. Copy rules, commands, hooks
  step(4, TOTAL_STEPS, 'Configurando agentes e regras...');
  await ensureDirectories(targetDir);
  await copyRules(targetDir);
  await copyCommands(targetDir);
  await copyHooks(targetDir);
  success('.claude/rules/ + commands/ + hooks/ configurados');

  // 6. Handle CLAUDE.md
  step(5, TOTAL_STEPS, 'Configurando CLAUDE.md...');
  const mergeResult = await handleClaudeMd(targetDir, detection, answers);
  if (mergeResult === 'created') {
    success('CLAUDE.md criado');
  } else if (mergeResult === 'merged') {
    success('Hefaisto config adicionado ao CLAUDE.md existente (conteudo preservado)');
  } else {
    success('Hefaisto config atualizado no CLAUDE.md');
  }

  // 7. Generate configs
  step(6, TOTAL_STEPS, 'Gerando configuracoes...');
  await generateCoreConfig(targetDir, answers);
  await generateSettingsJson(targetDir, answers);
  await generateSettingsLocal(targetDir);
  success('core-config.yaml + settings gerados');

  // 8. Update .gitignore
  step(7, TOTAL_STEPS, 'Atualizando .gitignore...');
  const gitignoreUpdated = await updateGitignore(targetDir);
  if (gitignoreUpdated) {
    success('.gitignore atualizado');
  } else {
    info('.gitignore ja continha entradas Hefaisto');
  }

  // Done
  step(8, TOTAL_STEPS, 'Finalizando...');

  summary([
    `Projeto: ${answers.projectName}`,
    `Tipo: ${answers.projectType}`,
    `Tech stack: ${answers.techStack}`,
    `Integracoes: ${answers.integrations.join(', ') || 'nenhuma'}`,
    '',
    'Proximos passos:',
    '  1. Abra o projeto no Claude Code',
    '  2. Digite /Hefaisto:init para iniciar o desenvolvimento',
    '  3. Descreva o que precisa — o Hefaisto executa automaticamente',
  ]);
}
