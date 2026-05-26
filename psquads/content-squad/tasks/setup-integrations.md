# Task: Setup Integrations

## Metadata
```yaml
id: setup-integrations
title: "Wizard de Configuracao de Integracoes"
agent: content-chief
elicit: true
inputs:
  - tools: "Quais ferramentas o usuario quer configurar"
outputs:
  - env_config: "Variaveis de ambiente configuradas"
  - mcp_config: "Servidores MCP habilitados"
  - validation: "Confirmacao de que cada integracao funciona"
```

## Pipeline

### INTRODUCAO

```
Bem-vindo ao wizard de configuracao!
Vou te ajudar a conectar as ferramentas que os agentes vao usar para gerar imagens e publicar conteudo.

Quais ferramentas voce quer configurar?
[1] OpenAI (DALL-E para geracao de imagens)
[2] Canva (criacao e edicao visual)
[3] Anthropic / Claude API (para agentes autonomos)
[4] Todas acima
[5] Apenas me explique quais existem
```

### MODULO 1 — OpenAI API (DALL-E)

**Quando o usuario escolher [1] ou [4]:**

```
CONFIGURANDO: OpenAI / DALL-E
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DALL-E e o gerador de imagens da OpenAI.
Os agentes usam ele para criar as imagens dos seus carrosseis.

PASSO 1 — Obter a chave API:
1. Acesse: platform.openai.com
2. Faca login ou crie uma conta
3. Va em: API Keys (menu lateral esquerdo)
4. Clique em "Create new secret key"
5. Copie a chave (comeca com "sk-...")

PASSO 2 — Informar a chave:
Cole sua chave OpenAI aqui:
```

Apos o usuario colar a chave:
- Salvar em `.env` do projeto: `OPENAI_API_KEY=sk-...`
- Testar com uma chamada simples
- Confirmar: "✅ OpenAI conectado! DALL-E disponivel para os agentes."

**Se o usuario nao tiver conta:**
```
Sem problema. O DALL-E e pago por uso (muito barato: ~$0.04 por imagem).

Alternativas GRATUITAS que os agentes tambem suportam:
- Flux (via Replicate.com — tem plano gratuito)
- Stable Diffusion (local, gratis, precisa de GPU)
- Canva AI (incluso no Canva Pro)

Quer configurar uma alternativa gratuita?
```

### MODULO 2 — Canva MCP

**Quando o usuario escolher [2] ou [4]:**

```
CONFIGURANDO: Canva
━━━━━━━━━━━━━━━━━━━

O Canva tem um servidor MCP oficial que permite aos agentes
criar e editar designs diretamente na sua conta.

PASSO 1 — Verificar conta Canva:
Voce tem uma conta Canva? (gratuita ou Pro)
[1] Sim, tenho conta
[2] Nao tenho conta ainda
```

**Se tem conta:**
```
PASSO 2 — Conectar o MCP do Canva:

O servidor MCP do Canva usa OAuth (login com sua conta).
Para ativar:

1. No Claude Code, abra as configuracoes de MCP
2. Adicione o servidor:
   - Nome: canva
   - URL: https://mcp.canva.com/mcp
   - Tipo: HTTP

Ou execute este comando:
claude mcp add canva --transport http https://mcp.canva.com/mcp

3. Na proxima vez que um agente usar o Canva,
   ele vai pedir para voce fazer login — faca uma vez
   e a sessao fica salva.

Quer que eu adicione o servidor MCP agora?
```

**Se nao tem conta:**
```
Sem problema. Crie uma conta gratuita em canva.com.
O plano gratuito ja permite usar o MCP e criar designs.
O Canva Pro (pago) da acesso ao Brand Kit e mais templates.

Apos criar a conta, volte aqui e retome o PASSO 2.
```

### MODULO 3 — Anthropic API (Claude)

**Quando o usuario escolher [3] ou [4]:**

```
CONFIGURANDO: Anthropic / Claude API
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A API do Claude permite rodar agentes de forma autonoma
(sem precisar do Claude Code aberto).

PASSO 1 — Obter a chave API:
1. Acesse: console.anthropic.com
2. Faca login ou crie uma conta
3. Va em: API Keys
4. Clique em "Create Key"
5. Copie a chave (comeca com "sk-ant-...")

PASSO 2 — Informar a chave:
Cole sua chave Anthropic aqui:
```

Apos receber a chave:
- Salvar em `.env`: `ANTHROPIC_API_KEY=sk-ant-...`
- Confirmar: "✅ Claude API conectada!"

### MODULO 4 — Verificacao Final

Apos configurar todas as ferramentas escolhidas:

```
VERIFICACAO DE INTEGRACOES
━━━━━━━━━━━━━━━━━━━━━━━━━━

Testando conexoes...

[status OpenAI]   ✅ OpenAI/DALL-E conectado
[status Canva]    ✅ Canva MCP ativo
[status Claude]   ✅ Anthropic API conectada

Tudo pronto! Seus agentes agora podem:
- Gerar imagens com DALL-E
- Criar e editar designs no Canva
- Rodar pipelines autonomos via Claude API

Para criar seu primeiro carrossel, diga:
"@content-chief *carrossel"
```

### ARQUIVO .env GERADO

Criar/atualizar `.env` no projeto:
```
# Promptfy Squads — Integrations Config
# Gerado automaticamente pelo setup-integrations

OPENAI_API_KEY=
ANTHROPIC_API_KEY=
CANVA_MCP_URL=https://mcp.canva.com/mcp

# Opcional
REPLICATE_API_KEY=
```

Adicionar `.env` ao `.gitignore` se ainda nao estiver.

## Notas
- Nunca commitar chaves API no git
- Rotacionar chaves a cada 90 dias e boa pratica
- O `.env` e carregado automaticamente pelo AIOS Core
