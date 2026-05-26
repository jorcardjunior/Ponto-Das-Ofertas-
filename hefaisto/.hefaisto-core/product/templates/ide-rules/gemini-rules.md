# Gemini Rules - Synkra Hefaisto

Este arquivo define as instrucoes do projeto para Gemini CLI neste repositorio.

<!-- Hefaisto-MANAGED-START: core -->
## Core Rules

1. Siga a Constitution em `.hefaisto-core/constitution.md`
2. Priorize `CLI First -> Observability Second -> UI Third`
3. Trabalhe por stories em `docs/stories/`
4. Nao invente requisitos fora dos artefatos existentes
<!-- Hefaisto-MANAGED-END: core -->

<!-- Hefaisto-MANAGED-START: quality -->
## Quality Gates

- Rode `npm run lint`
- Rode `npm run typecheck`
- Rode `npm test`
- Atualize checklist e file list da story antes de concluir
<!-- Hefaisto-MANAGED-END: quality -->

<!-- Hefaisto-MANAGED-START: codebase -->
## Project Map

- Core framework: `.hefaisto-core/`
- CLI entrypoints: `bin/`
- Shared packages: `packages/`
- Tests: `tests/`
- Docs: `docs/`
<!-- Hefaisto-MANAGED-END: codebase -->

<!-- Hefaisto-MANAGED-START: gemini-integration -->
## Gemini Integration

Fonte de verdade de agentes:
- Canonico: `.hefaisto-core/development/agents/*.md`
- Espelhado para Gemini: `.gemini/rules/Hefaisto/agents/*.md`

Hooks e settings:
- Hooks locais: `.gemini/hooks/`
- Settings locais: `.gemini/settings.json`

Sempre que houver drift, execute:
- `npm run sync:ide:gemini`
- `npm run validate:gemini-sync`
- `npm run validate:gemini-integration`
<!-- Hefaisto-MANAGED-END: gemini-integration -->

<!-- Hefaisto-MANAGED-START: parity -->
## Multi-IDE Parity

Para garantir paridade entre Claude Code, Codex e Gemini:
- `npm run validate:parity`
- `npm run validate:paths`
<!-- Hefaisto-MANAGED-END: parity -->

<!-- Hefaisto-MANAGED-START: activation -->
## Agent Activation

Preferencia de ativacao:
1. Use agentes em `.gemini/rules/Hefaisto/agents/`
2. Se necessario, use fonte canonica em `.hefaisto-core/development/agents/`

Ao ativar agente:
- carregar definicao completa do agente
- renderizar greeting via `node .hefaisto-core/development/scripts/generate-greeting.js <agent-id>`
- manter persona ativa ate `*exit`

Atalhos recomendados no Gemini:
- `/hefaisto-menu` para listar agentes
- `/hefaisto-<agent-id>` (ex.: `/hefaisto-dev`, `/hefaisto-architect`)
- `/hefaisto-agent <agent-id>` para launcher generico
<!-- Hefaisto-MANAGED-END: activation -->

<!-- Hefaisto-MANAGED-START: commands -->
## Common Commands

- `npm run sync:ide`
- `npm run sync:ide:check`
- `npm run sync:ide:gemini`
- `npm run validate:gemini-sync`
- `npm run validate:gemini-integration`
- `npm run validate:parity`
- `npm run validate:structure`
- `npm run validate:agents`
<!-- Hefaisto-MANAGED-END: commands -->
