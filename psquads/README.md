# PSquads — O Conselho do Promptfy OS

**As maiores mentes do marketing e da estratégia, trabalhando para você.**

Os PSquads são a camada de **estratégia, marca e copy** do [Promptfy OS](../README.md). São **13 squads** de agentes de IA especializados — cada um modelado a partir de referências reais de sua área — que o **Gaios** aciona conforme a necessidade do seu projeto.

> Você não chama os squads diretamente. Você fala com o **Gaios** em linguagem natural; ele roteia para o squad certo e junta tudo no `docs/PRD.md`, que o **Hefaisto** usa para construir.

## Squads Disponíveis

| Squad | Líder | Foco |
|-------|-------|------|
| Advisory Board | `@board-chair` | Conselho estratégico (Ray Dalio, Charlie Munger, Naval, Thiel, Sinek…) |
| Brand Squad | `@brand-chief` | Marca, naming e posicionamento (Aaker, Neumeier, Al Ries, Miller…) |
| C-Level Squad | `@vision-chief` | Liderança executiva virtual (CEO, CTO, CMO, COO, CIO, CAIO) |
| Claude Code Mastery | `@claude-mastery-chief` | Domínio de Claude Code, hooks, MCP, configuração de agentes |
| Content Squad | `@content-chief` | Conteúdo orgânico, carrosséis, reels |
| Copy Master | `@copy-master-chief` | Copy de conversão (Halbert, Schwartz, Ogilvy, Hormozi, Sugarman…) |
| Cybersecurity | `@cyber-chief` | Segurança ofensiva e defensiva, pentest, recon |
| Data Squad | `@data-chief` | Analytics, growth e comunidade (Sean Ellis, Kaushik, Fader…) |
| Design Squad | `@design-chief` | UX/UI, design systems e geração de ativos visuais (gpt-image-2) |
| Hormozi Squad | `@hormozi-chief` | Ofertas, leads e escala (framework Alex Hormozi) |
| Movement | `@movement-chief` | Construção de movimentos e comunidades |
| Storytelling | `@story-chief` | Narrativa e pitch (Campbell, Klaff, Duarte, Harmon…) |
| Traffic Masters | `@traffic-chief` | Tráfego pago e mídia (Pedro Sobral, Kasim Aslam, Molly Pittman…) |

## Contexto de marca — Brand-Brain

Os squads não trabalham no vácuo: eles leem o **segundo cérebro persistente** da marca em **[`brand-brain/`](../brand-brain/)** (na raiz do workspace). Lá ficam marca, oferta, audiência, conteúdo, tráfego e financeiro, além de bancos reutilizáveis (headlines, bullets, objeções, garantias, design-tokens, ICPs, personas).

Antes de perguntar algo ao usuário, o squad **consulta o brand-brain primeiro** e cita a fonte. Os assets vencedores são promovidos de volta para `brand-brain/03-resources/` — o cérebro cresce a cada projeto. Contrato completo em [`brand-brain/00-index/SCHEMA.md`](../brand-brain/00-index/SCHEMA.md).

## Como o Gaios invoca um squad

1. O Gaios lê o agente principal em `psquads/{squad}/agents/{chief}.md`.
2. O squad executa sua task (ofertas, naming, design, narrativa, copy…).
3. O resultado é escrito como uma **seção do `docs/PRD.md`**.
4. Repete-se para cada squad necessário, na ordem definida pelo Gaios.

## Estrutura de cada squad

```
{squad}/
├── squad.yaml          # Manifesto do squad (agentes, tasks, workflows)
├── agents/             # Personas (chief + especialistas)
├── tasks/              # Tasks executáveis com inputs/outputs
├── workflows/          # Workflows multi-agente
├── checklists/         # Checklists de qualidade
├── config/ · data/     # Configuração e catálogos de referência
```

---

**PSquads** — parte do **Promptfy OS**. Uma porta de entrada: o Gaios.
