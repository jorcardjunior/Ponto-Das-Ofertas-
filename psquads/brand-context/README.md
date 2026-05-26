# Brand Context — Segundo Cerebro da Marca

Este diretorio contem o **contexto global da marca** que e injetado automaticamente em todos os agentes do Promptfy Squads via SYNAPSE (motor de contexto do Synkra AIOS).

---

## O Que Esta Aqui

| Arquivo | Funcao |
|---------|--------|
| `BRAND_CONTEXT.md` | Onde voce descreve sua marca (preencher antes de usar os squads) |
| `domain.yaml` | Manifesto SYNAPSE que registra o contexto como domain global |
| `README.md` | Este arquivo |

---

## Como Funciona

```
+---------------------------+
|   BRAND_CONTEXT.md        |  <-- voce preenche
+---------------------------+
              |
              v
+---------------------------+
|   SYNAPSE Engine (L3)     |  <-- domain auto-carregado
+---------------------------+
              |
              v
+---------------------------+
|   Qualquer agente         |  <-- recebe contexto injetado
|   (@brand-chief,          |
|    @copy-chief,           |
|    @hormozi-chief, etc)   |
+---------------------------+
```

Cada vez que um agente e ativado (`@agent-name` ou `/squad:agents:agent-name`), o SYNAPSE le `BRAND_CONTEXT.md` e injeta no prompt do agente — antes mesmo de ele responder. Resultado: **todos os 149 agentes ja sabem quem e a marca, para quem trabalham e como se comunicar**.

---

## Como Ativar

### Passo 1 — Preencher o BRAND_CONTEXT.md

Abra `BRAND_CONTEXT.md` e preencha as 8 secoes:
1. Identidade da Marca
2. Publico-Alvo
3. Produto / Oferta Principal
4. Tom de Voz
5. Palavras-Chave
6. Contexto Competitivo
7. Restricoes e Diretrizes
8. Recursos e Referencias

Voce pode deixar campos em branco — eles serao ignorados ate serem preenchidos.

### Passo 2 — Ativar o domain no AIOS Core

```bash
npx aios-core domain enable brand-context
```

Ou manualmente, em `.aiox-core/core-config.yaml`:

```yaml
synapse:
  domains:
    brand-context:
      enabled: true
      path: squads/brand-context/
```

### Passo 3 — Validar

```bash
npx aios-core synapse status
```

Voce deve ver `brand-context` na lista de domains ativos.

---

## Atualizando o Contexto

Quando a marca evolui (novo posicionamento, novo produto, novo tom):

1. Edite `BRAND_CONTEXT.md`
2. Os agentes recebem o novo contexto na proxima ativacao
3. Nenhuma reconfiguracao necessaria

---

## O Que Isso NAO Faz

- ❌ Nao grava conversas automaticamente (use `MEMORY.md` dos agentes para isso)
- ❌ Nao aprende sozinho — voce e quem mantem o documento
- ❌ Nao substitui briefings em projetos especificos

---

## O Que Isso FAZ

- ✅ Garante coerencia de marca em todos os squads
- ✅ Elimina necessidade de repetir contexto a cada sessao
- ✅ Funciona com qualquer agente, sem modificacao individual
- ✅ Versao controlavel via git (toda mudanca de marca rastreavel)

---

## Compatibilidade

Este domain estende workflows existentes via `config.extends: extend` — nao quebra nem substitui nenhum squad. Se o `BRAND_CONTEXT.md` estiver vazio, os squads funcionam normalmente (apenas sem o contexto de marca injetado).

---

*Promptfy Squads — Brand Context Domain v1.0*
