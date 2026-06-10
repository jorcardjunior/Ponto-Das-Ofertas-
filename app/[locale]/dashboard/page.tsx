'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { AppShell } from '@/components/AppShell';
import { WelcomeBanner } from '@/components/WelcomeBanner';
import { ImportExportBar } from '@/components/ImportExportBar';
import { MetricCard } from '@/components/MetricCard';
import { ProductForm } from '@/components/ProductForm';
import { ProductTable } from '@/components/ProductTable';
import { CategoryManager } from '@/components/CategoryManager';
import { SupplierManager } from '@/components/SupplierManager';
import { RegisterSaleModal } from '@/components/RegisterSaleModal';
import { SalesChart } from '@/components/SalesChart';
import { StockMovementPanel } from '@/components/StockMovementPanel';
import { LowStockAlertPanel } from '@/components/LowStockAlertPanel';
import { useProducts } from '@/lib/hooks/useProducts';
import { useCategories } from '@/lib/hooks/useCategories';
import { useSales } from '@/lib/hooks/useSales';
import { useLowStockAlerts } from '@/lib/hooks/useLowStockAlerts';
import { useBiData } from '@/lib/hooks/useBiData';
import { AnimatedMetricCard } from '@/components/bi/AnimatedMetricCard';
import { AreaChart } from '@/components/bi/AreaChart';
import { ProjectionsChart } from '@/components/bi/ProjectionsChart';
import { SalesHeatmap } from '@/components/bi/SalesHeatmap';
import { useToast } from '@/components/Toast';
import type { Product } from '@/lib/types';
import { TrendingUp, DollarSign, ShoppingCart, Percent } from 'lucide-react';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const isMobile = useMediaQuery('(max-width: 767px)');

  // BI Data
  const { health, projections, stats, loading: biLoading } = useBiData();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
          <p className="text-sm text-muted-foreground">Carregando…</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
          <p className="text-sm text-muted-foreground">Redirecionando…</p>
        </div>
      </main>
    );
  }

  // Format monthly data for AreaChart
  const areaChartData = stats?.monthlySales?.map((m) => ({
    label: m.month.slice(5),
    value: m.revenue,
  })) ?? [];

  // Calculate KPIs
  const totalRevenue = stats?.totalRevenue ?? 0;
  const totalProfit = stats?.totalProfit ?? 0;
  const averageTicket = stats?.averageTicket ?? 0;
  const roi = stats?.roi ?? 0;
  const totalSales = stats?.totalSales ?? 0;

  return (
    <AppShell>
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <WelcomeBanner email={user?.email} />

        {/* BI Animated KPIs */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Business Intelligence</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <AnimatedMetricCard
              label="Receita Total"
              value={totalRevenue}
              prefix="R$ "
              decimals={2}
              description="Faturamento bruto total"
              variant="value"
              trend={totalRevenue > 0 ? { value: 100, label: 'do período', positive: true } : undefined}
            />
            <AnimatedMetricCard
              label="Lucro Líquido"
              value={totalProfit}
              prefix="R$ "
              decimals={2}
              description={totalRevenue > 0 ? `${((totalProfit / totalRevenue) * 100).toFixed(1)}% de margem` : 'Sem vendas ainda'}
              variant={totalProfit >= 0 ? 'success' : 'danger'}
              icon={totalProfit >= 0 ? <TrendingUp className="h-5 w-5" /> : undefined}
            />
            <AnimatedMetricCard
              label="ROI"
              value={roi}
              suffix="%"
              decimals={1}
              description="Retorno sobre investimento"
              variant={roi >= 0 ? 'success' : 'danger'}
            />
            <AnimatedMetricCard
              label="Ticket Médio"
              value={averageTicket}
              prefix="R$ "
              decimals={2}
              description={`${totalSales} venda${totalSales !== 1 ? 's' : ''}`}
              variant="info"
              icon={<ShoppingCart className="h-5 w-5" />}
            />
          </div>
        </div>

        {/* Health Summary Cards */}
        {health && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl border border-border/50 bg-card p-4 shadow-sm">
              <p className="text-xs text-muted-foreground">Total Produtos</p>
              <p className="text-xl font-bold text-foreground mt-1">{health.totalProducts}</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-red-50 dark:bg-red-950/20 p-4 shadow-sm">
              <p className="text-xs text-red-600 dark:text-red-400">Crítico</p>
              <p className="text-xl font-bold text-red-700 dark:text-red-300 mt-1">{health.criticalCount}</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-amber-50 dark:bg-amber-950/20 p-4 shadow-sm">
              <p className="text-xs text-amber-600 dark:text-amber-400">Regular</p>
              <p className="text-xl font-bold text-amber-700 dark:text-amber-300 mt-1">{health.regularCount}</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-emerald-50 dark:bg-emerald-950/20 p-4 shadow-sm">
              <p className="text-xs text-emerald-600 dark:text-emerald-400">Saudável</p>
              <p className="text-xl font-bold text-emerald-700 dark:text-emerald-300 mt-1">{health.healthyCount}</p>
            </div>
          </div>
        )}

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Area Chart */}
          <div className="rounded-xl border border-border/50 bg-card p-4 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-primary" />
              <h2 className="text-base font-semibold text-foreground">Vendas do Ano</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {stats ? `${stats.totalSales} vendas | R$ ${stats.totalRevenue.toFixed(2)} total` : 'Carregando…'}
            </p>
            {areaChartData.length > 0 ? (
              <AreaChart data={areaChartData} height={180} />
            ) : (
              <div className="flex items-center justify-center h-40 text-sm text-muted-foreground">
                Nenhuma venda registrada ainda.
              </div>
            )}
          </div>

          {/* Projections Chart */}
          <ProjectionsChart data={projections} loading={biLoading} />
        </div>

        {/* Heatmap */}
        <SalesHeatmap />

        {/* Quick Actions */}
        <div className="rounded-xl border border-border/50 bg-card p-4 sm:p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-foreground mb-4">Atalhos Rápidos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <a
              href="/produtos"
              className="flex flex-col items-center gap-2 rounded-xl bg-muted/50 p-4 hover:bg-muted transition-colors"
            >
              <ShoppingCart className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium text-foreground">Produtos</span>
            </a>
            <a
              href="/vendas"
              className="flex flex-col items-center gap-2 rounded-xl bg-muted/50 p-4 hover:bg-muted transition-colors"
            >
              <DollarSign className="h-6 w-6 text-emerald-500" />
              <span className="text-sm font-medium text-foreground">Vendas</span>
            </a>
            <a
              href="/categorias"
              className="flex flex-col items-center gap-2 rounded-xl bg-muted/50 p-4 hover:bg-muted transition-colors"
            >
              <Percent className="h-6 w-6 text-violet-500" />
              <span className="text-sm font-medium text-foreground">Categorias</span>
            </a>
            <a
              href="/fornecedores"
              className="flex flex-col items-center gap-2 rounded-xl bg-muted/50 p-4 hover:bg-muted transition-colors"
            >
              <TrendingUp className="h-6 w-6 text-amber-500" />
              <span className="text-sm font-medium text-foreground">Fornecedores</span>
            </a>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
