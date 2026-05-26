# PRD — Transformação Hefaisto → Hefaisto

## Executive Summary

Transformar o Synkra Hefaisto em **Hefaisto**: um meta-framework **autônomo** especialista em desenvolvimento de soluções digitais para agências de marketing. O usuário descreve o que precisa em linguagem natural e o Hefaisto executa o ciclo completo (PLAN → BUILD → CHECK → SHIP) automaticamente, sem necessidade de comandos manuais. Reduzir agentes de 13 para 4 internos, workflows de 14 para 1 ciclo autônomo, gates de 6 para 1 automático, e eliminar toda infraestrutura de squads/clones. Cada agente é carregado com técnicas e metodologias fundamentadas nos melhores profissionais do mercado de marketing digital.

---

## 1. Problema

O Hefaisto atual sofre de burocracia operacional que o torna lento, caro em tokens e difícil de usar:

| Métrica | Estado Atual | Impacto |
|---------|-------------|---------|
| Agentes | 13 (12+1 master) | Context bloat, handoff de ~379 tokens por switch |
| Workflows | 14 YAML definitions | Overhead de navegação e decisão |
| Quality Gates | 6 (story validation, dev gate, QA gate, constitutional, quality, IDS G1-G6) | Mínimo 6 checkpoints antes de push |
| Tasks | 207 definitions | Impossível navegar sem ajuda |
| Rules | 10 arquivos | Carregamento contextual pesado |
| Story States | 5 obrigatórios (Draft→Ready→InProgress→InReview→Done) | 4+ agent switches por story |
| CLAUDE.md | 357 linhas | ~8K tokens de context fixo |
| Story Validation | Checklist de 10 pontos obrigatório | Bloqueia desenvolvimento antes de começar |
| QA Gate | 7 checks obrigatórios | Overhead desproporcional para tasks simples |

### Dores Específicas
- Agentes genéricos sem expertise de domínio
- Sem foco em agências de marketing e suas necessidades reais
- Obrigatório criar story para qualquer mudança, mesmo trivial
- Constitution formal com "NON-NEGOTIABLE" gates que bloqueiam fluxo
- Protocolo de handoff entre agentes consome tokens sem gerar valor
- Operações exclusivas (@devops para git push) forçam switches desnecessários

---

## 2. Visão Hefaisto

Hefaisto é um framework de orquestração de agentes AI **especializado em soluções para agências de marketing digital**. Cada agente é um especialista sênior carregado com técnicas dos melhores profissionais do mercado.

### 4 Princípios

| Princípio | Descrição |
|-----------|-----------|
| **Autonomia** | O Hefaisto executa ciclos completos. O usuário descreve, o Hefaisto entrega. |
| **Qualidade** | Lint, test, typecheck devem passar. Siga padrões existentes. Avalie conversão, não só bugs. |
| **Requisitos** | Não invente features. Trace trabalho a requisitos ou pedidos do usuário. |
| **Velocidade** | Minimize overhead. Escolha a abordagem mais simples. Pule cerimônia quando não agrega valor. |

---

## 3. Dores de Agências que Hefaisto Resolve

### 3.1 Velocidade de Entrega
Clientes esperam páginas de campanha em horas. O gap entre "design aprovado" e "live em produção" é onde agências perdem margem.
- **Hefaisto resolve:** Modo Quick do Cycle permite BUILD → CHECK → SHIP sem cerimônia.

### 3.2 Espiral de Revisões
Revisões infinitas matam margem. "Pode tentar em azul?" multiplicado por 15 stakeholders.
- **Hefaisto resolve:** @qa aplica princípios CCD (Conversion-Centered Design) de Oli Gardner para fundamentar decisões em dados, não opinião.

### 3.3 Integração Multi-Canal
Landing pages precisam conectar CRMs, email, ad networks, analytics, CDPs. Cada cliente tem stack diferente.
- **Hefaisto resolve:** @architect aplica Composable MarTech de Brinker/Riemersma — classifica integrações por padrão (iPaaS, API, webhook, embedded).

### 3.4 Performance (Core Web Vitals, Ad Quality Score)
Landing pages lentas matam ROI de ads. Google penaliza Core Web Vitals no quality score.
- **Hefaisto resolve:** @dev gera código com performance budget nativo, seguindo princípios de Webflow e Unbounce.

### 3.5 Conteúdo em Escala
Agências precisam de 10-50 variantes de landing page por campanha, localizadas, personalizadas.
- **Hefaisto resolve:** @dev com templates componentizados e @product com AI-readiness scoring de Paul Roetzer.

### 3.6 Atribuição e Tracking (Provar ROI)
"Qual canal gerou essa venda?" — clientes perguntam e agências não conseguem responder.
- **Hefaisto resolve:** @product implementa multi-touch attribution (Markov/Shapley, nunca last-click) via Christopher Penn, com See-Think-Do-Care de Kaushik.

### 3.7 Profitabilidade
Agências operam com margens finas (10-20%). Clientes pressionam preço.
- **Hefaisto resolve:** @hefaisto aplica Productized Services de Sakas e ABR (Average Billable Rate) de Marcel Petitpas para padronizar entregas.

### 3.8 Dívida Técnica de Iteração Rápida
"Lança agora, arruma depois" cria patchwork após 12 meses.
- **Hefaisto resolve:** @architect aplica Growth Loops de Balfour — cada loop conta custo de manutenção. @dev usa component library desde o início.

---

## 4. Novo Modelo de Agentes — 5 Especialistas Sênior

### @hefaisto — O Orquestrador
**Inspirado em:** Scott Brinker (ChiefMartec), Karl Sakas (Made to Lead), Marcel Petitpas (Parakeeto)

| Capacidade | Metodologia |
|-----------|-------------|
| Orquestração de framework | Composable MarTech (Brinker) — modular, nunca monolítico |
| Gestão de entregas | Productized Services (Sakas) — padroniza entregas repetíveis |
| Profitabilidade | ABR Framework (Petitpas) — rastreia custo real de entrega |
| Scope control | Swim Lanes (Sakas) — fronteiras claras de escopo |

**Comandos:** `*help`, `*status`, `*waves`

---

### @dev — O Builder
**Inspirado em:** Vlad Magdalin (Webflow), Rick Perreault (Unbounce), Dharmesh Shah (HubSpot)

| Capacidade | Metodologia |
|-----------|-------------|
| Landing pages performáticas | Visual Development Architecture (Magdalin) — semântico, component-based |
| A/B testing nativo | Conversion-Centered Infrastructure (Perreault) — scaffolding de testes por padrão |
| Integrações extensíveis | Inbound Engineering (Shah) — API-first, developer ecosystem |
| Performance | Core Web Vitals budget — otimização como constraint, não afterthought |
| Full pipeline | Código, testes, commits, push, PRs — sem restrições |

**Absorve:** @dev + @devops + capacidades UI de @ux-design-expert
**Comandos:** `*build`, `*ship`, `*fix`

---

### @architect — O Estrategista Técnico
**Inspirado em:** David Raab (CDP Institute), Brian Balfour (Reforge), Frans Riemersma (MarTech Composability)

| Capacidade | Metodologia |
|-----------|-------------|
| Data architecture | Unified Customer Profile (Raab) — single source of truth |
| Growth systems | Growth Loops (Balfour) — sistemas interconectados, não funis |
| Tech stack design | Composable MarTech (Riemersma) — 80% plataforma + 20% extensões |
| Integration patterns | Classificação por tipo (iPaaS, API, webhook, embedded) |
| Database design | Schema design, RLS, migrations, query optimization |

**Absorve:** @architect + @data-engineer + capacidades analíticas de @analyst
**Comandos:** `*design`, `*discover`, `*integrate`

---

### @qa — O Otimizador
**Inspirado em:** Peep Laja (CXL), Oli Gardner (Unbounce/CCD), Dr. Flint McGlaughlin (MECLABS)

| Capacidade | Metodologia |
|-----------|-------------|
| Research-first testing | ResearchXL (Laja) — 6 passos: análise técnica, heurística, analytics, mouse tracking, surveys, user testing |
| Conversion scoring | 7 princípios CCD (Gardner) — Attention Ratio 1:1, Message Match, Congruence, Clarity, Credibility, Closing, Continuance |
| Heurística de conversão | MECLABS (McGlaughlin) — C = 4m + 3v + 2(i-f) - 2a |
| Quality assurance | Lint, tests, typecheck + avaliação CRO |

**Absorve:** @qa com DNA de CRO (Conversion Rate Optimization)
**Comandos:** `*check`, `*audit`, `*score`

---

### @product — O Estrategista de Produto
**Inspirado em:** Sean Ellis (GrowthHackers), Andrew Chen (a16z), Avinash Kaushik (Google), Paul Roetzer (Marketing AI Institute), Christopher Penn (TrustInsights)

| Capacidade | Metodologia |
|-----------|-------------|
| Priorização | ICE Scoring (Ellis) — Impact, Confidence, Ease |
| Customer journey | See-Think-Do-Care (Kaushik) — métricas por estágio |
| Attribution | Multi-touch (Penn) — Markov/Shapley, nunca last-click |
| AI readiness | 5Ps of Marketing AI (Roetzer) — avalia automatizabilidade |
| Growth strategy | Cold Start Problem (Chen) — network effects, growth loops |

**Absorve:** @pm + @po + @sm + capacidades analíticas de @analyst
**Comandos:** `*story`, `*plan`, `*prioritize`

---

## 5. Novo Workflow — The Cycle

```
PLAN  →  BUILD  →  CHECK  →  SHIP
```

### 3 Modos

| Modo | Quando Usar | Passos | Agentes (roteados por @hefaisto) |
|------|-------------|--------|------------------------------|
| **Quick** | Bug fixes, config, hotfixes, mudanças triviais | BUILD → CHECK → SHIP | @dev |
| **Standard** | Features, landing pages, integrações, stories | PLAN → BUILD → CHECK → SHIP | @product + @dev + @qa |
| **Deep** | Arquitetura complexa, brownfield, sistemas novos | PLAN (design doc) → BUILD → CHECK → SHIP | @architect + @product + @dev + @qa |

**Nota:** @hefaisto é o orquestrador implícito que roteia entre agentes automaticamente. O usuário não precisa ativá-lo — ele é o próprio ciclo autônomo.

### Qualidade Integrada

```
CHECK = npm run lint + npm test + npm run typecheck
```

- Para landing pages, o CHECK aplica automaticamente CRO scoring (CCD + MECLABS + Core Web Vitals)
- Review detalhado por @qa é automático em Standard/Deep, opcional em Quick
- @qa avalia não só bugs, mas **conversão e UX** usando CCD e MECLABS
- Sem checklist de 10 pontos, sem 7-check gate, sem constitutional enforcement

### Stories Opcionais

| Tamanho | O que precisa | Estados |
|---------|--------------|---------|
| Trivial (typo, config) | Nada — só faça | Nenhum |
| Pequeno (bug fix, feature simples) | Descrição no prompt | Nenhum |
| Médio (feature, landing page) | Story file em `docs/stories/` | `todo` → `done` |
| Grande (epic, multi-story) | Story files + epic doc | `todo` → `doing` → `done` |

**Formato de story simplificado:** Title, Description, Acceptance Criteria, Tasks (checklist). Tudo mais é opcional.

---

## 6. Mudanças Técnicas

### 6.1 Diretórios Deletados
| Diretório | Motivo |
|-----------|--------|
| `.antigravity/` | IDE não utilizada |
| `.cursor/` | IDE não utilizada |
| `.gemini/` | IDE não utilizada |

### 6.2 Agentes Removidos
`@sm`, `@po`, `@pm`, `@analyst`, `@data-engineer`, `@ux-design-expert`, `@devops`, `@squad-creator`

### 6.3 Conceitos Removidos
- **Squads** — toda infraestrutura (agent, tasks, templates, scripts, schemas)
- **Clones** — mind-clone governance
- **Constitution formal** — substituída por 3 princípios simples
- **Boundary L1-L4** — proteção simplificada
- **IDS Gates G1-G6** — removidos
- **Agent Authority matrix** — sem operações exclusivas
- **Agent Handoff protocol** — menos agentes = menos switches
- **Story lifecycle 5 estados** — reduzido para 2-3 opcionais

### 6.4 Rules Reorganizadas
| Antes (10 files) | Depois (4 files) |
|-------------------|-------------------|
| agent-authority, agent-handoff, agent-memory-imports | `agents.md` |
| story-lifecycle, workflow-execution | `workflow.md` |
| ids-principles, coderabbit-integration | `quality.md` |
| mcp-usage, tool-examples, tool-response-filtering | `tools.md` |

### 6.5 Renomeações
- `.claude/commands/Hefaisto/` → `.claude/commands/Hefaisto/`
- `hefaisto-master.md` → `hefaisto.md`
- `slashPrefix: Hefaisto` → `slashPrefix: Hefaisto`

---

## 7. Métricas de Sucesso

| Métrica | Hefaisto (antes) | Hefaisto (depois) | Redução |
|---------|-------------|---------------|---------|
| Agentes | 13 | 5 | 62% |
| Workflows | 14 | 1 (3 modos) | 93% |
| Quality Gates | 6 | 1 | 83% |
| Rule Files | 10 | 4 | 60% |
| CLAUDE.md | 357 linhas (~8K tokens) | 117 linhas (~3K tokens) | 67% |
| Story states obrigatórios | 5 | 0 (opcional: 2-3) | 100% |
| Agent switches por story | 4+ | 1-2 | 50-75% |
| Token overhead por workflow | ~12K+ | ~3K | 75% |

---

*Hefaisto PRD v1.0 — 2026-03-30*
