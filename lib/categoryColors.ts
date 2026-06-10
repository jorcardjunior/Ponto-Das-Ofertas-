export const CATEGORY_COLOR_CLASSES: Record<string, string> = {
  '#0ea5e9': 'bg-sky-500',
  '#f97316': 'bg-orange-500',
  '#10b981': 'bg-emerald-500',
  '#a78bfa': 'bg-violet-400',
  '#f43f5e': 'bg-rose-500',
  '#f59e0b': 'bg-amber-500',
  '#60a5fa': 'bg-blue-400',
  '#ef4444': 'bg-red-500',
  '#94a3b8': 'bg-slate-400',
  '#22c55e': 'bg-green-500',
  '#ec4899': 'bg-pink-500',
  '#14b8a6': 'bg-teal-500',
  '#8b5cf6': 'bg-violet-500',
  '#0d9488': 'bg-teal-600',
};

export function getCategoryColorClass(color: string) {
  return CATEGORY_COLOR_CLASSES[color] ?? 'bg-slate-400';
}
