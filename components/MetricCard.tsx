import { cn } from '../lib/utils';
import { Package, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';

type MetricCardProps = {
  label: string;
  value: string | number;
  description: string;
  variant?: 'default' | 'success' | 'warning' | 'value';
};

const iconMap = {
  default: Package,
  success: TrendingUp,
  warning: AlertTriangle,
  value: DollarSign,
};

const variantStyles = {
  default: {
    card: '',
    icon: 'bg-primary/10 text-primary',
    accent: 'bg-primary',
  },
  success: {
    card: 'from-success/5 to-transparent dark:from-success/10',
    icon: 'bg-success/10 text-success',
    accent: 'bg-success',
  },
  warning: {
    card: 'from-warning/5 to-transparent dark:from-warning/10',
    icon: 'bg-warning/10 text-warning',
    accent: 'bg-warning',
  },
  value: {
    card: 'from-primary/5 to-transparent dark:from-primary/10',
    icon: 'bg-primary/10 text-primary',
    accent: 'bg-primary',
  },
};

export function MetricCard({ label, value, description, variant = 'default' }: MetricCardProps) {
  const Icon = iconMap[variant];
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5',
        'bg-gradient-to-br',
        styles.card,
      )}
    >
      <div className={cn('absolute right-0 top-0 h-24 w-24 -translate-y-1/2 translate-x-1/2 rounded-full opacity-[0.03]', styles.accent)} />
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            {label}
          </p>
          <p className={cn('text-3xl font-bold tracking-tight text-foreground')}>
            {value}
          </p>
        </div>
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-sm', styles.icon)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-3 text-sm leading-5 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
