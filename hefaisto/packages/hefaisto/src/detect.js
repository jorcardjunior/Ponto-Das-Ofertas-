import fs from 'fs-extra';
import path from 'node:path';

export async function analyzeProject(targetDir) {
  const result = {
    type: 'empty',
    hasPackageJson: false,
    hasClaudeMd: false,
    hasHefaistoCore: false,
    existingClaudeMdContent: null,
  };

  const entries = await fs.readdir(targetDir).catch(() => []);
  const visible = entries.filter(e => !e.startsWith('.') || e === '.claude' || e === '.hefaisto-core');

  if (entries.length === 0) {
    result.type = 'empty';
    return result;
  }

  result.hasPackageJson = await fs.pathExists(path.join(targetDir, 'package.json'));
  result.hasHefaistoCore = await fs.pathExists(path.join(targetDir, '.hefaisto-core'));

  const claudeMdPath = path.join(targetDir, '.claude', 'CLAUDE.md');
  result.hasClaudeMd = await fs.pathExists(claudeMdPath);

  if (result.hasClaudeMd) {
    result.existingClaudeMdContent = await fs.readFile(claudeMdPath, 'utf8');
    result.type = 'has-claude';
  } else if (result.hasPackageJson || visible.length > 0) {
    result.type = 'existing';
  }

  return result;
}
