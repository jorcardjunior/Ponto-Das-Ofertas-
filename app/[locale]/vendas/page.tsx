'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { AppShell } from '@/components/AppShell';
import { SalesChart } from '@/components/SalesChart';
import { useSales } from '@/lib/hooks/useSales';
import { useLowStockAlerts } from '@/lib/hooks/useLowStockAlerts';
import { MarketplaceBadge } from '@/components/MarketplaceBadge';
import { ShoppingCart } from 'lucide-react';

export default function VendasPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { recentSales, stats, loading } = useSales();
  const { count: alertCount } = useLowStockAlerts();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
          <p className="text-sm text-muted-foreground">Carregando…</p>
        </div>
      </main>
    );
  }

  return (
    <AppShell alertCount={alertCount}>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Vendas</h1>
          <p className="text-sm text-muted-foreground">Acompanhe suas vendas e desempenho.</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl border border-border/50 bg-card p-5 shadow-sm">
              <p className="text-sm text-muted-foreground">Total de Vendas</p>
              <p className="text-2xl font-bold text-foreground mt-1">{stats.totalSales}</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-5 shadow-sm">
              <p className="text-sm text-muted-foreground">Receita Total</p>
              <p className="text-2xl font-bold text-foreground mt-1">
                R$ {stats.totalRevenue?.toFixed(2) ?? '0.00'}
              </p>
            </div>
          </div>
        )}

        {/* Chart */}
        <SalesChart stats={stats} />

        {/* Recent Sales */}
        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
          <h2 className="text-base font-semibold text-foreground mb-4">Vendas Recentes</h2>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
            </div>
          ) : recentSales.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-8 text-muted-foreground">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                <ShoppingCart className="h-6 w-6 opacity-40" />
              </div>
              <p className="text-sm font-medium text-foreground">Nenhuma venda registrada</p>
              <p className="text-xs text-muted-foreground">
                Registre vendas na página de Produtos.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {recentSales.map((sale) => (
                <div
                  key={sale.id}
                  className="flex items-center justify-between rounded-lg border border-border/30 bg-background px-4 py-3 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">
                        {sale.product?.name ?? 'Produto'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {sale.quantity}x R$ {sale.price?.toFixed(2) ?? '0.00'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MarketplaceBadge marketplace={sale.channel} />
                    <span className="text-xs text-muted-foreground">
                      {new Date(sale.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
