/**
 * Hefaisto Directory Check
 *
 * Verifies .hefaisto/ directory structure and permissions.
 *
 * @module hefaisto-core/health-check/checks/project/hefaisto-directory
 * @version 1.0.0
 * @story HCS-2 - Health Check System Implementation
 */

const fs = require('fs').promises;
const path = require('path');
const { BaseCheck, CheckSeverity, CheckDomain } = require('../../base-check');

/**
 * Expected .hefaisto directory structure
 */
const EXPECTED_STRUCTURE = [
  { path: '.hefaisto', type: 'directory', required: false },
  { path: '.hefaisto/config.yaml', type: 'file', required: false },
  { path: '.hefaisto/reports', type: 'directory', required: false },
  { path: '.hefaisto/backups', type: 'directory', required: false },
];

/**
 * Hefaisto directory structure check
 *
 * @class HefaistoDirectoryCheck
 * @extends BaseCheck
 */
class HefaistoDirectoryCheck extends BaseCheck {
  constructor() {
    super({
      id: 'project.hefaisto-directory',
      name: 'Hefaisto Directory Structure',
      description: 'Verifies .hefaisto/ directory structure',
      domain: CheckDomain.PROJECT,
      severity: CheckSeverity.MEDIUM,
      timeout: 2000,
      cacheable: true,
      healingTier: 1, // Can auto-create directories
      tags: ['hefaisto', 'directory', 'structure'],
    });
  }

  /**
   * Execute the check
   * @param {Object} context - Execution context
   * @returns {Promise<Object>} Check result
   */
  async execute(context) {
    const projectRoot = context.projectRoot || process.cwd();
    const hefaistoPath = path.join(projectRoot, '.hefaisto');
    const issues = [];
    const found = [];

    // Check if .hefaisto exists at all
    try {
      const stats = await fs.stat(hefaistoPath);
      if (!stats.isDirectory()) {
        return this.fail('.hefaisto exists but is not a directory', {
          recommendation: 'Remove .hefaisto file and run health check again',
        });
      }
      found.push('.hefaisto');
    } catch {
      // .hefaisto doesn't exist - this is optional
      return this.pass('.hefaisto directory not present (optional)', {
        details: {
          message: '.hefaisto directory is created automatically when needed',
          healable: true,
        },
      });
    }

    // Check subdirectories
    for (const item of EXPECTED_STRUCTURE.filter((i) => i.path !== '.hefaisto')) {
      const fullPath = path.join(projectRoot, item.path);
      try {
        const stats = await fs.stat(fullPath);
        const typeMatch = item.type === 'directory' ? stats.isDirectory() : stats.isFile();
        if (typeMatch) {
          found.push(item.path);
        } else {
          issues.push(`${item.path} exists but is wrong type`);
        }
      } catch {
        if (item.required) {
          issues.push(`Missing: ${item.path}`);
        }
      }
    }

    // Check write permissions
    try {
      const testFile = path.join(hefaistoPath, '.write-test');
      await fs.writeFile(testFile, 'test');
      await fs.unlink(testFile);
    } catch {
      issues.push('.hefaisto directory is not writable');
    }

    if (issues.length > 0) {
      return this.warning(`Hefaisto directory has issues: ${issues.join(', ')}`, {
        recommendation: 'Run health check with --fix to create missing directories',
        healable: true,
        healingTier: 1,
        details: { issues, found },
      });
    }

    return this.pass('Hefaisto directory structure is valid', {
      details: { found },
    });
  }

  /**
   * Get healer for this check
   * @returns {Object} Healer configuration
   */
  getHealer() {
    return {
      name: 'create-hefaisto-directories',
      action: 'create-directories',
      successMessage: 'Created missing Hefaisto directories',
      fix: async (_result) => {
        const projectRoot = process.cwd();
        const dirs = ['.hefaisto', '.hefaisto/reports', '.hefaisto/backups', '.hefaisto/backups/health-check'];

        for (const dir of dirs) {
          const fullPath = path.join(projectRoot, dir);
          await fs.mkdir(fullPath, { recursive: true });
        }

        return { success: true, message: 'Created Hefaisto directories' };
      },
    };
  }
}

module.exports = HefaistoDirectoryCheck;
