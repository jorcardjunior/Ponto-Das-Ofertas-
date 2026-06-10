'use client';

import { useEffect, useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';

type HeatmapData = {
  heatmap: { hour: number; sales: number; revenue: number; orders: number; intensity: number }[];
  maxRevenue: number;
  maxSales: number;
};

type SalesHeatmapProps = {
  className?: string;
};

export function SalesHeatmap({ className }: SalesHeatmapProps) {
  const [data, setData] = useState<HeatmapData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/sales/heatmap')
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className={cn('rounded-xl border border-border/50 bg-card p-6 shadow-sm animate-pulse', className)}>
        <div className="h-4 w-36 bg-muted rounded mb-4" />
        <div className="grid grid-cols-6 gap-1.5">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="h-8 rounded bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  if (!data || data.heatmap.length === 0) {
    return (
      <div className={cn('rounded-xl border border-border/50 bg-card p-6 shadow-sm', className)}>
        <div className="flex items-center gap-2 mb-3">
          <CalendarDays className="h-4 w-4 text-violet-500" />
          <h3 className="text-sm font-semibold text-foreground">Densidade de Vendas</h3>
        </div>
        <p className="text-sm text-muted-foreground text-center py-6">
          Nenhum dado de venda disponível para gerar o mapa de calor.
        </p>
      </div>
    );
  }

  const totalOrders = data.heatmap.reduce((s, h) => s + h.orders, 0);
  const peakHour = [...data.heatmap].sort((a, b) => b.orders - a.orders)[0];

  return (
    <div className={cn('rounded-xl border border-border/50 bg-card p-6 shadow-sm', className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-violet-500" />
          <h3 className="text-sm font-semibold text-foreground">Densidade de Vendas</h3>
        </div>
        {peakHour && (
          <span className="text-xs text-muted-foreground">
            Pico às <strong className="text-foreground">{peakHour.hour}:00</strong> ({peakHour.orders} pedidos)
          </span>
        )}
      </div>

      <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
        {data.heatmap.map((h) => {
          const intensity = h.intensity;
          let bg = 'bg-muted/30';
          if (intensity > 0.75) bg = 'bg-violet-500 dark:bg-violet-400';
          else if (intensity > 0.5) bg = 'bg-violet-400 dark:bg-violet-500';
          else if (intensity > 0.25) bg = 'bg-violet-300 dark:bg-violet-600';
          else if (intensity > 0.1) bg = 'bg-violet-200 dark:bg-violet-700/50';

          return (
            <div
              key={h.hour}
              className={cn(
                'h-8 sm:h-10 rounded-md flex items-center justify-center text-[10px] font-medium transition-all duration-200 hover:scale-110 hover:shadow-md cursor-default',
                bg,
                h.orders > 0 ? 'text-white dark:text-white' : 'text-muted-foreground',
              )}
              title={`${h.hour}:00 — ${h.orders} pedidos, R$ ${h.revenue.toFixed(2)}`}
            >
              <span className="hidden sm:inline">{h.hour}h</span>
              <span className="sm:hidden">{h.hour}</span>
            </div>
          );
        })}
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30 text-xs text-muted-foreground">
        <span>{totalOrders} pedidos no total</span>
        <div className="flex items-center gap-2">
          <span>Menos</span>
          <div className="flex gap-0.5">
            <div className="h-3 w-3 rounded-sm bg-muted/30" />
            <div className="h-3 w-3 rounded-sm bg-violet-200 dark:bg-violet-700/50" />
            <div className="h-3 w-3 rounded-sm bg-violet-300 dark:bg-violet-600" />
            <div className="h-3 w-3 rounded-sm bg-violet-400 dark:bg-violet-500" />
            <div className="h-3 w-3 rounded-sm bg-violet-500 dark:bg-violet-400" />
          </div>
          <span>Mais</span>
        </div>
      </div>
    </div>
  );
}
