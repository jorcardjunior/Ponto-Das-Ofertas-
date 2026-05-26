# Task: Create Reel Script

## Metadata
```yaml
id: create-reel-script
title: "Pipeline de Script para Reels"
agent: content-chief
elicit: true
inputs:
  - topic: "Tema ou ideia do reel"
  - format: "Formato (tutorial, storytelling, tendencia, bastidores, opiniao)"
  - duration: "Duracao alvo (15s, 30s, 60s)"
  - hook_style: "Estilo de hook (visual, verbal, pergunta, polêmico)"
outputs:
  - script: "Roteiro completo cena por cena"
  - hooks: "3 opcoes de hook de abertura"
  - caption: "Caption otimizado para Reels"
  - filming_notes: "Notas de filmagem eedicao"
  - cta: "CTA especifico ao final"
```

## Pipeline

### ETAPA 1 — Contexto da Marca
```
Ler: brand-context/BRAND_CONTEXT.md
Extrair:
  - nome_marca
  - tom_de_voz
  - publico_alvo
  - produto/servico principal
  - palavras_chave obrigatorias
```

### ETAPA 2 — Elicitacao (elicit: true)

Perguntar ao usuario (um por vez):

1. **Tema:** "Sobre o que e esse reel? Descreva em 1-2 frases."
2. **Formato:** "Qual o objetivo?
   - [1] Tutorial / Como fazer (passo a passo)
   - [2] Storytelling / Historia pessoal
   - [3] Tendencia / Trend com audio viral
   - [4] Bastidores / Behind the scenes
   - [5] Opiniao / Posicionamento forte"
3. **Duracao:** "Qual a duracao ideal?
   - [1] 15 segundos (impacto rapido)
   - [2] 30 segundos (standard)
   - [3] 60 segundos (conteudo denso)"
4. **Hook:** "Como voce quer comecar?
   - [1] Visual impactante (sem fala nos primeiros 2s)
   - [2] Frase verbal forte logo de cara
   - [3] Pergunta que gera curiosidade
   - [4] Afirmacao polêmica"

### ETAPA 3 — Estrutura do Roteiro

Baseado no formato e duracao, definir:

**Tutorial (30s):**
```
0-3s:   Hook visual ou verbal
3-8s:   Problema / Por que importa
8-25s:  Passo 1 → Passo 2 → Passo 3 (rapido)
25-30s: Resultado + CTA
```

**Storytelling (60s):**
```
0-3s:   Hook — o momento mais tenso da historia
3-15s:  Contexto — quem era antes
15-40s: Jornada — o que aconteceu
40-55s: Virada — o insight ou resultado
55-60s: Licao + CTA
```

**Tutorial Rapido (15s):**
```
0-2s:   Hook (palavra ou visual)
2-12s:  3 pontos ultra-rapidos
12-15s: CTA
```

**Tendencia (15-30s):**
```
0-2s:   Audio/visual da trend
2-N:    Conteudo adaptado ao tema da marca
N:      CTA integrado na trend
```

**Opiniao (30-60s):**
```
0-3s:   Afirmacao forte / polêmica
3-10s:  "E aqui esta o porque..."
10-40s: Argumentos (3 pontos)
40-N:   Inversao / Conclusao
N:      CTA
```

### ETAPA 4 — Roteiro Cena por Cena

Entregar em formato de producao:

```
CENA 1 [0-3s]
Visual: [o que aparece na tela]
Audio/Fala: "[texto exato que o criador vai falar]"
Texto na tela: "[legenda ou texto sobreposto]"
Transicao: [corte/fade/zoom/cut to beat]

CENA 2 [3-8s]
Visual: [...]
Audio/Fala: "[...]"
Texto na tela: "[...]"
Transicao: [...]

[...demais cenas...]
```

### ETAPA 5 — Hooks Alternativos

Gerar 3 opcoes de abertura para o usuario testar:

```
HOOK A (Curiosidade): "[frase ou visual]"
HOOK B (Polêmico): "[frase ou visual]"
HOOK C (Resultado): "[frase ou visual]"
```

### ETAPA 6 — Notas de Filmagem e Edicao

```
FILMAGEM:
- Iluminacao: [natural / ring light / studio]
- Enquadramento: [close / medio / plano aberto]
- Cenario: [fundo neutro / ambiente real / externo]
- Equipamento: [celular suficiente / gimbal recomendado]

EDICAO:
- Ritmo: [corte a cada X segundos]
- Musica: [sugestao de genero / procurar no Reels sem copyright]
- Texto na tela: [fonte / posicao / timing]
- Efeitos: [zoom, cut to beat, transicao especifica]
- Thumbnail: [frame especifico ou frame customizado]
```

### ETAPA 7 — Output Final

```markdown
## Reel: [TEMA]
**Formato:** [formato] | **Duracao:** [Xs] | **Objetivo:** [objetivo]

---
### HOOKS (escolha um para testar)
A: [hook A]
B: [hook B]
C: [hook C]

---
### ROTEIRO COMPLETO

**CENA 1 [0-Xs]**
Visual: [...]
Fala: "[...]"
Texto: "[...]"

[...demais cenas...]

---
### NOTAS DE FILMAGEM
[secao de filmagem]

### NOTAS DE EDICAO
[secao de edicao]

---
### CAPTION
[caption otimizado com hashtags]

### CHECKLIST PRE-PUBLICACAO
- [ ] Hook testado com alguem do publico
- [ ] Primeiros 3 segundos sem logo ou intro
- [ ] Texto na tela legivel em tela pequena
- [ ] Audio sem ruido de fundo
- [ ] Thumbnail customizado (nao o primeiro frame)
- [ ] Caption com hook nas primeiras 125 chars
- [ ] Hashtags verificadas
- [ ] Horario agendado: [Ter-Qui 19h-21h]
```

## Notas
- Os primeiros 3 segundos decidem tudo — nao comece com logo ou intro
- Audio ON e audio OFF: o roteiro deve funcionar mesmo sem som (textos na tela)
- Reels sem musica funcionam bem para tutoriais e opiniao
- Para trends: adapte o audio viral ao tema da sua marca, nao force
