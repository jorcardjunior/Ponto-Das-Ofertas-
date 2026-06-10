# Hefaisto CLI

CLI autônoma que orquestra o ciclo **PLAN → BUILD → CHECK → SHIP** do Promptfy OS.

## Comandos

```bash
npm run hefaisto:init     # Inicializa o projeto a partir do PRD
npm run hefaisto:plan     # Mostra o plano de execução em ciclos
npm run hefaisto:check    # Roda typecheck, lint, test e build
npm run hefaisto          # Mostra status e ajuda
```

## Estrutura

```
hefaisto/cli/
├── index.mjs              # Entry point
├── lib/
│   ├── logger.mjs         # Logger colorido
│   └── finder.mjs         # Localiza PRD, brain, stories
└── commands/
    ├── init.mjs           # Inicialização
    ├── plan.mjs           # Plano de execução
    ├── check.mjs          # Quality gate
    ├── status.mjs         # Status do projeto
    └── help.mjs           # Ajuda
```
