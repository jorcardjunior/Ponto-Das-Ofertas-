---
name: index
description: Mapa-mestre do brand-brain. Aponta para áreas, projetos ativos e recursos.
type: index
updated: 2026-05-26
---

# INDEX — Mapa-mestre do brand-brain

> Este é o ponto de entrada. Toda LLM começa por aqui antes de explorar o cérebro.

## 📐 Regras

- [[schema]] — contrato de organização (PARA + Karpathy, naming, frontmatter, wikilinks)
- [[changelog]] — histórico de mutações

## 📁 Áreas Contínuas da Marca (`02-areas/`)

Identidade viva. Atualizada continuamente.

- [[marca]] — identidade, posicionamento, voz, arquétipo
- [[ofertas]] — produtos, preços, garantias, bônus atuais
- [[audiencia]] — ICP, personas, dores, desejos
- [[conteudo]] — pilares de conteúdo, canais, calendário
- [[trafego]] — estratégia de aquisição, fontes, CAC
- [[financeiro]] — receita, custos, métricas-chave

## 🚀 Projetos Ativos (`01-projects/`)

Trabalho em andamento. Cada projeto = uma subpasta.

> Nenhum projeto ativo ainda. Quando o lead começar um, Gaios cria `01-projects/YYYY-MM-{nome}/`.

## 📚 Recursos Reutilizáveis (`03-resources/`)

Bancos e templates que servem para múltiplos projetos.

- [[headlines-banco]] — headlines testadas + performance
- [[bullets-banco]] — bullets de copy reutilizáveis
- [[objecoes-respostas]] — objeções comuns + respostas
- [[garantias-prontas]] — garantias testadas
- [[design-tokens]] — cores, tipografia, espaçamentos da marca
- `icp/` — ICPs detalhados
- `personas/` — personas individuais

## 🗄️ Arquivo (`04-archive/`)

Projetos concluídos por trimestre. Vazio até o primeiro projeto ser finalizado.

## 📥 Ingest Bruto (`_raw/`)

Material ainda não processado. Gaios consome daqui via operação INGEST.

- [[notas-soltas]] — notas avulsas do lead
- `inspiracoes/` — material externo capturado
- `insights/` — sacadas pontuais
- `transcripts/` — transcrições de áudios/vídeos

## 🧭 Operações do Cérebro

Ver [[schema]] para detalhes:

1. **INGEST** — processar conteúdo de `_raw/` para áreas e resources
2. **QUERY** — responder perguntas consultando o cérebro
3. **LINT** — detectar e resolver contradições

## 🔍 Como o Gaios Usa Este Cérebro

- **Antes de perguntar** ao usuário → consulta [[marca]], [[ofertas]], [[audiencia]] e relacionados.
- **Durante o fluxo** → escreve em `01-projects/{projeto-atual}/`.
- **Ao final** → promove o que virou padrão para `02-areas/` e `03-resources/`.
- **Sempre** → mantém [[index]] e [[changelog]] atualizados.
