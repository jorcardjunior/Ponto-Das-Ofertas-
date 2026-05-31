# CLAUDE.md — PSquads (Conselho do Promptfy OS)

Os **PSquads** são a camada de **estratégia, marca e copy** do Promptfy OS. Eles **não são instalados nem rodados isoladamente** pelo usuário — o **Gaios** (`.claude/agents/gaios.md`, na raiz) é a única porta de entrada e roteia para o squad certo conforme a necessidade do projeto.

> Este arquivo orienta o Claude quando estiver operando dentro de `psquads/`. A arquitetura completa está no `CLAUDE.md` da raiz.

## Como os PSquads são usados

1. O usuário fala com o **Gaios** em linguagem natural ("quero criar X").
2. O Gaios identifica o que falta (oferta, marca, design, narrativa, copy…) e **lê o agente principal do squad** em `psquads/{squad}/agents/{chief}.md`.
3. O squad produz sua seção e **alimenta o `docs/PRD.md`** (documento de handoff).
4. Com o PRD pronto, o Gaios aciona o **Hefaisto** (`/Hefaisto:init`) para construir.

O usuário **nunca** precisa decorar comandos nem ativar um squad manualmente. Se quiser controle direto, pode invocar um agente pelo nome (ex.: `@brand-chief`), mas o fluxo normal é via Gaios.

## Contexto de marca — vem do Brand-Brain (raiz)

⚠️ **Importante:** o contexto da marca **não** mora mais aqui. O segundo cérebro persistente fica em **`brand-brain/`** na raiz do workspace (padrão Karpathy + PARA, markdown puro com wikilinks `[[]]`).

**Antes de perguntar qualquer coisa** sobre marca, oferta, audiência, conteúdo, tráfego ou financeiro, **consulte primeiro**:
- `brand-brain/00-index/INDEX.md`
- `brand-brain/02-areas/` (marca, ofertas, audiência, conteúdo, tráfego, financeiro)
- `brand-brain/03-resources/` (headlines, bullets, objeções, garantias, design-tokens, ICPs, personas)

Se a informação já existe lá, **use-a e cite a fonte**. Os assets vencedores produzidos pelos squads são promovidos de volta para `brand-brain/03-resources/`, fazendo o cérebro crescer a cada projeto.

## Estrutura de cada squad

```
{squad}/
├── squad.yaml          # Manifesto (agentes, tasks, workflows)
├── agents/             # Personas (chief + especialistas)
├── tasks/              # Tasks executáveis
├── workflows/          # Workflows multi-agente
├── checklists/         # Qualidade
├── config/ · data/     # Configuração e catálogos de referência
```

## Notas para o Claude

- A porta de entrada é o **Gaios** — não proponha setup manual, `npm install` nem ferramentas externas.
- Sempre **consulte o `brand-brain/` antes de perguntar** ao usuário.
- Os PSquads escrevem **seções do `docs/PRD.md`**; o Hefaisto lê tudo na fase de construção.
- Veja a lista dos squads e seus líderes em `psquads/README.md`.
