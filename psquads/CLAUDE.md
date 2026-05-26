# CLAUDE.md — Promptfy Squads Setup

Este arquivo instrui o Claude Code a configurar o Promptfy Squads automaticamente na maquina do usuario.

---

## Setup Automatico

Quando o usuario pedir para instalar, configurar ou iniciar o Promptfy Squads:

### Passo 1 — Verificar pre-requisitos

Checar se Node.js >= 18 esta instalado:
```bash
node --version
```
Se nao estiver, instruir o usuario a instalar em https://nodejs.org

### Passo 2 — Instalar dependencias

```bash
npm install
```

Isso instala o `@aiox-squads/core` (framework AIOS) automaticamente via npm.

### Passo 3 — Inicializar o AIOS Core

```bash
npx aios-core install
```

Isso cria a pasta `.aiox-core/` e o `core-config.yaml` no projeto.

### Passo 4 — Copiar squads para dentro do projeto

```bash
npx aios-core squads add ./
```

Ou manualmente instruir o usuario a copiar as pastas dos squads para `squads/` no projeto.

### Passo 5 — Configurar o Brand Context (Segundo Cerebro)

Perguntar ao usuario (um campo por vez, aguardar resposta antes de continuar):

1. "Qual o nome da sua marca?"
2. "Qual a missao da marca? (em 1-2 frases)"
3. "Quem e o publico-alvo principal?"
4. "Quais as 3 principais dores do seu publico?"
5. "Qual o produto ou servico principal?"
6. "Como voce descreveria o tom de voz da marca? (ex: direto, sofisticado, acolhedor)"

Com as respostas, preencher automaticamente o arquivo `brand-context/BRAND_CONTEXT.md` nas secoes correspondentes.

### Passo 6 — Ativar o domain no core-config.yaml

Adicionar em `core-config.yaml`:

```yaml
synapse:
  domains:
    brand-context:
      enabled: true
      path: squads/brand-context/
```

### Passo 7 — Validar instalacao

```bash
npx aios-core doctor
```

Reportar ao usuario o resultado. Se tudo OK, mostrar mensagem de boas-vindas.

---

## Mensagem de Boas-Vindas (apos setup completo)

Exibir ao usuario:

```
Promptfy Squads instalado com sucesso!

Seus 12 squads estao prontos:
  @brand-chief    — Estrategia de marca
  @copy-chief     — Copywriting de alto nivel
  @hormozi-chief  — Negocios e escala
  @traffic-chief  — Trafego pago
  ... (e mais 8 squads)

Todos os agentes ja conhecem sua marca via Brand Context.

Para comecar, digite o nome de qualquer agente.
Exemplo: @brand-chief
```

---

## Comandos Uteis

| O que o usuario pode pedir | O que fazer |
|---|---|
| "instala tudo" | Executar Passos 1-7 |
| "configura minha marca" | Executar apenas Passo 5-6 |
| "lista os agentes" | Mostrar tabela de squads do README |
| "como uso o @brand-chief?" | Ler brand-squad/README.md e explicar |
| "atualiza o core" | `npm update @aiox-squads/core` |
| "diagnostico" | `npx aios-core doctor` |

---

## Notas para o Claude

- Sempre perguntar um campo por vez ao coletar informacoes da marca
- Nao inventar informacoes — se usuario nao souber, deixar campo em branco
- Manter tom amigavel e objetivo durante o setup
- Se algum comando falhar, diagnosticar antes de continuar
- O `BRAND_CONTEXT.md` pode ser editado depois — nao e necessario completar tudo no setup inicial

---

*Promptfy Squads — Built on Synkra AIOS*
