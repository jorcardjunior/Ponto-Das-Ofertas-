---
name: projects-readme
description: Projetos ATIVOS da marca. Cada projeto = uma subpasta YYYY-MM-{nome}.
type: folder-readme
---

# 01-projects — Projetos Ativos

Trabalho em andamento. Cada projeto vive em sua subpasta.

## Convenção

`YYYY-MM-{nome-projeto-kebab-case}/`

Exemplo: `2026-05-landing-page-curso-x/`

## Estrutura padrão de um projeto

```
2026-05-landing-page-curso-x/
├── README.md       ← visão geral + status
├── PRD.md          ← documento de requisitos
├── decisions.md    ← decisões importantes do projeto
├── copy/           ← copy gerada (headlines, body, CTAs)
├── design/         ← assets visuais, mockups, especificações
├── code/           ← referência/link para o Hefaisto
└── metrics.md      ← métricas planejadas e resultados
```

## Ciclo de Vida

1. Gaios cria a pasta quando o lead inicia novo projeto.
2. PSquads escrevem em `copy/`, `design/`, `decisions.md`.
3. Hefaisto trabalha em `code/`.
4. Ao concluir → mover para `04-archive/YYYY-qN/`.
5. Promover assets reutilizáveis para `03-resources/`.
6. Promover decisões que viraram padrão para `02-areas/`.

Ver [[schema]] para regras completas.
