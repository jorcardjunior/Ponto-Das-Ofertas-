# Content Squad

Squad especializado em producao de conteudo visual e escrito para redes sociais.
Orquestra carrosseis, reels, posts e campanhas completas com qualidade de agencia.

---

## Agentes

| Agente | Funcao | Quando Usar |
|--------|--------|-------------|
| **content-chief** | Orquestrador — coordena todos os outros | Ponto de entrada para qualquer producao de conteudo |
| **carousel-creator** | Arquiteto de carrosseis | Estrutura slide a slide, arco narrativo, tensao entre slides |
| **image-director** | Direcao visual e prompts de imagem | Prompts DALL-E, instrucoes Canva, consistencia visual |
| **social-publisher** | Distribuicao e publicacao | Captions, hashtags, horarios, adaptacao por plataforma |

---

## Como Usar

### Criar um carrossel
```
@content-chief *carrossel
```
O content-chief vai perguntar tema, formato, plataforma e CTA — um por vez.

### Criar um script de reel
```
@content-chief *reel
```

### Criar uma campanha completa
```
@content-chief *campanha
```

### Configurar integracoes (OpenAI, Canva, Anthropic)
```
@content-chief *configurar
```

### Diagnosticar o squad
```
@content-chief *diagnostico
```

### Revisar um conteudo
```
@content-chief *revisar
[cole o conteudo para revisao]
```

---

## Pipeline de Carrossel

```
Usuario → content-chief
              ↓
         story-chief (arco narrativo)    ← storytelling-squad
              ↓
         carousel-creator (estrutura)
              ↓
         copy-chief → especialista       ← copy-squad
              ↓
         image-director (prompts DALL-E / Canva)
              ↓
         social-publisher (caption + hashtags)
              ↓
         content-chief (entrega final ao usuario)
```

---

## Formatos de Carrossel Suportados

| Formato | Slides | Objetivo |
|---------|--------|----------|
| Educacional | 7-10 | Autoridade, awareness |
| Vendas | 8-12 | Conversao, oferta |
| Storytelling | 6-9 | Conexao emocional |
| Lista | 6-11 | Saves, compartilhamentos |
| Opiniao/Polemico | 5-8 | Alcance organico |

---

## Plataformas Suportadas

- **Instagram** — Carrossel (1:1 ou 4:5), Reels (9:16)
- **LinkedIn** — Carrossel PDF, posts longos
- **Twitter/X** — Threads
- **YouTube Shorts** — Scripts para 60s

---

## Ferramentas de Imagem

| Ferramenta | Tipo | Melhor Para |
|-----------|------|-------------|
| DALL-E 3 | API (paga) | Realismo, faces, cenas cotidianas |
| Flux | API (paga/gratuito) | Velocidade, variações |
| Canva | MCP (gratuito/pro) | Templates, brand kit, consistencia facil |
| Midjourney | Discord | Arte conceitual, estetica unica |

Para configurar: `@content-chief *configurar`

---

## Dependencias Cross-Squad

O content-squad delega para outros squads quando disponiveis:

- **storytelling-squad** → arco narrativo e hook
- **copy-squad** → copy especializado por formato
- **brand-squad** → identidade visual e paleta
- **hormozi-squad** → validacao de oferta (carrosseis de vendas)

Se algum squad nao estiver presente, o content-chief assume a funcao com recursos internos.

---

## Arquivos de Configuracao

- `config/config.yaml` — configuracoes do squad (plataformas, limites, roteamento)
- `data/routing-catalog.yaml` — catalogo de roteamento por palavra-chave
- `checklists/output-quality.md` — checklist de qualidade para todos os outputs

---

*Content Squad — Parte do Promptfy Squads | Built on Synkra AIOS*
