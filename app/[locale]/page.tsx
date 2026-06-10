import { Package, LayoutDashboard, Bell, ShieldCheck } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/50 via-primary/100 to-primary/50">
      <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12 lg:px-8">
        <div className="w-full max-w-2xl space-y-12 text-center">
          <div className="space-y-6 text-2xl font-bold text-white">
            <h1 className="mb-4">Controle de Estoque</h1>
            <p className="max-w-xl text-lg text-white/90">
              Sistema inteligente para gerenciar estoque e vendas em Shopee, Mercado Livre e Amazon
            </p>
          </div>
          
          <div className="space-y-8">
            {/* Features */}
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-6 text-white/90">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/20">
                  <Package className="h-7 w-7" />
                </div>
                <h3 className="font-semibold">Cadastro Completo de Produtos</h3>
                <p className="text-sm">
                  Gerencie seu catálogo com SKUs, categorias, fornecedores e controle de estoque em tempo real
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-6 text-white/90">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/20">
                  <LayoutDashboard className="h-7 w-7" />
                </div>
                <h3 className="font-semibold">Dashboard Inteligente</h3>
                <p className="text-sm">
                  Visualize métricas importantes, estoque baixo e performance de vendas com gráficos interativos
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-6 text-white/90">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/20">
                  <Bell className="h-7 w-7" />
                </div>
                <h3 className="font-semibold">Alertas de Estoque Baixo</h3>
                <p className="text-sm">
                  Receba notificações automáticas quando produtos atingirem níveis críticos de estoque
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-6 text-white/90">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/20">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <h3 className="font-semibold">Controle de Acesso Seguro</h3>
                <p className="text-sm">
                  Autenticação com email e senha, sessões seguras e controle de permissões por usuário
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
              <a 
                href="/pt/login" 
                className="w-full px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg transition-colors backdrop-blur-sm border border-white/10"
              >
                Começar Grátis
              </a>
              <p className="text-xs text-white/60">
                Já tem uma conta? <a href="/pt/login" className="underline">Faça login</a>
              </p>
          </div>
        </div>
      </div>
    </main>
  );
}