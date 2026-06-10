type MetricCardProps = {
  label: string;
  value: string | number;
  description: string;
  variant?: 'default' | 'success' | 'warning';
};

const variantStyles: Record<string, string> = {
  default: 'bg-white border-slate-200 text-slate-900',
  success: 'bg-emerald-600 text-white',
  warning: 'bg-amber-500 text-white',
};

export function MetricCard({ label, value, description, variant = 'default' }: MetricCardProps) {
  return (
    <div className={`rounded-3xl border p-6 shadow-sm ${variantStyles[variant]}`}>
      <p className="text-sm font-medium uppercase tracking-[0.24em] opacity-80">{label}</p>
      <p className="mt-4 text-4xl font-semibold">{value}</p>
      <p className="mt-2 text-sm leading-6 opacity-80">{description}</p>
    </div>
  );
}
