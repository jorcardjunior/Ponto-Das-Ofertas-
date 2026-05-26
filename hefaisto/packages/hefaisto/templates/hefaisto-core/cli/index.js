/**
 * Hefaisto CLI Entry Point
 *
 * Main entry point for the Hefaisto CLI with Commander.js integration.
 * Registers all subcommands including workers, agents, etc.
 *
 * @module cli
 * @version 1.0.0
 * @story 2.7 - Discovery CLI Search
 */

const { Command } = require('commander');
const path = require('path');
const fs = require('fs');

// Import command modules
const { createWorkersCommand } = require('./commands/workers');
const { createManifestCommand } = require('./commands/manifest');
const { createQaCommand } = require('./commands/qa');
const { createMcpCommand } = require('./commands/mcp');
const { createMigrateCommand } = require('./commands/migrate');
const { createGenerateCommand } = require('./commands/generate');
const { createMetricsCommand } = require('./commands/metrics');
const { createConfigCommand } = require('./commands/config');
const { createProCommand } = require('./commands/pro');

// Read package.json for version
const packageJsonPath = path.join(__dirname, '..', '..', 'package.json');
let packageVersion = '0.0.0';
try {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  packageVersion = packageJson.version;
} catch (error) {
  // Fallback version if package.json not found
}

/**
 * Create the main CLI program
 * @returns {Command} Commander program instance
 */
function createProgram() {
  const program = new Command();

  program
    .name('hefaisto')
    .version(packageVersion)
    .description('Hefaisto-FullStack: AI-Orchestrated System for Full Stack Development')
    .addHelpText('after', `
Commands:
  workers           Manage and discover workers
  manifest          Manage manifest files (validate, regenerate)
  qa                Quality Gate Manager (run, status)
  metrics           Quality Gate Metrics (record, show, seed, cleanup)
  config            Manage layered configuration (show, diff, migrate, validate)
  pro               Hefaisto Pro license management (activate, status, deactivate, features)
  mcp               Manage global MCP configuration
  migrate           Migrate from v2.0 to v4.0.4 structure
  generate          Generate documents from templates (prd, adr, pmdr, etc.)
  install           Install Hefaisto in current project
  init <name>       Create new Hefaisto project
  info              Show system information
  doctor            Run system diagnostics

For command help:
  $ hefaisto <command> --help

Examples:
  $ hefaisto workers search "json transformation"
  $ hefaisto workers list --category=data
  $ hefaisto manifest validate
  $ hefaisto manifest regenerate
  $ hefaisto qa run
  $ hefaisto qa status
  $ hefaisto mcp setup --with-defaults
  $ hefaisto mcp link
  $ hefaisto mcp status
  $ hefaisto metrics show
  $ hefaisto metrics record --layer 1 --passed
  $ hefaisto metrics seed --days 30
  $ hefaisto migrate --dry-run
  $ hefaisto migrate --from=2.0 --to=2.1
  $ hefaisto generate pmdr --title "Feature X Decision"
  $ hefaisto generate adr --save
  $ hefaisto generate list
  $ hefaisto config show
  $ hefaisto config show --debug
  $ hefaisto config diff --levels L1,L2
  $ hefaisto config migrate --dry-run
  $ hefaisto config validate
  $ hefaisto config init-local
  $ hefaisto pro activate --key PRO-XXXX-XXXX-XXXX-XXXX
  $ hefaisto pro status
  $ hefaisto pro deactivate
  $ hefaisto pro features
  $ hefaisto pro validate
  $ hefaisto install
  $ hefaisto doctor
`);

  // Add workers command
  program.addCommand(createWorkersCommand());

  // Add manifest command (Story 2.13)
  program.addCommand(createManifestCommand());

  // Add qa command (Story 2.10)
  program.addCommand(createQaCommand());

  // Add mcp command (Story 2.11)
  program.addCommand(createMcpCommand());

  // Add migrate command (Story 2.14)
  program.addCommand(createMigrateCommand());

  // Add generate command (Story 3.9)
  program.addCommand(createGenerateCommand());

  // Add metrics command (Story 3.11a)
  program.addCommand(createMetricsCommand());

  // Add config command (Story PRO-4)
  program.addCommand(createConfigCommand());

  // Add pro command (Story PRO-6)
  program.addCommand(createProCommand());

  return program;
}

/**
 * Run the CLI
 * @param {string[]} args - Command line arguments
 * @returns {Promise<void>}
 */
async function run(args = process.argv) {
  const program = createProgram();

  try {
    await program.parseAsync(args);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = {
  createProgram,
  run,
};
