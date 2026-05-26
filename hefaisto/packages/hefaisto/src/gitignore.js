import fs from 'fs-extra';
import path from 'node:path';

const Hefaisto_ENTRIES = [
  '',
  '# Hefaisto Framework',
  '.env',
  '.env.local',
  '.env.*.local',
  'node_modules/',
  '.claude/settings.local.json',
  '.hefaisto/sessions/',
  '.hefaisto/handoffs/',
];

export async function update(targetDir) {
  const gitignorePath = path.join(targetDir, '.gitignore');

  let existing = '';
  if (await fs.pathExists(gitignorePath)) {
    existing = await fs.readFile(gitignorePath, 'utf8');
  }

  const linesToAdd = Hefaisto_ENTRIES.filter(line => {
    if (line === '') return !existing.includes('# Hefaisto Framework');
    return !existing.includes(line.trim());
  });

  if (linesToAdd.length === 0) return false;

  const append = '\n' + linesToAdd.join('\n') + '\n';
  await fs.writeFile(gitignorePath, existing + append, 'utf8');
  return true;
}
