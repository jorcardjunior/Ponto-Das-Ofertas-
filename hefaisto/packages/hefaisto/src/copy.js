import fs from 'fs-extra';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function templatePath(relative) {
  return path.join(__dirname, '..', 'templates', relative);
}

export async function copyHefaistoCore(targetDir, overwrite = false) {
  const src = templatePath('hefaisto-core');
  const dest = path.join(targetDir, '.hefaisto-core');
  await fs.copy(src, dest, { overwrite });
}

export async function copyRules(targetDir) {
  const src = templatePath('claude/rules');
  const dest = path.join(targetDir, '.claude', 'rules');
  await fs.ensureDir(dest);
  await fs.copy(src, dest, { overwrite: true });
}

export async function copyCommands(targetDir) {
  const src = templatePath('claude/commands');
  const dest = path.join(targetDir, '.claude', 'commands');
  await fs.ensureDir(dest);
  await fs.copy(src, dest, { overwrite: true });
}

export async function copyHooks(targetDir) {
  const src = templatePath('claude/hooks');
  const dest = path.join(targetDir, '.claude', 'hooks');
  await fs.ensureDir(dest);
  await fs.copy(src, dest, { overwrite: true });
}

export async function ensureDirectories(targetDir) {
  await fs.ensureDir(path.join(targetDir, 'docs', 'stories'));
  await fs.ensureDir(path.join(targetDir, '.claude'));
}
