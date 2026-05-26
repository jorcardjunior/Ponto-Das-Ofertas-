# Task: Diagnose

## Metadata
```yaml
id: diagnose
title: "Diagnostico do Content Squad"
agent: content-chief
elicit: false
inputs:
  - scope: "O que diagnosticar (squad, integracoes, brand-context, tudo)"
outputs:
  - health_report: "Relatorio de saude do squad"
  - issues: "Problemas encontrados e como resolver"
  - recommendations: "Proximos passos recomendados"
```

## Pipeline

### VERIFICACAO 1 — Brand Context

```
Ler: brand-context/BRAND_CONTEXT.md

Verificar:
  [ ] Arquivo existe
  [ ] Secao identidade preenchida (nome_marca, missao)
  [ ] Secao publico preenchida (perfil, dores)
  [ ] Tom de voz definido
  [ ] Palavras-chave listadas

Status:
  - COMPLETO: todas as secoes preenchidas
  - PARCIAL: algumas secoes em branco (listar quais)
  - VAZIO: arquivo nao configurado
```

### VERIFICACAO 2 — Integracoes

```
Verificar arquivo .env no projeto:

  [ ] OPENAI_API_KEY presente e nao vazia
  [ ] ANTHROPIC_API_KEY presente e nao vazia
  [ ] CANVA_MCP_URL presente

Se .env nao existir ou chaves estiverem vazias:
  → Sugerir: "Execute @content-chief *configurar para configurar as integracoes"
```

### VERIFICACAO 3 — Agentes do Squad

```
Verificar se os arquivos dos agentes existem:

  [ ] content-squad/agents/content-chief.md
  [ ] content-squad/agents/carousel-creator.md
  [ ] content-squad/agents/image-director.md
  [ ] content-squad/agents/social-publisher.md

Status por agente:
  ATIVO    → arquivo encontrado
  AUSENTE  → arquivo nao encontrado (listar)
```

### VERIFICACAO 4 — Cross-Squad Dependencies

```
Verificar squads necessarios para delegacao:

  [ ] copy-squad presente no projeto
  [ ] storytelling-squad ou story-chief acessivel
  [ ] brand-squad presente (para design-chief)

Se algum squad estiver ausente:
  → Listar funcionalidades que ficam limitadas
  → Explicar como o content-chief adapta o workflow
```

### VERIFICACAO 5 — Canva MCP

```
Verificar se o MCP do Canva esta configurado:

Checar .claude/settings.json ou configuracao MCP local:
  [ ] mcp.canva configurado com URL https://mcp.canva.com/mcp

Se nao estiver:
  → Instrucao: claude mcp add canva --transport http https://mcp.canva.com/mcp
```

### OUTPUT DO DIAGNOSTICO

```markdown
## Diagnostico — Content Squad
**Data:** [data]

---
### STATUS GERAL: [SAUDAVEL / ATENCAO / CRITICO]

---
### Brand Context
Status: [COMPLETO / PARCIAL / VAZIO]
[lista de campos em branco, se houver]

### Integracoes
- OpenAI API: [✅ configurada / ❌ ausente]
- Anthropic API: [✅ configurada / ❌ ausente]
- Canva MCP: [✅ ativo / ❌ nao configurado]

### Agentes
- content-chief: [✅ / ❌]
- carousel-creator: [✅ / ❌]
- image-director: [✅ / ❌]
- social-publisher: [✅ / ❌]

### Cross-Squad
- copy-squad: [✅ / ❌ ausente — copy-chief operara com agentes internos]
- storytelling-squad: [✅ / ❌]

---
### PROBLEMAS ENCONTRADOS
[lista numerada de problemas, se houver]

### PROXIMOS PASSOS RECOMENDADOS
1. [acao 1]
2. [acao 2]
```

## Notas
- Este diagnostico nao faz alteracoes — apenas relata o estado atual
- Para configurar integracoes: @content-chief *configurar
- Para preencher brand context: editar brand-context/BRAND_CONTEXT.md
