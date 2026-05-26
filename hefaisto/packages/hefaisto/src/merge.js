import fs from 'fs-extra';
import path from 'node:path';
import { templatePath } from './copy.js';

const MARKER_START = '<!-- Hefaisto-FRAMEWORK-START -->';
const MARKER_END = '<!-- Hefaisto-FRAMEWORK-END -->';

export async function handleClaudeMd(targetDir, detection, answers) {
  const destPath = path.join(targetDir, '.claude', 'CLAUDE.md');
  const templateContent = await fs.readFile(templatePath('claude/CLAUDE.md'), 'utf8');
  const date = new Date().toISOString().split('T')[0];

  await fs.ensureDir(path.dirname(destPath));

  // Greenfield or existing without CLAUDE.md — just create
  if (!detection.hasClaudeMd) {
    await fs.writeFile(destPath, templateContent, 'utf8');
    return 'created';
  }

  // Existing CLAUDE.md — merge
  let existing = detection.existingClaudeMdContent;
  const hefaistoBlock = [
    '',
    MARKER_START,
    `<!-- Instalado por npx hefaisto em ${date} -->`,
    `<!-- NAO edite entre estes marcadores — gerenciado pelo instalador Hefaisto -->`,
    '',
    templateContent,
    '',
    MARKER_END,
  ].join('\n');

  // Check if Hefaisto block already exists (re-install)
  const startIdx = existing.indexOf(MARKER_START);
  const endIdx = existing.indexOf(MARKER_END);

  if (startIdx !== -1 && endIdx !== -1) {
    // Replace existing block
    const before = existing.substring(0, startIdx);
    const after = existing.substring(endIdx + MARKER_END.length);
    await fs.writeFile(destPath, before + hefaistoBlock + after, 'utf8');
    return 'updated';
  }

  // Append to end
  await fs.writeFile(destPath, existing + '\n' + hefaistoBlock + '\n', 'utf8');
  return 'merged';
}
