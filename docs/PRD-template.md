# PRD — {Nome do Projeto}

> Documento de handoff do Gaios (estratégia) para o Hefaisto (engenharia).
> Cada seção é preenchida por um squad específico durante o fluxo conversacional.

**Status:** {rascunho | em revisão | aprovado}
**Data:** {YYYY-MM-DD}
**Idioma:** {PT-BR | EN | ES}

---

## 1. CONTEXTO DE NEGÓCIO
*Preenchido por: `psquads/hormozi-squad/`*

### 1.1 Cliente-alvo (ICP)
- **Perfil:**
- **Onde está:**
- **Dor central:**
- **O que ele já tentou:**

### 1.2 Oferta
- **Promessa única:**
- **Mecanismo (como funciona):**
- **Resultado esperado em quanto tempo:**

### 1.3 Estrutura Comercial
- **Preço principal:**
- **Modelo (mensal/anual/único):**
- **Garantia:**
- **Bônus / upsell / downsell:**

---

## 2. MARCA
*Preenchido por: `psquads/brand-squad/`*

### 2.1 Identidade Verbal
- **Nome:**
- **Significado / origem:**
- **Tagline:**

### 2.2 Posicionamento
- **Frase de posicionamento:**
- **Diferenciação (vs. concorrentes):**
- **Arquétipo dominante:**

### 2.3 Tom de Voz
- **Personalidade (3 adjetivos):**
- **O que falamos:**
- **O que NÃO falamos:**

---

## 3. DESIGN SYSTEM
*Preenchido por: `psquads/design-squad/`*

### 3.1 Paleta de Cores
- **Primária:** `#`
- **Secundária:** `#`
- **Neutros:** `#` / `#` / `#`
- **Sucesso / erro / aviso:** `#` / `#` / `#`

### 3.2 Tipografia
- **Display (títulos):**
- **Body (texto):**
- **Mono (código, opcional):**

### 3.3 Componentes UI Essenciais
- Botão primário / secundário / fantasma
- Inputs e formulários
- Cards
- Hero section
- Footer
- Modais

### 3.4 Referências Visuais
- **Inspirações (links):**
- **Estilo (moderno / clássico / brutalist / minimal):**

---

## 4. NARRATIVA
*Preenchido por: `psquads/storytelling/`*

### 4.1 Personagens da Jornada
- **Hero (o cliente):**
- **Vilão (o problema):**
- **Guia (a marca):**

### 4.2 Arco
- **Estado inicial (dor):**
- **Catalisador (chamado à ação):**
- **Transformação (resultado):**

### 4.3 Mensagem Central
- **Frase de impacto:**
- **Por que importa agora:**

---

## 5. COPY DA LANDING PAGE
*Preenchido por: `psquads/copy-master/`*

### 5.1 Hero
- **Headline (H1):**
- **Subheadline:**
- **CTA primário:**
- **Elemento de prova/urgência:**

### 5.2 Problema
- **Frase de abertura:**
- **3-5 dores específicas:**
  -
  -
  -

### 5.3 Solução
- **Frase de virada:**
- **Como a solução funciona (3 passos):**
  1.
  2.
  3.

### 5.4 Benefícios (Bullets)
-
-
-
-
-

### 5.5 Prova Social
- **Formato (depoimentos / cases / números):**
- **Conteúdo:**

### 5.6 Oferta Detalhada
- **O que está incluído:**
- **Preço (com âncora):**
- **Bônus:**

### 5.7 Garantia
- **Tipo:**
- **Duração:**
- **Texto:**

### 5.8 FAQ
- **Pergunta 1:** ...
- **Pergunta 2:** ...
- **Pergunta 3:** ...

### 5.9 CTA Final
- **Texto do botão:**
- **Reforço de urgência:**

---

## 6. REQUISITOS TÉCNICOS
*Preenchido por: Gaios em conversa com o usuário*

### 6.1 Tipo de Produto
- [ ] Landing Page (estática)
- [ ] SaaS (com login, dashboard, billing)
- [ ] E-commerce (com checkout, estoque)
- [ ] Infoproduto (com área de membros)
- [ ] API / Backend
- [ ] Full-stack (combina opções acima)

### 6.2 Stack Preferida
- **Frontend:** {Next.js / Nuxt / Astro / HTML / outro}
- **Backend:** {Node / Go / PHP+Laravel / outro}
- **Banco:** {Postgres / MongoDB / Supabase / outro}
- **Hospedagem:** {Vercel / Netlify / VPS próprio / outro}

### 6.3 Integrações Necessárias
- **CRM:** {HubSpot / Salesforce / RD Station / Pipedrive / nenhum}
- **Email Marketing:** {Mailchimp / SendGrid / ActiveCampaign / ConvertKit / nenhum}
- **Analytics:** {GA4 / Mixpanel / Amplitude / Hotjar / nenhum}
- **Pagamento:** {Stripe / PagSeguro / PayPal / Mercado Pago / nenhum}
- **Auth:** {Auth0 / Clerk / Supabase Auth / próprio / nenhum}
- **Outras:**

### 6.4 Domínio e Idioma
- **Domínio:**
- **Idioma principal:**
- **Multi-idioma?** {sim / não}

---

## 7. CRITÉRIOS DE ACEITAÇÃO
*Preenchido por: Gaios consolidando + Quinn (Hefaisto) validando*

### 7.1 Performance Mínima
- **LCP:** < 2.5s
- **CLS:** < 0.1
- **INP:** < 200ms

### 7.2 CRO (para landing pages)
- **Score CCD mínimo:** ≥ 80/100
- **Score MECLABS mínimo:** ≥ 70/100

### 7.3 Qualidade Técnica
- [ ] Lint passa
- [ ] Testes passam
- [ ] Type-check passa
- [ ] Sem vulnerabilidades críticas
- [ ] Responsivo mobile (testado)
- [ ] Acessibilidade básica (WCAG AA)

### 7.4 Funcionalidades Críticas (Must-Have)
-
-
-

### 7.5 Funcionalidades Desejáveis (Nice-to-Have)
-
-
-

### 7.6 Fora de Escopo (NÃO fazer)
-
-

---

## 8. METADADOS

- **Gerado por:** Gaios
- **Squads envolvidos:** {lista dos squads usados}
- **Tempo total estratégia:** {min}
- **Pronto para Hefaisto:** {sim / não}
- **Comando para iniciar build:** `/Hefaisto:init`
