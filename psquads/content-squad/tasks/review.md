# Task: Review

## Metadata
```yaml
id: review
title: "Revisao de Conteudo Produzido"
agent: content-chief
elicit: true
inputs:
  - content: "Conteudo a revisar (carrossel, reel, post, caption)"
  - type: "Tipo de conteudo"
  - criteria: "Criterios de revisao (opcional)"
outputs:
  - score: "Pontuacao geral (0-100)"
  - feedback: "Feedback estruturado por dimensao"
  - improvements: "Lista de melhorias especificas"
  - revised_version: "Versao revisada (se solicitado)"
```

## Pipeline

### ETAPA 1 — Identificacao do Conteudo

Perguntar ao usuario:
1. "O que voce quer revisar? Cole o conteudo aqui ou descreva o que quer avaliar."
2. "E um carrossel, reel, caption ou post?"

### ETAPA 2 — Contexto de Revisao

```
Ler: brand-context/BRAND_CONTEXT.md
Extrair: tom_de_voz, palavras_chave, palavras_proibidas, publico_alvo
```

### ETAPA 3 — Avaliacao por Dimensao

#### Para Carrossel:

```
DIMENSAO 1 — HOOK (0-25 pts)
  [ ] Para o scroll em menos de 2 segundos? (+10)
  [ ] Maximo 8 palavras? (+5)
  [ ] Cria curiosidade ou promete beneficio claro? (+10)

DIMENSAO 2 — ESTRUTURA (0-25 pts)
  [ ] Cada slide tem apenas uma ideia? (+10)
  [ ] Ha tensao entre slides (usuario quer ver o proximo)? (+10)
  [ ] CTA especifico no ultimo slide? (+5)

DIMENSAO 3 — COPY (0-25 pts)
  [ ] Maximo 40 palavras por slide? (+10)
  [ ] Tom de voz alinhado com a marca? (+10)
  [ ] Palavras proibidas ausentes? (+5)

DIMENSAO 4 — VISUAL (0-25 pts)
  [ ] Prompts de imagem sao especificos e visuais? (+10)
  [ ] Consistencia visual entre os slides? (+10)
  [ ] Formato correto para a plataforma? (+5)
```

#### Para Reel/Script:

```
DIMENSAO 1 — ABERTURA (0-25 pts)
  [ ] Hook nos primeiros 3 segundos? (+15)
  [ ] Funciona sem audio (texto na tela)? (+10)

DIMENSAO 2 — RITMO (0-25 pts)
  [ ] Cortes rapidos o suficiente para a plataforma? (+10)
  [ ] Duracao adequada ao formato? (+15)

DIMENSAO 3 — CLAREZA (0-25 pts)
  [ ] Mensagem principal clara? (+15)
  [ ] CTA especifico e visivel? (+10)

DIMENSAO 4 — MARCA (0-25 pts)
  [ ] Tom de voz da marca presente? (+15)
  [ ] Palavras proibidas ausentes? (+10)
```

#### Para Caption:

```
DIMENSAO 1 — HOOK (0-30 pts)
  [ ] Primeiras 125 chars sao irresistiveis? (+20)
  [ ] Cria curiosidade para "ver mais"? (+10)

DIMENSAO 2 — CORPO (0-30 pts)
  [ ] Desenvolve o hook com valor? (+15)
  [ ] Paragrafos curtos, faceis de ler? (+15)

DIMENSAO 3 — CTA (0-20 pts)
  [ ] CTA especifico e claro? (+10)
  [ ] Uma unica acao solicitada? (+10)

DIMENSAO 4 — HASHTAGS (0-20 pts)
  [ ] Mix de grande/medio/nicho? (+10)
  [ ] Relevantes ao conteudo? (+10)
```

### ETAPA 4 — Feedback Estruturado

```markdown
## Revisao: [TIPO] — [TEMA]
**Pontuacao:** [X]/100

---
### PONTOS FORTES
- [o que funciona bem]
- [...]

### PONTOS DE MELHORIA
- [problema especifico] → [como corrigir]
- [...]

### SCORE POR DIMENSAO
- Hook/Abertura: [X]/25
- Estrutura/Ritmo: [X]/25
- Copy/Clareza: [X]/25
- Visual/Marca: [X]/25

---
### VEREDICTO
[APROVADO / APROVADO COM RESSALVAS / REVISAR ANTES DE PUBLICAR]

[Uma frase explicando o veredicto]
```

### ETAPA 5 — Versao Revisada (Opcional)

Perguntar: "Quer que eu entregue uma versao revisada com as melhorias aplicadas?"

Se sim:
- Aplicar todas as melhorias identificadas
- Entregar versao completa revisada
- Destacar o que foi alterado

## Notas
- A revisao usa o BRAND_CONTEXT.md como referencia de tom e palavras
- Se BRAND_CONTEXT estiver vazio, a revisao foca apenas em boas praticas de conteudo
- Uma pontuacao abaixo de 70 indica que o conteudo deve ser revisado antes de publicar
