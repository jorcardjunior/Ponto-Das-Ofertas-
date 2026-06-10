'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Package, TrendingUp, AlertTriangle, DollarSign, TrendingDown, Activity } from 'lucide-react';

type MetricVariant = 'default' | 'success' | 'warning' | 'danger' | 'value' | 'info';

type AnimatedMetricCardProps = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  description: string;
  variant?: MetricVariant;
  icon?: React.ReactNode;
  trend?: { value: number; label: string; positive?: boolean };
  onClick?: () => void;
};

const iconMap: Record<MetricVariant, React.ElementType> = {
  default: Package,
  success: TrendingUp,
  warning: AlertTriangle,
  danger: TrendingDown,
  value: DollarSign,
  info: Activity,
};

const variantStyles: Record<MetricVariant, { card: string; icon: string; accent: string; value: string }> = {
  default: { card: '', icon: 'bg-primary/10 text-primary', accent: 'bg-primary', value: 'text-foreground' },
  success: { card: 'from-emerald-500/5 to-transparent dark:from-emerald-500/10', icon: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400', accent: 'bg-emerald-500', value: 'text-emerald-600 dark:text-emerald-400' },
  warning: { card: 'from-amber-500/5 to-transparent dark:from-amber-500/10', icon: 'bg-amber-500/10 text-amber-600 dark:text-amber-400', accent: 'bg-amber-500', value: 'text-amber-600 dark:text-amber-400' },
  danger: { card: 'from-red-500/5 to-transparent dark:from-red-500/10', icon: 'bg-red-500/10 text-red-600 dark:text-red-400', accent: 'bg-red-500', value: 'text-red-600 dark:text-red-400' },
  value: { card: 'from-blue-500/5 to-transparent dark:from-blue-500/10', icon: 'bg-blue-500/10 text-blue-600 dark:text-blue-400', accent: 'bg-blue-500', value: 'text-blue-600 dark:text-blue-400' },
  info: { card: 'from-violet-500/5 to-transparent dark:from-violet-500/10', icon: 'bg-violet-500/10 text-violet-600 dark:text-violet-400', accent: 'bg-violet-500', value: 'text-violet-600 dark:text-violet-400' },
};

export function AnimatedMetricCard({
  label, value, prefix = '', suffix = '', decimals = 0,
  description, variant = 'default', icon, trend, onClick,
}: AnimatedMetricCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const prevValue = useRef(0);
  const animationRef = useRef<number>();

  useEffect(() => {
    const startValue = prevValue.current;
    const endValue = value;
    const duration = 1200;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (endValue - startValue) * eased;
      
      setDisplayValue(current);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        prevValue.current = endValue;
      }
    }

    animationRef.current = requestAnimationFrame(animate);
    setIsAnimating(true);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value]);

  const DefaultIcon = iconMap[variant];
  const styles = variantStyles[variant];

  const formattedValue = isAnimating
    ? displayValue.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : value.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group relative overflow-hidden rounded-xl border border-border/50 bg-card p-5 sm:p-6 shadow-sm transition-all duration-300',
        'bg-gradient-to-br text-left w-full',
        styles.card,
        onClick && 'cursor-pointer hover:shadow-md hover:-translate-y-0.5',
        !onClick && 'cursor-default',
      )}
    >
      {/* Accent blob */}
      <div className={cn('absolute -right-4 -top-4 h-20 w-20 rounded-full opacity-[0.04]', styles.accent)} />
      
      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="space-y-1.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {label}
            </p>
            <p className={cn('text-2xl sm:text-3xl font-bold tracking-tight transition-colors', styles.value)}>
              {prefix}{formattedValue}{suffix}
            </p>
          </div>
          <div className={cn(
            'flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg transition-all duration-300',
            styles.icon,
            onClick && 'group-hover:scale-110 group-hover:shadow-sm',
          )}>
            {icon || <DefaultIcon className="h-4 w-4 sm:h-5 sm:w-5" />}
          </div>
        </div>

        <div className="mt-2 sm:mt-3 flex items-center gap-2">
          <p className="text-xs sm:text-sm leading-5 text-muted-foreground">{description}</p>
          {trend && (
            <span className={cn(
              'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold',
              trend.positive !== false
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                : 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300',
            )}>
              {trend.positive !== false ? '↑' : '↓'} {trend.value}% {trend.label}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
