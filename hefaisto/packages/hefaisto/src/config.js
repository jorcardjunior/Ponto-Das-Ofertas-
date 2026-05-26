import fs from 'fs-extra';
import path from 'node:path';
import yaml from 'js-yaml';

export async function generateCoreConfig(targetDir, answers) {
  const config = {
    project: {
      name: answers.projectName,
      type: answers.projectType === 'landing-page' ? 'greenfield' : 'greenfield',
      installedAt: new Date().toISOString(),
      version: '1.0.0',
    },
    techStack: answers.techStack,
    integrations: answers.integrations.filter(i => i !== 'none'),
    ide: {
      selected: ['claude-code'],
    },
    slashPrefix: 'Hefaisto',
    devStoryLocation: 'docs/stories',
    language: answers.language,
  };

  const destPath = path.join(targetDir, '.hefaisto-core', 'core-config.yaml');
  await fs.ensureDir(path.dirname(destPath));
  await fs.writeFile(destPath, yaml.dump(config, { lineWidth: 120 }), 'utf8');
}

export async function generateSettingsJson(targetDir, answers) {
  const destPath = path.join(targetDir, '.claude', 'settings.json');
  await fs.ensureDir(path.dirname(destPath));

  // Preserve existing settings if present
  let settings = {};
  if (await fs.pathExists(destPath)) {
    try {
      settings = JSON.parse(await fs.readFile(destPath, 'utf8'));
    } catch { /* ignore parse errors */ }
  }

  settings.language = answers.language;
  await fs.writeFile(destPath, JSON.stringify(settings, null, 2) + '\n', 'utf8');
}

export async function generateSettingsLocal(targetDir) {
  const destPath = path.join(targetDir, '.claude', 'settings.local.json');

  // Don't overwrite if exists (user may have custom permissions)
  if (await fs.pathExists(destPath)) return;

  const hooksDir = path.resolve(targetDir, '.claude', 'hooks');

  // Escape backslashes for JSON on Windows
  function esc(p) {
    return p.replace(/\\/g, '\\\\');
  }

  const settings = {
    hooks: {
      PreToolUse: [
        {
          matcher: 'Write|Edit',
          hooks: [
            { type: 'command', command: `node "${esc(path.join(hooksDir, 'code-intel-pretool.cjs'))}"`, timeout: 10 }
          ],
        },
      ],
      PreCompact: [
        {
          hooks: [
            { type: 'command', command: `node "${esc(path.join(hooksDir, 'precompact-session-digest.cjs'))}"`, timeout: 10 }
          ],
        },
      ],
      UserPromptSubmit: [
        {
          hooks: [
            { type: 'command', command: `node "${esc(path.join(hooksDir, 'synapse-engine.cjs'))}"`, timeout: 10 }
          ],
        },
      ],
    },
  };

  await fs.writeFile(destPath, JSON.stringify(settings, null, 2) + '\n', 'utf8');
}
