'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';

type DataPoint = {
  label: string;
  value: number;
  secondary?: number;
};

type AreaChartProps = {
  data: DataPoint[];
  height?: number;
  color?: string;
  gradient?: boolean;
  showGrid?: boolean;
  formatValue?: (v: number) => string;
  className?: string;
};

export function AreaChart({
  data, height = 200, color = 'hsl(var(--primary))',
  gradient = true, showGrid = true, formatValue, className,
}: AreaChartProps) {
  const maxVal = Math.max(...data.map((d) => d.value), 1);

  const pathD = useMemo(() => {
    if (data.length === 0) return '';
    const w = 100;
    const parts = data.map((d, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = height - (d.value / maxVal) * (height - 20) - 10;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    });
    return parts.join(' ');
  }, [data, maxVal, height]);

  const areaD = useMemo(() => {
    if (data.length === 0) return '';
    const w = 100;
    const bottom = height - 10;
    let d = pathD;
    d += ` L${w},${bottom} L0,${bottom} Z`;
    return d;
  }, [pathD, height]);

  const chartId = useMemo(() => `area-${Math.random().toString(36).slice(2, 8)}`, []);

  if (data.length === 0) return null;

  return (
    <div className={cn('w-full', className)}>
      <svg
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
        className="w-full overflow-visible"
        style={{ height }}
      >
        <defs>
          {gradient && (
            <linearGradient id={`${chartId}-grad`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.25" />
              <stop offset="100%" stopColor={color} stopOpacity="0.02" />
            </linearGradient>
          )}
        </defs>

        {/* Grid lines */}
        {showGrid && [0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = height - ratio * (height - 20) - 10;
          return (
            <line
              key={ratio}
              x1="0" y1={y} x2="100" y2={y}
              stroke="hsl(var(--border))"
              strokeWidth="0.3"
              strokeDasharray="1,1.5"
            />
          );
        })}

        {/* Area fill */}
        {areaD && (
          <path
            d={areaD}
            fill={gradient ? `url(#${chartId}-grad)` : `${color}15`}
            className="transition-all duration-500"
          />
        )}

        {/* Line */}
        {pathD && (
          <path
            d={pathD}
            fill="none"
            stroke={color}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500"
          />
        )}

        {/* Data dots */}
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * 100;
          const y = height - (d.value / maxVal) * (height - 20) - 10;
          return (
            <g key={i}>
              <circle
                cx={x} cy={y} r="2"
                fill={color}
                className="transition-all duration-300 hover:r-3"
              />
              <circle
                cx={x} cy={y} r="4"
                fill="transparent"
                className="cursor-pointer hover:fill-background hover:stroke-[1.5] hover:stroke-[color]"
                style={{ stroke: color }}
              >
                <title>
                  {d.label}: {formatValue ? formatValue(d.value) : d.value.toLocaleString('pt-BR')}
                </title>
              </circle>
            </g>
          );
        })}
      </svg>

      {/* X-axis labels */}
      <div className="flex justify-between mt-2 px-0.5">
        {data.filter((_, i) => {
          const step = Math.max(1, Math.floor(data.length / 8));
          return i % step === 0 || i === data.length - 1;
        }).map((d) => (
          <span key={d.label} className="text-[10px] text-muted-foreground font-medium whitespace-nowrap">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}
