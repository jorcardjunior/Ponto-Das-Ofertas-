'use client';

import { TrendingUp, TrendingDown, Minus, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';

type ProjectionData = {
  historical: { month: string; revenue: number; sales: number }[];
  forecast: { month: string; projectedRevenue: number; projectedSales: number }[];
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  growthRate: number;
};

type ProjectionsChartProps = {
  data: ProjectionData | null;
  loading?: boolean;
};

function formatCurrency(v: number) {
  return `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function ProjectionsChart({ data, loading }: ProjectionsChartProps) {
  if (loading) {
    return (
      <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm animate-pulse">
        <div className="h-4 w-40 bg-muted rounded mb-4" />
        <div className="h-48 bg-muted rounded" />
      </div>
    );
  }

  if (!data || data.historical.length < 2) {
    return (
      <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="h-4 w-4 text-violet-500" />
          <h3 className="text-sm font-semibold text-foreground">Projeções de IA</h3>
        </div>
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <Brain className="h-8 w-8 text-muted-foreground/30 mb-2" />
          <p className="text-sm text-muted-foreground">
            Dados insuficientes para projeções. Cadastre mais vendas para ativar as previsões inteligentes.
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Necessário pelo menos 2 meses de histórico.
          </p>
        </div>
      </div>
    );
  }

  const allValues = [
    ...data.historical.map((h) => h.revenue),
    ...data.forecast.map((f) => f.projectedRevenue),
  ];
  const maxVal = Math.max(...allValues, 1);
  const chartHeight = 180;
  const totalSlots = data.historical.length + data.forecast.length;

  // Precompute coordinates
  const histPoints = data.historical.map((d, i) => {
    const x = (i + 0.5) * 40;
    const y = chartHeight - (d.revenue / maxVal) * (chartHeight - 30) - 15;
    return { x, y, label: d.month, value: d.revenue };
  });

  const forecastPoints = data.forecast.map((d, i) => {
    const x = (data.historical.length + i + 0.5) * 40;
    const y = chartHeight - (d.projectedRevenue / maxVal) * (chartHeight - 30) - 15;
    return { x, y, label: d.month, value: d.projectedRevenue };
  });

  const bottom = chartHeight - 15;

  return (
    <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain className="h-4 w-4 text-violet-500" />
          <h3 className="text-sm font-semibold text-foreground">Projeções de IA</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className={cn(
            'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold',
            data.trend === 'up' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' :
            data.trend === 'down' ? 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300' :
            'bg-slate-50 text-slate-700 dark:bg-slate-950/40 dark:text-slate-300',
          )}>
            {data.trend === 'up' ? <TrendingUp className="h-3 w-3" /> :
             data.trend === 'down' ? <TrendingDown className="h-3 w-3" /> :
             <Minus className="h-3 w-3" />}
            {data.growthRate > 0 ? '+' : ''}{data.growthRate}%
          </span>
          <span className="text-xs text-muted-foreground">
            Confiança: {data.confidence}%
          </span>
        </div>
      </div>

      <div className="relative" style={{ height: chartHeight }}>
        <svg
          viewBox={`0 0 ${totalSlots * 40} ${chartHeight}`}
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
            <line
              key={ratio}
              x1="0"
              y1={bottom - ratio * (chartHeight - 30)}
              x2={totalSlots * 40}
              y2={bottom - ratio * (chartHeight - 30)}
              stroke="hsl(var(--border))"
              strokeWidth="0.5"
              strokeDasharray="2,3"
              opacity="0.5"
            />
          ))}

          {/* Historical area fill */}
          {histPoints.length > 1 && (
            <polygon
              points={`${histPoints.map((p) => `${p.x},${p.y}`).join(' ')} ${histPoints[histPoints.length - 1].x},${bottom} ${histPoints[0].x},${bottom}`}
              fill="hsl(var(--primary) / 0.08)"
            />
          )}

          {/* Historical line */}
          <polyline
            points={histPoints.map((p) => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Forecast dashed line + area */}
          {histPoints.length > 0 && forecastPoints.length > 0 && (
            <>
              <polyline
                points={`${histPoints[histPoints.length - 1].x},${histPoints[histPoints.length - 1].y} ${forecastPoints.map((p) => `${p.x},${p.y}`).join(' ')}`}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeDasharray="5,4"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.6"
              />
              <polygon
                points={`${histPoints[histPoints.length - 1].x},${histPoints[histPoints.length - 1].y} ${forecastPoints.map((p) => `${p.x},${p.y}`).join(' ')} ${forecastPoints[forecastPoints.length - 1].x},${bottom} ${histPoints[histPoints.length - 1].x},${bottom}`}
                fill="hsl(var(--primary) / 0.04)"
              />
            </>
          )}

          {/* Data dots - historical (filled) */}
          {histPoints.map((p, i) => (
            <circle
              key={`h-${i}`}
              cx={p.x} cy={p.y} r="3"
              fill="hsl(var(--primary))"
              className="cursor-pointer"
            >
              <title>{p.label}: {formatCurrency(p.value)}</title>
            </circle>
          ))}

          {/* Data dots - forecast (hollow) */}
          {forecastPoints.map((p, i) => (
            <circle
              key={`f-${i}`}
              cx={p.x} cy={p.y} r="3"
              fill="transparent"
              stroke="hsl(var(--primary))"
              strokeWidth="1.5"
              strokeDasharray="2,1"
              className="cursor-pointer"
            >
              <title>{p.label} (projetado): {formatCurrency(p.value)}</title>
            </circle>
          ))}
        </svg>
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-2">
        {[...histPoints, ...forecastPoints].map((p, i) => (
          <span
            key={i}
            className={cn(
              'text-[10px] font-medium',
              i < histPoints.length ? 'text-muted-foreground' : 'text-primary/60',
            )}
          >
            {p.label.slice(5)}
          </span>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/30">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">Realizado</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full border-2 border-dashed border-primary/60" />
          <span className="text-xs text-muted-foreground">Projetado</span>
        </div>
        <div className="flex items-center gap-1.5 ml-auto">
          <span className="text-xs text-muted-foreground">Próximos 3 meses</span>
        </div>
      </div>
    </div>
  );
}
