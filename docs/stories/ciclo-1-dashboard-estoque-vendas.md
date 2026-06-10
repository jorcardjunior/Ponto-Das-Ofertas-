# Ciclo 1 — Dashboard de Estoque e Vendas Multichannel

## Objetivo
Entregar a primeira versão funcional do painel centralizado para vendedores autônomos, com controle de estoque, catálogo de produtos e visão resumida de vendas para Shopee, Mercado Livre e Amazon.

## Descrição
Este ciclo foca na arquitetura inicial do produto e na entrega de um MVP funcional que permita:
- cadastrar produtos e categorias,
- visualizar o estoque atual,
- acompanhar vendas e pedidos em um dashboard simplificado,
- preparar a base para futuras integrações com marketplaces.

## Critérios de Aceitação
- [ ] Usuário consegue acessar uma interface inicial de dashboard.
- [ ] É possível cadastrar produtos com nome, SKU, categoria, preço e quantidade em estoque.
- [ ] O sistema mostra uma listagem de produtos com estoque disponível e status.
- [ ] Existe um painel de métricas básicas de vendas (por exemplo: total de vendas, pedidos abertos, produtos com estoque baixo).
- [ ] A estrutura do projeto está pronta para Next.js + Tailwind e backend Node.js com banco Postgres.

## Tasks
1. Definir a stack e estrutura de pastas do projeto.
2. Criar o esqueleto do frontend com Next.js e página inicial do dashboard.
3. Definir o modelo de dados de produto e categoria.
4. Implementar backend básico para CRUD de produtos.
5. Criar página de cadastro/edição de produtos.
6. Criar página de listagem de estoque e painel de métricas.
7. Validar o fluxo manual de cadastro e visualização.
8. Documentar o ciclo e preparar o próximo passo.

## Observações
- Ainda não é necessária a integração real com APIs de Shopee, Mercado Livre ou Amazon neste ciclo.
- O foco é entregar uma base sólida de gerenciamento de catálogo e estoque.
