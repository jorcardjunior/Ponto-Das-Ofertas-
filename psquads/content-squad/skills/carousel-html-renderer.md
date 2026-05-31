# Skill: Carousel HTML Renderer

## O que esta skill faz

Renderiza slides HTML em PNG 1080x1080 ou 1080x1350px via Playwright.
Usada pelo image-director em TODOS os formatos de carrossel.

---

## Templates disponíveis

| Template | Arquivo | Quando usar |
|----------|---------|-------------|
| Standard | `templates/slide-standard.html` | Carrossel padrao com identidade da marca |
| Cover | `templates/slide-cover.html` | Slide 1 (capa) com imagem de IA fullbleed |
| X-Style | `templates/slide-x-style.html` | Formato tweet — so quando usuario pedir |

---

## Variaveis por template

### Standard
Ler do BRAND_CONTEXT.md:
- `FONT_FAMILY` → fonte da marca (padrao: Inter)
- `BG_COLOR` → cor de fundo (padrao: #0A0A0A)
- `ACCENT_COLOR` → cor de destaque da marca
- `ACCENT_COLOR_DARK` → versao escura do accent
- `BRAND_NAME` → nome da marca

Do carousel-creator / copy-master-chief:
- `CATEGORY` → categoria do slide (ex: ESTRATEGIA)
- `TITLE` → titulo do slide
- `BODY_TEXT` → corpo do slide
- `SLIDE_NUMBER` → numero atual
- `TOTAL_SLIDES` → total de slides
- `PROGRESS_WIDTH` → porcentagem (SLIDE_NUMBER / TOTAL_SLIDES * 100%)

### Cover
- `COVER_IMAGE_B64` → imagem gerada por DALL-E convertida para base64
- `HOOK_TEXT` → hook aprovado pelo usuario
- `SUBTITLE` → subtitulo / contexto
- `BRAND_HANDLE` → @handle da marca
- `CATEGORY` → tag de categoria

---

## Pipeline de renderizacao

```bash
# 1. Instalar Playwright (se necessario)
npm install playwright
npx playwright install chromium

# 2. Gerar os HTMLs substituindo as variaveis
# (image-director gera um .html por slide)

# 3. Subir servidor HTTP local
python -m http.server 8765 --directory "{output_path}/slides"

# 4. Renderizar via Playwright
node render-slides.js \
  --input "{output_path}/slides" \
  --output "{output_path}/images" \
  --width 1080 \
  --height 1080

# 5. Parar o servidor
pkill -f "http.server 8765"
```

---

## Script de renderizacao (render-slides.js)

```javascript
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const inputDir = process.argv[3];
  const outputDir = process.argv[5];
  const width = parseInt(process.argv[7]) || 1080;
  const height = parseInt(process.argv[9]) || 1080;

  fs.mkdirSync(outputDir, { recursive: true });

  const slides = fs.readdirSync(inputDir)
    .filter(f => f.endsWith('.html'))
    .sort();

  const browser = await chromium.launch();

  for (const slide of slides) {
    const page = await browser.newPage();
    await page.setViewportSize({ width, height });
    await page.goto(`http://localhost:8765/${slide}`);
    await page.waitForTimeout(500); // aguarda fontes carregarem

    const name = slide.replace('.html', '.png');
    await page.screenshot({ path: path.join(outputDir, name) });
    await page.close();
    console.log(`✅ Renderizado: ${name}`);
  }

  await browser.close();
  console.log(`\n🎉 ${slides.length} slides renderizados em ${outputDir}`);
})();
```

---

## Estrutura de output

```
output/{YYYY-MM-DD-HHMMSS}/v1/
├── slides/
│   ├── slide-01.html    ← capa (cover template)
│   ├── slide-02.html    ← slides internos (standard ou x-style)
│   └── slide-0N.html
├── images/
│   ├── slide-01.png     ← PNGs prontos para Instagram
│   └── slide-0N.png
└── assets/
    ├── profile.jpg      ← foto de perfil (usuario fornece)
    └── cover.jpg        ← imagem de capa (gerada por DALL-E)
```

---

## Dimensoes por formato

| Formato | Dimensoes | Quando usar |
|---------|-----------|-------------|
| Feed quadrado | 1080x1080px | Instagram feed padrao |
| Portrait 4:5 | 1080x1350px | Maior alcance no feed |
| X-style | 1080x1350px | Formato tweet |

---

## Notas

- Fontes do Google Fonts requerem conexao com internet durante renderizacao
- Para uso offline: embutir a fonte como base64 no CSS do template
- O `render-slides.js` fica em `content-squad/skills/` e e reaproveitado em todos os runs
