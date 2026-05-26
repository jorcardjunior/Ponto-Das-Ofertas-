# AGENTS.md - Synkra Hefaisto (Codex CLI)

Este arquivo define as instrucoes do projeto para o Codex CLI.

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

<!-- Hefaisto-MANAGED-START: commands -->
## Common Commands

- `npm run sync:ide`
- `npm run sync:ide:check`
- `npm run sync:skills:codex`
- `npm run sync:skills:codex:global` (opcional; neste repo o padrao e local-first)
- `npm run validate:structure`
- `npm run validate:agents`
<!-- Hefaisto-MANAGED-END: commands -->

<!-- Hefaisto-MANAGED-START: shortcuts -->
## Agent Shortcuts

Preferencia de ativacao no Codex CLI:
1. Use `/skills` e selecione `hefaisto-<agent-id>` vindo de `.codex/skills` (ex.: `hefaisto-architect`)
2. Se preferir, use os atalhos abaixo (`@architect`, `/architect`, etc.)

Interprete os atalhos abaixo carregando o arquivo correspondente em `.hefaisto-core/development/agents/` (fallback: `.codex/agents/`), renderize o greeting via `generate-greeting.js` e assuma a persona ate `*exit`:

- `@architect`, `/architect`, `/architect.md` -> `.hefaisto-core/development/agents/architect.md`
- `@dev`, `/dev`, `/dev.md` -> `.hefaisto-core/development/agents/dev.md`
- `@qa`, `/qa`, `/qa.md` -> `.hefaisto-core/development/agents/qa.md`
- `@pm`, `/pm`, `/pm.md` -> `.hefaisto-core/development/agents/pm.md`
- `@po`, `/po`, `/po.md` -> `.hefaisto-core/development/agents/po.md`
- `@sm`, `/sm`, `/sm.md` -> `.hefaisto-core/development/agents/sm.md`
- `@analyst`, `/analyst`, `/analyst.md` -> `.hefaisto-core/development/agents/analyst.md`
- `@devops`, `/devops`, `/devops.md` -> `.hefaisto-core/development/agents/devops.md`
- `@data-engineer`, `/data-engineer`, `/data-engineer.md` -> `.hefaisto-core/development/agents/data-engineer.md`
- `@ux-design-expert`, `/ux-design-expert`, `/ux-design-expert.md` -> `.hefaisto-core/development/agents/ux-design-expert.md`
- `@squad-creator`, `/squad-creator`, `/squad-creator.md` -> `.hefaisto-core/development/agents/squad-creator.md`
- `@hefaisto-master`, `/hefaisto-master`, `/hefaisto-master.md` -> `.hefaisto-core/development/agents/hefaisto-master.md`
<!-- Hefaisto-MANAGED-END: shortcuts -->
