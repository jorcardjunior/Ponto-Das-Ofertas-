# Promptfy OS

> **O Sistema Operacional do Empreendedor Digital.**
> Você descreve o negócio. O sistema entrega marca, copy, código e estratégia de tráfego.

```
   ____                            _    __
  / __ \_________  ____ ___  ____ | |  / /
 / /_/ / ___/ __ \/ __ `__ \/ __ \| | / /
/ ____/ /  / /_/ / / / / / / /_/ /| |/\_\
\_/   /_/   \____/_/ /_/ /_/ .___/ |___/    OS
                          /_/
```

---

## O Que É

Promptfy OS é a primeira plataforma que une **estratégia comercial** e **engenharia técnica** em um único fluxo conversacional dentro do Claude Code.

Você não precisa saber programar. Não precisa decorar comandos. Não precisa coordenar equipes.

Você fala em português comum: *"quero criar um SaaS de barbearia"* — e o sistema entrega o produto pronto.

---

## Como Funciona

O Promptfy OS opera em 3 camadas que trabalham como um time:

```
🌱 GAIOS       —  A mente. Conversa com você e orquestra tudo.
                  ↓
👥 PSQUADS     —  O conselho. 13 squads especializados em marca,
                  copy, ofertas, growth, design, storytelling.
                  ↓
🔥 HEFAISTO    —  As mãos. Constrói o código de forma autônoma,
                  testa, mede CRO e entrega via Pull Request.
```

---

## Em 3 Frases

1. Você diz: *"quero criar X"*
2. Gaios chama os squads certos, monta um PRD completo
3. Hefaisto constrói o produto autonomamente em ciclos PLAN → BUILD → CHECK → SHIP

---

## Quick Start

### 1. Instalar dependências

```bash
npm install
cp .env.example .env
npx prisma generate
npx prisma migrate dev --name init
npx playwright install chromium
```

### 2. Rodar em desenvolvimento

```bash
npm run dev
```

Aplicação disponível em `http://localhost:3001` (porta 3000 reservada para outra instância).

### 3. Comandos úteis

| Comando | O que faz |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Faz build de produção |
| `npm test` | Roda a suíte de testes unitários (Vitest) |
| `npm run test:coverage` | Roda testes com cobertura de código |
| `npx playwright test` | Roda os testes E2E (Playwright) |
| `npx playwright test --ui` | Abre o Playwright UI para debug visual |
| `npx playwright show-report` | Abre o relatório HTML dos testes E2E |
| `npm run typecheck` | Valida TypeScript |
| `npm run lint` | Roda ESLint |
| `npm run hefaisto:init` | Inicializa o ciclo Hefaisto (PLAN) |
| `npm run hefaisto:plan` | Lista o plano de execução |
| `npm run hefaisto:check` | Roda todas as checagens de qualidade |
| `npm run prisma:studio` | Abre o Prisma Studio (visualizar banco) |

---

## Para Quem É

| Você é... | O Promptfy OS te entrega... |
|---|---|
| **Empreendedor solo** | Um time inteiro de marketing + dev sem contratar ninguém |
| **Agência de marketing** | Velocidade absurda — landing page em ~15 min |
| **Infoprodutor** | Funil completo (copy + página + integrações) sem freela |
| **Dev freelancer** | Cliente fechado com estratégia pronta — você só revisa o PR |
| **Estudante de negócio** | Aprender fazendo — cada etapa explicada por especialistas IA |

---

## Stack Tecnológica

- **Frontend:** Next.js 16 + React 18 + Tailwind CSS
- **Backend:** Next.js API Routes (App Router)
- **Banco:** PostgreSQL (prod) / SQLite (dev) via Prisma
- **Auth:** Auth.js v5 (CredentialsProvider + JWT)
- **Testes Unitários:** Vitest + Testing Library + happy-dom
- **Testes E2E:** Playwright (Chromium) — 13 testes cobrindo fluxos críticos
- **State Management:** @tanstack/react-query
- **CI/CD:** GitHub Actions
- **TypeScript:** Strict mode habilitado

---

## Testes E2E com Playwright

O projeto utiliza **Playwright** para testes end-to-end que validam os fluxos críticos da aplicação no navegador.

### Estrutura

```
e2e/
├── helpers.ts              # Funções reutilizáveis (registerUser, loginUser, etc.)
├── auth.spec.ts            # 6 testes: login, registro, credenciais inválidas
├── products.spec.ts        # 3 testes: navegação para produtos, estrutura da tabela
└── sales.spec.ts           # 4 testes: navegação para vendas, fornecedores
```

### Configuração

O Playwright está configurado em `playwright.config.ts`:

- **Browser:** Chromium (Desktop Chrome)
- **Base URL:** `http://localhost:3001`
- **Web Server:** Auto-start com `npm run dev` (reutiliza servidor existente)
- **Timeout:** 60s por teste
- **Retries:** 2 em CI, 0 em desenvolvimento

### Rodando os testes

```bash
# Rodar todos os testes E2E
npx playwright test

# Rodar um arquivo específico
npx playwright test auth.spec.ts

# Rodar com modo UI (debug visual)
npx playwright test --ui

# Rodar com headed (ver o navegador)
npx playwright test --headed

# Rodar apenas um teste específico
npx playwright test -g "should register a new user"

# Ver relatório HTML após rodar
npx playwright show-report
```

### Criando novos testes

```typescript
import { test, expect } from '@playwright/test';
import { registerUser, loginUser, uniqueEmail } from './helpers';

test.describe('Meu Novo Fluxo', () => {
  const email = uniqueEmail('meufluxo');

  test('deve fazer algo específico', async ({ page }) => {
    // Registrar e logar
    await registerUser(page, { name: 'Teste', email, password: 'Test123456' });

    // Navegar e validar
    await page.goto('http://localhost:3001/pt/dashboard');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/dashboard/);
  });
});
```

### Helpers disponíveis

| Função | Descrição |
|--------|-----------|
| `uniqueEmail(prefix?)` | Gera email único para isolamento de testes |
| `registerUser(page, opts?)` | Registra usuário via UI e aguarda redirect |
| `loginUser(page, email, password?)` | Faz login via UI e aguarda redirect |
| `expectOnDashboard(page)` | Valida que está na página de dashboard |
| `expectOnLogin(page)` | Valida que está na página de login |

### Notas importantes

- **Isolamento:** Cada teste gera emails únicos via `uniqueEmail()` para evitar conflitos
- **Ordem:** Os testes rodam em sequência (`fullyParallel: false`) pois dependem de autenticação
- **Servidor:** O Playwright auto-inicia o dev server se não estiver rodando
- **Accessibility:** Animações respeitam `prefers-reduced-motion`

---

## Integrações Pré-Configuradas

- **CRM:** HubSpot, Salesforce, RD Station, Pipedrive
- **Email:** Mailchimp, SendGrid, ActiveCampaign, ConvertKit
- **Analytics:** GA4, Mixpanel, Amplitude, Hotjar
- **Pagamento:** Stripe, PagSeguro, PayPal, Mercado Pago
- **Auth:** Auth0, Clerk, Supabase Auth

---

## Arquitetura do Repositório

```
Promptfy-OS/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes (auth, products, sales, etc.)
│   ├── [locale]/                 # i18n routing (pt, es)
│   │   ├── (auth)/               # Login, registro
│   │   ├── (dashboard)/          # Dashboard principal
│   │   ├── produtos/             # Página de produtos
│   │   ├── categorias/           # Página de categorias
│   │   ├── fornecedores/         # Página de fornecedores
│   │   └── vendas/               # Página de vendas
│   ├── globals.css               # Estilos globais + animações
│   └── layout.tsx                # Layout raiz
├── components/                   # Componentes React
│   ├── ui/                       # Skeleton base (shadcn-style)
│   ├── Skeleton.tsx              # SkeletonCard, SkeletonTable, SkeletonChart
│   ├── AppShell.tsx              # Layout com sidebar + header
│   ├── ProductForm.tsx           # Formulário de produtos
│   ├── ProductTable.tsx          # Tabela de produtos com busca/filtros
│   ├── CategoryManager.tsx       # Gerenciamento de categorias
│   ├── SupplierManager.tsx       # Gerenciamento de fornecedores
│   ├── SalesChart.tsx            # Gráfico de vendas
│   └── RegisterSaleModal.tsx     # Modal de registro de venda
├── e2e/                          # Testes E2E (Playwright)
│   ├── helpers.ts                # Funções reutilizáveis
│   ├── auth.spec.ts              # Testes de autenticação
│   ├── products.spec.ts          # Testes de produtos
│   └── sales.spec.ts             # Testes de vendas
├── lib/                          # Utilitários TypeScript
│   ├── hooks/                    # Custom React hooks (8 hooks)
│   ├── __tests__/                # Testes unitários (Vitest)
│   ├── auth.ts                   # Auth.js config + password hashing
│   ├── db.ts                     # Prisma client
│   ├── types.ts                  # Domain types
│   └── categoryColors.ts         # Color utility
├── prisma/                       # Schema do banco
│   └── schema.prisma
├── hefaisto/                     # Motor técnico (CLI)
│   └── cli/
├── brand-brain/                  # Segundo cérebro da marca (Karpathy + PARA)
│   ├── 00-index/                 # INDEX, SCHEMA, CHANGELOG
│   ├── 02-areas/                 # marca, ofertas, audiência...
│   ├── 03-resources/             # headlines, bullets, objeções...
│   ├── 01-projects/              # projetos ativos
│   └── 04-archive/               # projetos concluídos
├── psquads/                      # 13 squads de estratégia/marca/copy
├── docs/                         # PRD, PRD-template, stories
├── types/                        # Type definitions (next-auth.d.ts)
├── auth.ts                       # Auth.js v5 config (raiz)
├── middleware.ts                  # Auth middleware + i18n (Next.js)
├── playwright.config.ts          # Configuração Playwright
├── .github/workflows/            # CI/CD
└── ... (config files)
```

---

## Filosofia

> **Autonomia sem burocracia. Velocidade sem perder qualidade.**

O Promptfy OS nasceu da fusão de duas vertentes:

1. **Promptfy Squads** — coleção de squads de IA com expertise comercial (copy, marca, ofertas, tráfego)
2. **Hefaisto** — motor técnico autônomo derivado do XOIA / AIOX

Cada uma sozinha resolvia metade do problema. Juntas, sob o comando do **Gaios**, viram um time completo.

---

## Licença

MIT — use, modifique, distribua.
