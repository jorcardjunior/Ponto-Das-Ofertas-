'use client';

import { cn } from '../lib/utils';

const marketplaceStyles: Record<string, string> = {
  Shopee: 'bg-[#FFF0ED] text-[#EE4D2D] ring-[#EE4D2D]/20 dark:bg-[#1A0A04] dark:text-orange-300 dark:ring-orange-700/30',
  'Mercado Livre': 'bg-[#FFF4E5] text-[#FF9900] ring-[#FF9900]/20 dark:bg-[#1A0F00] dark:text-amber-300 dark:ring-amber-700/30',
  Amazon: 'bg-[#FFFDE6] text-[#2D3277] ring-[#2D3277]/20 dark:bg-[#100E00] dark:text-[#99A0E0] dark:ring-[#2D3277]/30',
};

function ShopeeIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 shrink-0">
      <rect x="3" y="6" width="14" height="12" rx="1.5" />
      <path d="M6 6V4a4 4 0 1 1 8 0v2" />
      <path d="M3 9.5h14" opacity="0.35" />
    </svg>
  );
}

function MercadoLivreIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 shrink-0">
      <circle cx="10" cy="10" r="8" />
      <path d="M4 12c1.5-4 3.5-6 6-6s4.5 2 6 6" />
      <path d="M4 12c-2-1-2-4 1-5.5s4-1 5 1.5" />
      <path d="M16 12c2-1 2-4-1-5.5s-4-1-5 1.5" />
    </svg>
  );
}

function AmazonIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 shrink-0">
      <path d="M2 11c2 2.5 4.5 3 8 3s6-.5 8-3" />
      <path d="M16 9.5l2 1.5-2 1.5" />
    </svg>
  );
}

const icons: Record<string, () => JSX.Element> = {
  Shopee: ShopeeIcon,
  'Mercado Livre': MercadoLivreIcon,
  Amazon: AmazonIcon,
};

type Props = {
  marketplace: string;
  className?: string;
};

export function MarketplaceBadge({ marketplace, className }: Props) {
  const Icon = icons[marketplace];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset',
        marketplaceStyles[marketplace] ?? 'bg-slate-50 text-slate-700 ring-slate-500/20 dark:bg-slate-950/40 dark:text-slate-300 dark:ring-slate-700/30',
        className,
      )}
    >
      {Icon && <Icon />}
      {marketplace}
    </span>
  );
}
