# Promptfy OS

> **O Sistema Operacional do Empreendedor Digital.**
> Você descreve o negócio. O sistema entrega marca, copy, código e estratégia de tráfego.

```
   ____                            _    __
  / __ \_________  ____ ___  ____ | |  / /
 / /_/ / ___/ __ \/ __ `__ \/ __ \| | / /
/ ____/ /  / /_/ / / / / / / /_/ /| |/ /
\_/   /_/   \____/_/ /_/ /_/ .___/ |___/    OS
                          /_/
```

---

## O Que É

Promptfy OS é a primeira plataforma que une **estratégia comercial** e **engenharia técnica** em um único fluxo conversacional dentro do Claude Code.

Você não precisa saber programar. Não precisa decorar comandos. Não precisa coordenar equipes.

Você fala em português comum: *"quero criar um SaaS de barbearia"* — e o sistema entrega o produto pronto.

---

## Como Funciona

O Promptfy OS opera em 3 camadas que trabalham como um time:

```
🌱 GAIOS       —  A mente. Conversa com você e orquestra tudo.
                  ↓
👥 PSQUADS     —  O conselho. 18 squads especializados em marca,
                  copy, ofertas, growth, design, storytelling.
                  ↓
🔥 HEFAISTO    —  As mãos. Constrói o código de forma autônoma,
                  testa, mede CRO e entrega via Pull Request.
```

---

## Em 3 Frases

1. Você diz: *"quero criar X"*
2. Gaios chama os squads certos, monta um PRD completo
3. Hefaisto constrói o produto autonomamente em ciclos PLAN → BUILD → CHECK → SHIP

---

## Para Quem É

| Você é... | O Promptfy OS te entrega... |
|---|---|
| **Empreendedor solo** | Um time inteiro de marketing + dev sem contratar ninguém |
| **Agência de marketing** | Velocidade absurda — landing page em ~15 min |
| **Infoprodutor** | Funil completo (copy + página + integrações) sem freela |
| **Dev freelancer** | Cliente fechado com estratégia pronta — você só revisa o PR |
| **Estudante de negócio** | Aprender fazendo — cada etapa explicada por especialistas IA |

---

## Stack Tecnológica Suportada

Para a construção pelo Hefaisto:

- **Next.js + React** (recomendado para landing pages, SaaS, e-commerce)
- **Nuxt + Vue**
- **Astro** (sites estáticos, portfolios)
- **HTML puro** (páginas simples)
- **Go** (APIs de alta performance)
- **PHP + Laravel** (sistemas tradicionais)

---

## Integrações Pré-Configuradas

- **CRM:** HubSpot, Salesforce, RD Station, Pipedrive
- **Email:** Mailchimp, SendGrid, ActiveCampaign, ConvertKit
- **Analytics:** GA4, Mixpanel, Amplitude, Hotjar
- **Pagamento:** Stripe, PagSeguro, PayPal, Mercado Pago
- **Auth:** Auth0, Clerk, Supabase Auth

---

## Quick Start

### Para Quem Está Começando

Leia o **[INSTALL.md](./INSTALL.md)** — guia passo a passo, sem terminal, sem código.

### Para Quem Já Manja

```bash
git clone https://github.com/rebelo2024/promptfyos ~/Desktop/Promptfy-OS
cd ~/Desktop/Promptfy-OS
code .
# No Claude Code, digite: Olá Gaios
```

---

## Arquitetura do Repositório

```
PPR/                            ← Promptfy OS (será renomeado em produção)
│
├── CLAUDE.md                   ← contexto raiz (regras de ativação)
├── README.md                   ← este arquivo
├── INSTALL.md                  ← guia de instalação (vira PDF)
│
├── .claude/
│   ├── agents/
│   │   └── gaios.md            ← agente orquestrador
│   └── commands/
│
├── psquads/                    ← 18 squads de estratégia/marca/copy
│   ├── hormozi-squad/
│   ├── brand-squad/
│   ├── design-squad/
│   ├── storytelling/
│   ├── copy-master/
│   ├── traffic-masters/
│   ├── advisory-board/
│   ├── c-level-squad/
│   ├── data-squad/
│   └── ... (outros)
│
├── hefaisto/                   ← motor técnico (ex-XOIA)
│   ├── .claude/commands/Hefaisto/
│   └── .hefaisto-core/
│
└── docs/
    ├── PRD-template.md         ← modelo do documento de handoff
    └── PRD.md                  ← gerado durante o uso
```

---

## A Filosofia

> **Autonomia sem burocracia. Velocidade sem perder qualidade.**

O Promptfy OS nasceu da fusão de duas vertentes:

1. **Promptfy Squads** — coleção de squads de IA com expertise comercial (copy, marca, ofertas, tráfego)
2. **Hefaisto** — motor técnico autônomo derivado do XOIA / AIOX

Cada uma sozinha resolvia metade do problema. Juntas, sob o comando do **Gaios**, viram um time completo.

---

## Fluxo Real de Uso

```
DIA 1 — 9h00
👤 Usuário abre o VSCode, digita "Olá Gaios"

DIA 1 — 9h01
🌱 Gaios: "O que você quer criar hoje?"

DIA 1 — 9h05
👤 "SaaS para barbearia"
🌱 Gaios: faz 3 perguntas, monta a rota

DIA 1 — 9h10 às 11h
👥 PSquads executam em sequência:
   Hormozi → Brand → Design → Storytelling → Copy
   PRD.md sendo preenchido em tempo real

DIA 1 — 11h
🌱 Gaios: "PRD pronto. Acordar o Hefaisto?"
👤 "go"

DIA 1 — 11h05 às 18h
🔥 Hefaisto constrói:
   Nova → Sage → Aria → Dex → Quinn
   PR aberto no GitHub

DIA 2
✅ Produto pronto pra ir ao ar
```

---

## Componentes Principais

### Gaios — Orquestrador
Único agente que o usuário precisa conhecer. Documentado em [`.claude/agents/gaios.md`](./.claude/agents/gaios.md).

### PSquads — Squads Especialistas
18 squads, cada um com agentes próprios e metodologias específicas. Veja [`psquads/README.md`](./psquads/README.md).

### Hefaisto — Motor de Execução
Framework autônomo de engenharia. 5 agentes internos (Nova, Sage, Aria, Dex, Quinn). Veja [`hefaisto/README.md`](./hefaisto/README.md).

---

## Licença

MIT — use, modifique, distribua.

---

**🌱 Promptfy OS**
*Da ideia ao produto, sem fricção.*
