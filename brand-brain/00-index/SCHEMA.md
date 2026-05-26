---
name: schema
description: Regras de organização do brand-brain. Padrão Karpathy LLM Wiki + PARA (Tiago Forte). Markdown puro + wikilinks. LLM-independente.
type: schema
---

# SCHEMA — Regras do brand-brain

> Este arquivo é o **contrato** do segundo cérebro. Toda LLM (Gaios, GPT, Cursor, Gemini, futuras) deve respeitar estas regras. Sem isso, o cérebro vira lixo em 3 meses.

## Princípios Fundamentais

1. **Markdown puro.** Nenhum formato proprietário. Nada de `.anthropic`, `.notion`, `.obsidian`.
2. **Wikilinks `[[nome-do-arquivo]]`.** Sem extensão. Sem caminho. Resolve por nome único.
3. **Frontmatter YAML padrão.** Sempre no topo, sempre com `name` e `description`.
4. **Naming kebab-case.** Tudo minúsculo, com hífens. Datas em `YYYY-MM` ou `YYYY-MM-DD`.
5. **PARA estrita.** Cada arquivo mora em UMA pasta. Sem duplicação.
6. **LLM-independente.** Se trocar de Claude para GPT, o cérebro continua funcionando.

## Estrutura PARA (Tiago Forte)

| Pasta | Significa | O que mora aqui |
|---|---|---|
| `01-projects/` | Projects | Trabalho ATIVO com prazo. Cada projeto = uma subpasta `YYYY-MM-{nome}/` |
| `02-areas/` | Areas | Responsabilidade CONTÍNUA da marca. Sem prazo. Vivem para sempre |
| `03-resources/` | Resources | Material REUTILIZÁVEL. Bancos de copy, ICPs, templates |
| `04-archive/` | Archive | Projetos CONCLUÍDOS. Organizados por trimestre `YYYY-qN/` |
| `_raw/` | Ingest | Material NÃO PROCESSADO. Notas, transcripts, inspirações. Gaios processa daqui pras outras pastas |

## As 3 Operações (Karpathy)

### 1. INGEST — Processar material novo

**Gatilho:** Usuário coloca algo em `_raw/` (nota, transcript, link, insight solto).

**Comportamento do Gaios:**
1. Ler o arquivo bruto.
2. Identificar a qual `02-areas/` ou `03-resources/` pertence.
3. Extrair os fatos/decisões/claims e adicionar nas páginas relevantes.
4. Atualizar **10-15 páginas relacionadas** com backlinks `[[]]` quando fizer sentido.
5. Mover o arquivo bruto para `_raw/{ano}-processados/` ou deletar se já totalmente absorvido.
6. Logar em `00-index/CHANGELOG.md`.

### 2. QUERY — Responder pergunta do lead

**Gatilho:** Lead pergunta algo sobre a marca ("qual é meu ICP?", "que headlines já funcionaram?").

**Comportamento do Gaios:**
1. Consultar `02-areas/` e `03-resources/` ANTES de perguntar ao usuário.
2. Se a informação existir → responder usando o cérebro como fonte.
3. Se NÃO existir → perguntar ao usuário E gravar a resposta na área certa.
4. Citar a fonte: "segundo `02-areas/audiencia.md`, seu ICP é…".

### 3. LINT — Detectar inconsistências

**Gatilho:** Gaios percebe contradição entre duas páginas ou claim antigo desatualizado.

**Comportamento do Gaios:**
1. Apontar a contradição explicitamente ao lead.
2. Perguntar qual versão é a correta.
3. Atualizar a página vencedora e marcar a outra como `## Histórico` ou deletar.
4. Logar em `00-index/CHANGELOG.md`.

## Convenções de Naming

### Arquivos
- `kebab-case.md` para arquivos individuais.
- `README.md` em CADA subpasta explicando o propósito dela.
- Sem espaços, sem acentos, sem maiúsculas (exceto `README.md`, `INDEX.md`, `SCHEMA.md`, `CHANGELOG.md`).

### Pastas de projetos
- `01-projects/YYYY-MM-{nome-projeto}/` — ex: `2026-05-landing-page-curso-x/`.
- Nome do projeto curto, descritivo, kebab-case.

### Pastas de arquivo
- `04-archive/YYYY-qN/` — ex: `2026-q2/` para projetos arquivados no 2º trimestre de 2026.

## Frontmatter YAML — Padrão por Tipo

### Áreas (`02-areas/*.md`)
```yaml
---
name: marca
description: Identidade, posicionamento, voz e arquétipos da marca.
type: area
updated: 2026-05-26
---
```

### Recursos (`03-resources/*.md`)
```yaml
---
name: headlines-banco
description: Banco de headlines testadas e suas métricas de conversão.
type: resource
updated: 2026-05-26
---
```

### Projetos (`01-projects/*/README.md`)
```yaml
---
name: 2026-05-landing-page-curso-x
description: Landing page de captação para o curso X.
type: project
status: active | paused | done
started: 2026-05-26
deadline: 2026-06-15
---
```

### Notas brutas (`_raw/*.md`)
```yaml
---
name: nota-podcast-2026-05-20
description: Insights do podcast Y sobre objeções de vendas.
type: raw
captured: 2026-05-20
processed: false
---
```

## Regras de Wikilinks `[[]]`

- Sempre use `[[nome-do-arquivo]]` SEM extensão e SEM caminho.
- Os nomes precisam ser ÚNICOS no brand-brain inteiro.
- Se um link aponta para arquivo que ainda não existe → cria placeholder ou anota no `CHANGELOG.md` como "TODO".
- Linkar liberalmente. Conexão é o valor do cérebro.

## Regras de Localização (o que vai onde)

### Vai em `01-projects/{projeto}/`
- PRD do projeto, decisões específicas, copy do projeto, métricas, links pro código.
- Tudo que **morre quando o projeto acaba** (ou vai pro archive).

### Vai em `02-areas/`
- Identidade da marca, oferta atual, ICP atual, estratégia de tráfego atual.
- Tudo que é **estado vivo da marca** — atualizado, sem prazo.

### Vai em `03-resources/`
- Bancos reutilizáveis: headlines vencedoras, bullets, objeções/respostas, garantias, design tokens, personas.
- Tudo que **pode servir para múltiplos projetos**.

### Vai em `04-archive/`
- Projetos finalizados. Pasta inteira movida de `01-projects/` para `04-archive/{trimestre}/`.

### Vai em `_raw/`
- Tudo que ainda NÃO foi processado. É o "inbox" do cérebro.

## Quando o Gaios CONSULTA o cérebro

**Sempre** antes de fazer uma pergunta ao usuário:
1. Olhar `02-areas/` para ver se já existe a resposta.
2. Olhar `03-resources/` para ver se há material reutilizável aplicável.
3. Olhar `01-projects/` (ativos) para ver se há contexto recente.

**Se a informação existe →** usar e citar a fonte.
**Se não existe →** perguntar e gravar.

## Quando o Gaios ESCREVE no cérebro

**Durante o fluxo:**
- Cada squad que produz output → Gaios grava em `01-projects/{projeto}/`.
- Insights novos sobre a marca → grava em `02-areas/` correspondente.

**Ao final de cada projeto:**
- Promover decisões que viraram padrão para `02-areas/`.
- Promover assets reutilizáveis para `03-resources/`.
- Atualizar `00-index/INDEX.md` e `00-index/CHANGELOG.md`.
- Mover projeto para `04-archive/{trimestre}/` quando concluído.

## O Que o Gaios NUNCA Faz

- ❌ Deletar arquivos do lead sem confirmação.
- ❌ Duplicar conteúdo entre pastas.
- ❌ Quebrar wikilinks ao renomear (precisa atualizar referências).
- ❌ Inventar fatos sobre a marca — só grava o que o lead disse.
- ❌ Misturar `_raw/` com `02-areas/` (raw é staging, area é processado).

## Versionamento

- `00-index/CHANGELOG.md` registra TODA mutação relevante: criação de área, promoção de resource, archive de projeto, lint resolvido.
- Formato: `## YYYY-MM-DD` + bullets do que mudou.
