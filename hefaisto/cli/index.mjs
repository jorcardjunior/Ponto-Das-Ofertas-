#!/usr/bin/env node
/**
 * Hefaisto CLI - entry point
 * Orquestra o ciclo PLAN → BUILD → CHECK → SHIP
 */
import { runInit } from './commands/init.mjs';
import { runPlan } from './commands/plan.mjs';
import { runCheck } from './commands/check.mjs';
import { runStatus } from './commands/status.mjs';
import { runHelp } from './commands/help.mjs';

const commands = {
  init: runInit,
  plan: runPlan,
  check: runCheck,
  status: runStatus,
  help: runHelp,
  '--help': runHelp,
  '-h': runHelp,
};

const [, , cmd = 'help', ...args] = process.argv;

const handler = commands[cmd];
if (!handler) {
  console.error(`\n❌ Comando desconhecido: ${cmd}\n`);
  runHelp();
  process.exit(1);
}

try {
  await handler(args);
} catch (err) {
  console.error('\n💥 Erro:', err?.message ?? err);
  process.exit(1);
}
