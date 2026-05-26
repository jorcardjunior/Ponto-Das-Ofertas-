/**
 * MCP Command Module
 *
 * Entry point for all MCP-related CLI commands.
 * Provides global MCP configuration management.
 *
 * @module cli/commands/mcp
 * @version 1.0.0
 * @story 2.11 - MCP System Global
 */

const { Command } = require('commander');
const { createSetupCommand } = require('./setup');
const { createLinkCommand } = require('./link');
const { createStatusCommand } = require('./status');
const { createAddCommand } = require('./add');

/**
 * Create the mcp command with all subcommands
 * @returns {Command} Commander command instance
 */
function createMcpCommand() {
  const mcp = new Command('mcp');

  mcp
    .description('Manage global MCP (Model Context Protocol) configuration')
    .addHelpText('after', `
Commands:
  setup             Create global ~/.hefaisto/mcp/ structure
  link              Link project to global MCP config
  status            Show global/project MCP config status
  add <server>      Add server to global config

Global Configuration:
  MCP servers are configured once at ~/.hefaisto/mcp/ and shared across
  all projects via symlinks (Unix) or junctions (Windows).

Benefits:
  - Configure MCP servers once, use everywhere
  - No duplicate configurations across projects
  - Easy maintenance and updates
  - Consistent MCP setup across workspaces

Quick Start:
  $ hefaisto mcp setup --with-defaults    # Create global config
  $ hefaisto mcp link                      # Link this project
  $ hefaisto mcp status                    # Check configuration

Examples:
  $ hefaisto mcp setup
  $ hefaisto mcp setup --with-defaults
  $ hefaisto mcp setup --servers context7,exa,github
  $ hefaisto mcp link
  $ hefaisto mcp link --migrate
  $ hefaisto mcp link --merge
  $ hefaisto mcp link --unlink
  $ hefaisto mcp status
  $ hefaisto mcp status --json
  $ hefaisto mcp add context7
  $ hefaisto mcp add myserver --type sse --url https://example.com/mcp
  $ hefaisto mcp add myserver --remove
  $ hefaisto mcp add --list-templates
`);

  // Add subcommands
  mcp.addCommand(createSetupCommand());
  mcp.addCommand(createLinkCommand());
  mcp.addCommand(createStatusCommand());
  mcp.addCommand(createAddCommand());

  return mcp;
}

module.exports = {
  createMcpCommand,
};
