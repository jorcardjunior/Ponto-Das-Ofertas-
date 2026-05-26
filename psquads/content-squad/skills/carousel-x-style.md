# Skill: Carousel X-Style (Formato Tweet)

## Quando ativar

Somente quando o usuário pedir explicitamente:
- "formato X", "estilo tweet", "estilo Twitter", "formato X/Twitter"
- "carrossel com cara de tweet", "slides de post do X"

Se o usuário não mencionar esse formato, usar o pipeline padrão de carrossel.

---

## O que esta skill produz

- **Slide 1**: Capa fullbleed com imagem de IA + overlay de texto com hook forte
- **Slides 2-N**: Layout de tweet autêntico — profile header + corpo de texto
- **Output final**: PNGs 1080×1350px prontos para Instagram

---

## Elicitação de Referências (obrigatória antes de iniciar)

O carousel-creator deve perguntar ao usuário, um por vez:

1. **Display name**: "Qual o nome que aparece no perfil? (ex: Marlon Rebelo)"
2. **Handle**: "Qual o @ do perfil? (ex: @promptfy.pro)"
3. **Foto de perfil**: "Salve sua foto de perfil em `meu-workspace/assets/profile.jpg` — ela vai aparecer em todos os slides. Já salvou? (sim/não)"
4. **Paleta de cores**: "Qual a cor de destaque da sua marca? (hex, ex: #FF6B35) — ou deixo pegar do BRAND_CONTEXT?"
5. **Imagem de capa**: "Quer gerar a imagem do Slide 1 com DALL-E/GPT? Ou vai fornecer uma imagem própria?"

Se o BRAND_CONTEXT.md estiver preenchido, pular perguntas já respondidas lá.

---

## Pipeline de Execução

### ETAPA 0 — Pesquisador (condicional)
Se o tema precisar de dados recentes ou o usuário pedir pesquisa:
- Buscar na web informações das últimas 48h sobre o tema
- Montar dossiê com principais insights
- **Output:** `dossie.md`

Se o usuário forneceu o tema diretamente, confirmar e seguir.

---

### ETAPA 1 — Estrategista ⏸ CHECKPOINT
*(carousel-creator)*

Analisar o tema/dossiê. Classificar no eixo narrativo:
**Mercado / Case / Cultura / Notícia / Produto**

Propor **3 opções de hook** para o Slide 1 (capa).
Apresentar ao usuário e aguardar aprovação antes de continuar.

**Output:** `estrategia.md`

---

### ETAPA 2 — Redator ⏸ CHECKPOINT
*(copy-chief → especialista por formato)*

Com o hook aprovado, escrever o copy dos slides 2-N seguindo a Escada de Consciência:
> Contexto → Problema → Insight → Implicação → Virada → Aplicação → CTA

**Regras de copy:**
- Tom alinhado com BRAND_CONTEXT.md
- Frases curtas e impactantes — máx. 280 caracteres por slide
- Hook com menos de 15 palavras, não começa com "Como fazer"
- CTA claro no último slide

Escrever também a legenda com hashtags estratégicas.

**Output:** `slides-copy.md` + `legenda.md`

---

### ETAPA 3 — Designer ⏸ CHECKPOINT
*(image-director)*

#### [3a] Prompt da imagem de capa (Slide 1)

Classificar o hook no modo visual: **Cyber/3D | Photorealistic | Abstract**

Construir o prompt:
```
{SUBJECT}, {STYLE_DESCRIPTOR}, dramatic cinematic lighting, dark background,
deep blacks, {COLOR_ACCENT} glowing elements, ultra detailed, 8K resolution,
portrait 4:5 ratio, no text in image, clean for overlay
```

Especificações: 1080×1350px, PNG ou JPEG
Ferramenta: DALL-E (via OPENAI_API_KEY) ou Midjourney, Flux, Ideogram

**Output:** `cover-prompt.md`

#### [3b] HTML dos Slides 2-N

**Estrutura obrigatória:**
```
Dimensões: 1080×1350px
Fundo: #FFFFFF
Fonte: Inter (Google Fonts)
Layout: flex column — header + body (flex:1)
```

**Profile Header (topo):**
```css
.header {
  display: flex; align-items: center; gap: 14px;
  padding: 36px 48px 24px;
  border-bottom: 1px solid #EFF3F4;
  justify-content: center;
}
.avatar { width: 88px; height: 88px; border-radius: 50%; object-fit: cover; }
.display-name { font-size: 28px; font-weight: 700; color: #0F1419; }
.handle { font-size: 22px; font-weight: 400; color: #536471; }
```
- Display name: **[lido das referências elicitadas]**
- Handle: **[lido das referências elicitadas]**
- Verified badge: ✓ azul `#1D9BF0`
- Avatar: `assets/profile.jpg` convertido para base64

**Tweet Body (área central):**
```css
.body {
  flex: 1; padding: 48px 56px;
  font-size: 46px; font-weight: 400; color: #0F1419;
  line-height: 1.5;
  display: flex; flex-direction: column; justify-content: center;
}
.body p:first-child { font-size: 52px; font-weight: 700; }
```

**SEM engagement bar** — não gerar rodapé com likes, retweets ou contadores.

**Output:** `slides/slide-02.html`, `slide-03.html`, ...

> ⏸ **CHECKPOINT:** Aguardar o usuário gerar/salvar a imagem de capa em `assets/cover.jpg`

---

### ETAPA 4 — Montador do Slide 1
*(image-director)*

Ler `assets/cover.jpg` e converter para base64. Montar o HTML da capa:

```
- <img> base64, position:absolute, inset:0, object-fit:cover, object-position:center top
- Overlay: linear-gradient(to top, rgba(0,0,0,0.85) 35%, transparent 65%)
  ⚠️ NÃO escurecer o topo
- Category tag: fonte pequena, cor de destaque da marca, uppercase, letter-spacing
- Headline: Inter 900, 48px+, ALL CAPS, #FFFFFF
- Subtitle: 500, 16px, rgba(255,255,255,0.8)
- Progress bar: 3px bottom, largura = 1/N slides, gradiente com cor da marca
- Badge mini: avatar 32px + handle — canto inferior direito
```

**Output:** `slides/slide-01.html`

---

### ETAPA 5 — Revisor ⏸ CHECKPOINT
*(content-chief)*

Revisar copy + HTMLs. Aplicar checklist e entregar nota 0-10 por dimensão:

**Copy:** hook impactante, escada completa, 3 gatilhos emocionais, tom correto, CTA claro
**Design:** header consistente em todos os slides, fontes corretas, sem engagement bar, capa com overlay preservando o topo

**Output:** `revisao.md`

---

### ETAPA 6 — Renderização HTML → PNG
*(image-director via Playwright)*

```bash
# Instalar se necessário
npm install playwright

# Sobe servidor HTTP local
python -m http.server 8765 --directory "{output_path}"

# Renderiza cada slide
# viewport: 1080 x 1350
# salva em: output/images/slide-0N.png

# Para o servidor
pkill -f "http.server 8765"
```

**Output:** `images/slide-01.png` ... `images/slide-0N.png`

---

## Estrutura de Output

```
meu-workspace/output/{YYYY-MM-DD-HHMMSS}/v1/
├── dossie.md          ← pesquisa (se houver)
├── estrategia.md      ← hook aprovado + eixo narrativo
├── slides-copy.md     ← copy de cada slide
├── legenda.md         ← caption + hashtags
├── cover-prompt.md    ← prompt da imagem de capa
├── revisao.md         ← checklist de qualidade
├── assets/
│   ├── profile.jpg    ← foto de perfil (usuário fornece)
│   └── cover.jpg      ← imagem de capa (gerada ou fornecida)
├── slides/
│   ├── slide-01.html  ← capa fullbleed
│   └── slide-02.html  ← slides tweet-style
└── images/
    ├── slide-01.png   ← PNGs finais prontos para Instagram
    └── slide-02.png
```

---

## Notas

- O formato X só é ativado quando o usuário pede explicitamente
- Para outros formatos de carrossel, usar o pipeline padrão do `create-carousel.md`
- A `profile.jpg` fica em `meu-workspace/assets/` e é reutilizada em todos os runs
- As cores hardcoded (#FF6B35 etc.) são substituídas pela paleta do BRAND_CONTEXT.md
