# Hefaisto Agents — 5 Especialistas

## Agentes Disponíveis

| Agente | Persona | Escopo | Ativar |
|--------|---------|--------|--------|
| `@hefaisto` | Nova | Orquestração, help, navegação, routing | `/Hefaisto:agents:hefaisto` |
| `@dev` | Dex | Código, testes, commits, push, PRs, landing pages | `/Hefaisto:agents:dev` |
| `@architect` | Aria | Arquitetura, database, integrações, MarTech stack | `/Hefaisto:agents:architect` |
| `@qa` | Quinn | Qualidade, CRO scoring, auditorias, performance | `/Hefaisto:agents:qa` |
| `@product` | Sage | Stories, requisitos, growth strategy, priorização | `/Hefaisto:agents:product` |

## Quando Usar Cada Agente

- **Implementar código, corrigir bugs, criar landing pages** → `@dev`
- **Projetar sistema, escolher tech stack, design de banco** → `@architect`
- **Revisar qualidade, auditar conversão, scoring CRO** → `@qa`
- **Criar stories, priorizar backlog, mapear jornada** → `@product`
- **Navegar framework, orquestrar, help geral** → `@hefaisto`

## Regras de Operação

- Ative com `@agent-name` ou `/Hefaisto:agents:agent-name`
- Comandos usam prefixo `*`: `*help`, `*build`, `*check`, `*ship`
- `*exit` sai do modo agente
- @dev pode fazer git push e criar PRs — sem restrição
- Qualquer agente pode ler git status, log, diff
- Agent definitions em `.claude/commands/Hefaisto/agents/`
