'use client';

import { TrendingUp } from 'lucide-react';
import type { SaleStats } from '../lib/types';

type SalesChartProps = {
  stats: SaleStats | null;
};

export function SalesChart({ stats }: SalesChartProps) {
  if (!stats || stats.monthlySales.length === 0) {
    return (
      <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h2 className="text-base font-semibold text-foreground">Vendas do Ano</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Nenhuma venda registrada ainda.</p>
      </div>
    );
  }

  const maxRevenue = Math.max(...stats.monthlySales.map((m) => m.revenue), 1);
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  return (
    <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        <TrendingUp className="h-4 w-4 text-primary" />
        <h2 className="text-base font-semibold text-foreground">Vendas do Ano</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        {stats.totalSales} vendas | R$ {stats.totalRevenue?.toFixed(2) ?? '0.00'} total
      </p>

      <div className="flex items-end gap-1.5 h-32">
        {stats.monthlySales.map((m, i) => {
          const height = maxRevenue > 0 ? (m.revenue / maxRevenue) * 100 : 0;
          return (
            <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[10px] font-medium text-muted-foreground">
                {m.total > 0 ? m.total : ''}
              </span>
              <div
                className="w-full rounded-md bg-primary/80 hover:bg-primary transition-colors relative group cursor-pointer"
                style={{ height: `${Math.max(height, 2)}%` }}
                title={`${months[i]}: R$ ${(m.revenue ?? 0).toFixed(2)} (${m.total} unidades)`}
              />
              <span className="text-[10px] text-muted-foreground">{months[i]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
