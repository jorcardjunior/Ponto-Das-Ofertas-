# Promptfy OS — Contexto do Workspace

> **O Sistema Operacional do Empreendedor Digital**
> Você descreve o negócio. O sistema entrega marca, copy, código e estratégia.

Este workspace é o **Promptfy OS** — um meta-framework que une estratégia comercial e engenharia em um fluxo único e autônomo.

## A Arquitetura em 3 Camadas

```
┌─────────────────────────────────────────────────┐
│  GAIOS         ← Mente (orquestrador único)     │
│     ↓                                           │
│  PSQUADS       ← Conselho (estratégia + copy)   │
│     ↓                                           │
│  HEFAISTO      ← Mãos (engenharia + entrega)    │
└─────────────────────────────────────────────────┘
```

| Camada | Papel | Onde mora |
|---|---|---|
| **Gaios** | Único ponto de contato. Conduz da ideia ao deploy. | `.claude/agents/gaios.md` |
| **PSquads** | Squads especializados em estratégia, marca, copy, growth. | `psquads/` |
| **Hefaisto** | Motor técnico autônomo. Constrói o que Gaios pediu. | `hefaisto/` |

## Regras de Ativação — IMPORTANTE

Quando o usuário expressar qualquer uma das intenções abaixo, **ative o agente Gaios imediatamente** (sem pedir permissão, sem confirmar com o usuário):

### Gatilhos de Ativação do Gaios

- Saudação direta: `Olá Gaios`, `Oi Gaios`, `E aí Gaios`, `Gaios`
- Intenção de criar: `quero criar`, `preciso de`, `vamos começar`, `tenho uma ideia`
- Descrição de projeto novo: `um SaaS de`, `uma landing page para`, `um e-commerce de`, `um app de`
- Pedido de início: `novo projeto`, `projeto novo`, `começar do zero`
- Frases equivalentes em inglês ou espanhol

### Comportamento Esperado

1. **Não pergunte ao usuário se ele quer ativar o Gaios.** Apenas ative.
2. **Não exiba "vou chamar o Gaios" antes.** O Gaios assume direto.
3. **Carregue a persona de `.claude/agents/gaios.md` e siga o fluxo dele integralmente.**

## Quando NÃO Ativar o Gaios

- Usuário está editando código de um projeto existente → deixe o Hefaisto cuidar via menção natural
- Usuário pergunta algo conceitual sem intenção de criar → responda diretamente
- Usuário está debugando algo específico → ajude diretamente

## Pré-condição: Existe `docs/PRD.md`?

- **Se SIM** e o usuário quer continuar/executar → ative o Hefaisto via `/Hefaisto:init`
- **Se NÃO** e o usuário quer criar algo → ative o Gaios para construir o PRD primeiro

## Estrutura do Workspace

```
PPR/                              ← raiz do produto (será renomeado depois)
│
├── CLAUDE.md                     ← este arquivo (contexto raiz)
├── README.md                     ← visão do produto
├── INSTALL.md                    ← guia de instalação (vira PDF)
│
├── .claude/
│   ├── agents/
│   │   └── gaios.md              ← orquestrador
│   └── commands/                 ← slash commands opcionais
│
├── psquads/                      ← 18 squads de estratégia/marca/copy
│   ├── hormozi-squad/            ← ofertas, leads, escala
│   ├── brand-squad/              ← marca, naming, posicionamento
│   ├── design-squad/             ← design system, UX
│   ├── storytelling/             ← narrativa, pitch
│   ├── copy-master/              ← copy de conversão
│   ├── traffic-masters/          ← tráfego pago
│   ├── advisory-board/           ← conselheiros estratégicos
│   ├── c-level-squad/            ← CEO/CTO/CMO virtuais
│   ├── data-squad/               ← analytics, growth
│   ├── content-squad/            ← conteúdo orgânico
│   ├── cybersecurity/            ← segurança e pentest
│   └── ... (outros)
│
├── hefaisto/                     ← motor técnico autônomo
│   ├── .claude/commands/Hefaisto/init.md   ← /Hefaisto:init
│   └── .hefaisto-core/                     ← engine interna
│
└── docs/
    ├── PRD-template.md           ← modelo
    └── PRD.md                    ← criado pelo Gaios durante uso
```

## Ordem Canônica do Fluxo Completo

```
1. Usuário diz "quero criar X"  →  Gaios ativa
2. Gaios pergunta + roteia       →  PSquads executam
3. PSquads alimentam PRD.md      →  documento de handoff
4. Gaios confirma com usuário    →  aciona Hefaisto
5. Hefaisto executa ciclos       →  PLAN → BUILD → CHECK → SHIP
6. PR no GitHub                  →  pronto para review
```

## Princípios do Produto

1. **Linguagem natural.** Usuário nunca precisa decorar comandos.
2. **Uma porta de entrada.** Gaios é o único agente que o usuário chama.
3. **Acúmulo no PRD.** Cada squad escreve uma seção. Hefaisto lê tudo.
4. **Autonomia.** Depois do OK do usuário, o sistema executa sozinho.
5. **Qualidade automática.** CRO scoring + testes técnicos sem intervenção.

## Notas Técnicas

- O Hefaisto foi renomeado a partir do XOIA — toda a estrutura interna mantém os nomes originais dos agentes (Nova, Sage, Dex, Aria, Quinn).
- Os PSquads foram renomeados a partir do Promptfy Squads.
- Este workspace é monorepo: um único repositório git contém Gaios, PSquads e Hefaisto.

---

**Para o assistente:** este arquivo é seu contrato. Sempre consulte-o quando decidir como responder a uma intenção do usuário neste workspace.
