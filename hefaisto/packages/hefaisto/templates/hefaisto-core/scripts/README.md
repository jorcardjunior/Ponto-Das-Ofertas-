# Hefaisto Scripts - Legacy Directory

> **Note**: This directory now contains only legacy/migration scripts and a few active utilities.
> Most scripts have been migrated to the modular structure (Story 6.16).

## Current Structure

Scripts are now organized by domain across three locations:

| Location | Purpose |
|----------|---------|
| `.hefaisto-core/core/` | Core framework modules (elicitation, session) |
| `.hefaisto-core/development/scripts/` | Development scripts (greeting, workflow, hooks) |
| `.hefaisto-core/infrastructure/scripts/` | Infrastructure scripts (git config, validators) |
| `.hefaisto-core/scripts/` (this directory) | Legacy utilities and migration scripts |

## Scripts in This Directory

### Active Scripts

| Script | Description |
|--------|-------------|
| `session-context-loader.js` | Loads session context for agents |
| `command-execution-hook.js` | Hook for command execution |
| `test-template-system.js` | Internal test utility for templates |

### Migration Scripts

| Script | Description |
|--------|-------------|
| `batch-migrate-*.ps1` | Batch migration utilities |
| `migrate-framework-docs.sh` | Documentation migration script |
| `validate-phase1.ps1` | Phase 1 validation script |

## Script Path Mapping

If you're looking for a script that was previously here, use this mapping:

```text
OLD PATH                                      NEW PATH
-----------------------------------------     ------------------------------------------
.hefaisto-core/scripts/context-detector.js      → .hefaisto-core/core/session/context-detector.js
.hefaisto-core/scripts/elicitation-engine.js    → .hefaisto-core/core/elicitation/elicitation-engine.js
.hefaisto-core/scripts/elicitation-session-manager.js → .hefaisto-core/core/elicitation/session-manager.js
.hefaisto-core/scripts/greeting-builder.js      → .hefaisto-core/development/scripts/greeting-builder.js
.hefaisto-core/scripts/workflow-navigator.js    → .hefaisto-core/development/scripts/workflow-navigator.js
.hefaisto-core/scripts/agent-exit-hooks.js      → .hefaisto-core/development/scripts/agent-exit-hooks.js
.hefaisto-core/scripts/git-config-detector.js   → .hefaisto-core/infrastructure/scripts/git-config-detector.js
.hefaisto-core/scripts/project-status-loader.js → .hefaisto-core/infrastructure/scripts/project-status-loader.js
.hefaisto-core/scripts/hefaisto-validator.js        → .hefaisto-core/infrastructure/scripts/hefaisto-validator.js
.hefaisto-core/scripts/tool-resolver.js         → .hefaisto-core/infrastructure/scripts/tool-resolver.js
.hefaisto-core/scripts/output-formatter.js      → .hefaisto-core/infrastructure/scripts/output-formatter.js
```

## Configuration

The `scriptsLocation` in `core-config.yaml` now uses a modular structure:

```yaml
scriptsLocation:
  core: .hefaisto-core/core
  development: .hefaisto-core/development/scripts
  infrastructure: .hefaisto-core/infrastructure/scripts
  legacy: .hefaisto-core/scripts  # This directory
```

## Usage Examples

### Loading Core Scripts

```javascript
// Elicitation Engine (from core)
const ElicitationEngine = require('./.hefaisto-core/core/elicitation/elicitation-engine');

// Context Detector (from core)
const ContextDetector = require('./.hefaisto-core/core/session/context-detector');
```

### Loading Development Scripts

```javascript
// Greeting Builder
const GreetingBuilder = require('./.hefaisto-core/development/scripts/greeting-builder');

// Workflow Navigator
const WorkflowNavigator = require('./.hefaisto-core/development/scripts/workflow-navigator');
```

### Loading Infrastructure Scripts

```javascript
// Project Status Loader
const { loadProjectStatus } = require('./.hefaisto-core/infrastructure/scripts/project-status-loader');

// Git Config Detector
const GitConfigDetector = require('./.hefaisto-core/infrastructure/scripts/git-config-detector');
```

### Loading Legacy Scripts (this directory)

```javascript
// Session Context Loader
const sessionLoader = require('./.hefaisto-core/scripts/session-context-loader');
```

## Related Documentation

- [Core Config](../core-config.yaml) - scriptsLocation configuration
- [Core Module](../core/README.md) - Core framework modules
- [Development Scripts](../development/scripts/README.md) - Development utilities
- [Infrastructure Scripts](../infrastructure/scripts/README.md) - Infrastructure utilities

## Migration History

| Date | Story | Change |
|------|-------|--------|
| 2025-12-18 | 6.16 | Deleted deprecated scripts, updated documentation |
| 2025-01-15 | 2.2 | Initial script reorganization to modular structure |

---

**Last updated:** 2025-12-18 - Story 6.16 Scripts Path Consolidation
