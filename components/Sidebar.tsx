'use client';

import { useRouter, usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Tags,
  Truck,
  ChevronLeft,
  ChevronRight,
  Store,
  X,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useMediaQuery } from '../lib/hooks/useMediaQuery';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, id: 'dashboard', href: '/dashboard' },
  { label: 'Produtos', icon: Package, id: 'products', href: '/produtos' },
  { label: 'Categorias', icon: Tags, id: 'categories', href: '/categorias' },
  { label: 'Fornecedores', icon: Truck, id: 'suppliers', href: '/fornecedores' },
];

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
  open?: boolean;
  onClose?: () => void;
};

export function Sidebar({ collapsed, onToggle, open = true, onClose }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 1023px)');

  const active = navItems.find((item) => pathname.includes(item.href))?.id ?? 'dashboard';

  const sidebarContent = (
    <>
      <div className="flex h-16 items-center justify-between gap-3 border-b border-sidebar-border px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
            <Store className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className={cn('overflow-hidden transition-opacity duration-200', collapsed && 'opacity-0')}>
            <p className="text-sm font-semibold text-sidebar-foreground whitespace-nowrap">Ponto das Ofertas</p>
            <p className="text-xs text-muted-foreground whitespace-nowrap">Controle de Estoque</p>
          </div>
        </div>
        {isMobile && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-sidebar-accent"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => router.push(item.href)}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
              active === item.id
                ? 'bg-primary/10 text-primary'
                : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground',
            )}
            title={collapsed ? item.label : undefined}
          >
            <item.icon className={cn('h-4 w-4 shrink-0', active === item.id ? 'text-primary' : '')} />
            <span className={cn('overflow-hidden whitespace-nowrap transition-opacity duration-200', collapsed && 'opacity-0')}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {!isMobile && (
        <div className="border-t border-sidebar-border p-3">
          <button
            type="button"
            onClick={onToggle}
            className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
            title={collapsed ? 'Expandir' : 'Recolher'}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            <span className={cn('overflow-hidden whitespace-nowrap transition-opacity duration-200', collapsed && 'opacity-0')}>Recolher</span>
          </button>
        </div>
      )}
    </>
  );

  if (isMobile) {
    return (
      <>
        {open && (
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
        )}
        <aside
          className={cn(
            'fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-sidebar-border bg-sidebar-bg transition-transform duration-300 ease-in-out w-sidebar lg:hidden',
            open ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          {sidebarContent}
        </aside>
      </>
    );
  }

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 hidden lg:flex h-screen flex-col border-r border-sidebar-border bg-sidebar-bg transition-all duration-300 ease-in-out',
        collapsed ? 'w-sidebar-collapsed' : 'w-sidebar',
      )}
    >
      {sidebarContent}
    </aside>
  );
}
