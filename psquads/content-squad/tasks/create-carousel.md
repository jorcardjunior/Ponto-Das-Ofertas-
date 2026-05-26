# Task: Create Carousel

## Metadata
```yaml
id: create-carousel
title: "Pipeline Completo de Carrossel"
agent: content-chief
elicit: true
inputs:
  - topic: "Tema ou ideia do carrossel"
  - format: "Formato (educacional, vendas, storytelling, lista, polêmico)"
  - platform: "Plataforma alvo (Instagram, LinkedIn)"
  - cta_goal: "Objetivo do CTA (seguir, salvar, comentar, comprar, clicar)"
outputs:
  - slides_structure: "Estrutura completa slide por slide"
  - copy_per_slide: "Copy finalizado de cada slide"
  - image_prompts: "Prompts DALL-E por slide"
  - canva_instructions: "Instrucoes para montar no Canva"
  - caption: "Caption otimizado com hashtags"
  - checklist: "Checklist pre-publicacao"
```

## Pipeline

### ETAPA 1 — Contexto da Marca
```
Ler: brand-context/BRAND_CONTEXT.md
Extrair:
  - nome_marca
  - publico_alvo + dores principais
  - tom_de_voz
  - produto/servico principal
  - palavras_chave obrigatorias
  - palavras proibidas
```

Se BRAND_CONTEXT.md estiver vazio ou incompleto, perguntar ao usuario:
1. "Qual o nome da sua marca?"
2. "Para quem e esse carrossel? Quem e seu cliente ideal?"
3. "Qual o objetivo desse carrossel: educar, vender, engajar?"

### ETAPA 2 — Elicitacao do Tema (elicit: true)

Perguntar ao usuario (um por vez, aguardar resposta):

1. **Tema:** "Sobre o que e esse carrossel? Descreva em 1-2 frases."
2. **Formato:** "Qual o objetivo principal?
   - [1] Educar / Gerar autoridade
   - [2] Vender / Apresentar oferta
   - [3] Contar uma historia / Conectar emocionalmente
   - [4] Lista de dicas / Recursos
   - [5] Opiniao polêmica / Posicionamento"
3. **Plataforma:** "Onde vai publicar? (Instagram / LinkedIn / Ambos)"
4. **CTA:** "O que voce quer que a pessoa faca ao final?
   - [1] Salvar o post
   - [2] Comentar algo
   - [3] Me seguir
   - [4] Clicar no link da bio
   - [5] Comprar / Se inscrever"

### ETAPA 3 — Delegacao ao Story-Chief

Enviar para @story-chief:
```
Tema: [tema]
Publico: [publico_alvo do BRAND_CONTEXT]
Formato: [formato escolhido]
Solicitar: hook principal + arco narrativo (lista de beats por slide)
```

### ETAPA 4 — Estruturacao pelo Carousel-Creator

Carousel-creator recebe:
- Hook do story-chief
- Arco narrativo
- Formato escolhido
- Numero ideal de slides (baseado no formato)

Entrega:
- Estrutura slide por slide (titulo + funcao de cada slide + tensao para o proximo)
- 3 opcoes de hook para o slide 1

### ETAPA 5 — Copy pelos Agentes do Copy-Squad

Content-chief envia para @copy-chief:
```
Estrutura: [estrutura do carousel-creator]
Tom de voz: [do BRAND_CONTEXT]
Palavras obrigatorias: [do BRAND_CONTEXT]
Solicitar: copy completo de cada slide (maximo 40 palavras por slide)
```

Copy-chief roteia para o especialista mais adequado ao formato:
- Vendas → @gary-halbert ou @dan-kennedy
- Educativo → @david-ogilvy
- Storytelling → @andre-chaperon
- Hooks → @john-caples

### ETAPA 6 — Direcao Visual pelo Image-Director

Image-director recebe:
- Copy de cada slide
- Tom de voz da marca
- Paleta de cores (se disponivel no BRAND_CONTEXT)

Entrega por slide:
- Prompt DALL-E (pronto para colar)
- Alternativa Canva: template sugerido + instrucoes de customizacao

### ETAPA 7 — Caption e Publicacao pelo Social-Publisher

Social-publisher recebe:
- Tema e objetivo do carrossel
- Plataforma alvo
- CTA escolhido

Entrega:
- Caption otimizado (com hook nas primeiras 125 chars para Instagram)
- Set de hashtags (grande + medio + nicho)
- Horario recomendado de publicacao

### ETAPA 8 — Output Final

Entregar ao usuario em formato organizado:

```markdown
## Carrossel: [TEMA]
**Formato:** [formato] | **Plataforma:** [plataforma] | **Slides:** [n]

---
### ESTRUTURA DOS SLIDES

**Slide 1 — HOOK**
Opcao A: [hook 1]
Opcao B: [hook 2]
Opcao C: [hook 3]
Prompt de imagem: [prompt DALL-E]

**Slide 2 — [FUNCAO]**
Titulo: [titulo]
Corpo: [copy]
Prompt de imagem: [prompt DALL-E]

[...demais slides...]

**Slide N — CTA**
Titulo: [cta]
Corpo: [copy]
Prompt de imagem: [prompt DALL-E]

---
### CAPTION INSTAGRAM
[caption completo com hashtags]

### CAPTION LINKEDIN (se aplicavel)
[caption adaptado]

---
### CHECKLIST PRE-PUBLICACAO
- [ ] Revisar ortografia de todos os slides
- [ ] Verificar se o hook para o scroll (teste com alguem)
- [ ] Confirmar que o CTA e especifico e claro
- [ ] Imagens em alta resolucao (minimo 1080px)
- [ ] Caption revisado (primeiras 125 chars sao o hook)
- [ ] Hashtags verificadas (nenhuma banida)
- [ ] Horario agendado: [horario recomendado]
```

## Notas
- Maximo 40 palavras por slide (ideal: 15-25)
- Slide 1 e o mais importante — se nao parar o scroll, o resto nao importa
- Sempre testar o hook com alguem do publico-alvo antes de publicar
