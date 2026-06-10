'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, Pencil, Trash2, Package, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown, ShoppingCart, History, AlertTriangle, CheckCircle, MinusCircle, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';
import { getCategoryColorClass } from '../lib/categoryColors';
import { MarketplaceBadge } from './MarketplaceBadge';
import type { Product, Category } from '../lib/types';

type ProductTableProps = {
  products: Product[];
  categories?: Category[];
  lowStockThreshold: number;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onRegisterSale?: (product: Product) => void;
  onStockMovement?: (product: Product) => void;
  total?: number;
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onSearchChange?: (search: string) => void;
  onSortChange?: (field: string, dir: 'asc' | 'desc') => void;
};

type SortField = 'name' | 'price' | 'stock' | 'marketplace';
type SortDir = 'asc' | 'desc';
type HealthFilter = 'all' | 'critical' | 'regular' | 'healthy';

export function ProductTable({
  products,
  categories = [],
  lowStockThreshold,
  onEdit,
  onDelete,
  onRegisterSale,
  onStockMovement,
  total: serverTotal,
  totalPages: serverTotalPages,
  currentPage: serverPage,
  onPageChange,
  onSearchChange,
  onSortChange,
}: ProductTableProps) {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [page, setPage] = useState(0);
  const [healthFilter, setHealthFilter] = useState<HealthFilter>('all');

  const isServerSide = !!onPageChange;

  const filtered = useMemo(() => {
    if (isServerSide) return products;
    const q = search.toLowerCase().trim();
    let list = products;
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.marketplace.toLowerCase().includes(q),
      );
    }
    // Health filter
    if (healthFilter !== 'all') {
      list = list.filter((p) => {
        const h = p.health ?? (p.stock <= lowStockThreshold ? 'critical' : p.stock <= lowStockThreshold * 3 ? 'regular' : 'healthy');
        return h === healthFilter;
      });
    }
    list = [...list].sort((a, b) => {
      let cmp = 0;
      if (sortField === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortField === 'price') cmp = a.price - b.price;
      else if (sortField === 'stock') cmp = a.stock - b.stock;
      else if (sortField === 'marketplace') cmp = a.marketplace.localeCompare(b.marketplace);
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return list;
  }, [products, search, sortField, sortDir, isServerSide, healthFilter, lowStockThreshold]);

  const PAGE_SIZE = 10;

  const paginated = useMemo(() => {
    if (isServerSide) return products;
    const start = page * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page, isServerSide, products]);

  const displayTotal = serverTotal ?? filtered.length;
  const displayTotalPages = serverTotalPages ?? Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const displayPage = isServerSide ? (serverPage ?? 1) - 1 : page;

  useEffect(() => {
    setPage(0);
  }, [search, healthFilter]);

  function toggleSort(field: SortField) {
    let newField = field;
    let newDir: SortDir = 'asc';
    if (sortField === field) {
      newDir = sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      newField = field;
      newDir = 'asc';
    }
    setSortField(newField);
    setSortDir(newDir);
    if (onSortChange) {
      onSortChange(newField, newDir);
    }
  }

  function handlePageChange(newPage: number) {
    if (isServerSide) {
      onPageChange!(newPage + 1);
    } else {
      setPage(newPage);
    }
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="ml-1 h-3 w-3 inline text-muted-foreground/40" />;
    return sortDir === 'asc'
      ? <ArrowUp className="ml-1 h-3 w-3 inline text-primary" />
      : <ArrowDown className="ml-1 h-3 w-3 inline text-primary" />;
  };

  const healthCounts = useMemo(() => {
    const counts = { critical: 0, regular: 0, healthy: 0 };
    products.forEach((p) => {
      const h = p.health ?? (p.stock <= lowStockThreshold ? 'critical' : p.stock <= lowStockThreshold * 3 ? 'regular' : 'healthy');
      counts[h]++;
    });
    return counts;
  }, [products, lowStockThreshold]);

  return (
    <div className="animate-fade-in overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm">
      <div className="flex flex-col gap-4 border-b border-border/50 px-5 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-foreground">Produtos</h2>
            <p className="text-sm text-muted-foreground">
              {displayTotal} produto{displayTotal !== 1 && 's'} cadastrado{displayTotal !== 1 && 's'}
            </p>
          </div>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Buscar produto, SKU, categoria…"
              className="h-9 w-full rounded-xl border border-input bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring sm:w-72"
            />
          </div>
        </div>

        {/* Health Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setHealthFilter('all')}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
              healthFilter === 'all' ? 'bg-primary/10 text-primary' : 'bg-muted/50 text-muted-foreground hover:bg-muted',
            )}
          >
            Todos ({products.length})
          </button>
          <button
            type="button"
            onClick={() => setHealthFilter('critical')}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
              healthFilter === 'critical' ? 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300' : 'bg-muted/50 text-muted-foreground hover:bg-muted',
            )}
          >
            <AlertTriangle className="h-3 w-3" /> Crítico ({healthCounts.critical})
          </button>
          <button
            type="button"
            onClick={() => setHealthFilter('regular')}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
              healthFilter === 'regular' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300' : 'bg-muted/50 text-muted-foreground hover:bg-muted',
            )}
          >
            <MinusCircle className="h-3 w-3" /> Regular ({healthCounts.regular})
          </button>
          <button
            type="button"
            onClick={() => setHealthFilter('healthy')}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
              healthFilter === 'healthy' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' : 'bg-muted/50 text-muted-foreground hover:bg-muted',
            )}
          >
            <CheckCircle className="h-3 w-3" /> Alto ({healthCounts.healthy})
          </button>
        </div>
      </div>

      <div className="overflow-x-auto whitespace-nowrap">
        <table className="w-full caption-bottom text-sm">
          <thead>
            <tr className="border-b border-border/50 bg-muted/20">
              <th
                className="cursor-pointer px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => toggleSort('name')}
              >
                Produto <SortIcon field="name" />
              </th>
              <th
                className="cursor-pointer px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => toggleSort('marketplace')}
              >
                Canal <SortIcon field="marketplace" />
              </th>
              <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Saúde
              </th>
              <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Categoria
              </th>
              <th
                className="cursor-pointer px-4 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => toggleSort('price')}
              >
                Preço <SortIcon field="price" />
              </th>
              <th
                className="cursor-pointer px-4 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => toggleSort('stock')}
              >
                Estoque <SortIcon field="stock" />
              </th>
              <th className="px-4 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Ações
              </th>
              {typeof onRegisterSale !== 'undefined' && (
                <th className="px-4 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Venda
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={onRegisterSale ? 8 : 7} className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center gap-3 text-muted-foreground">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                      <Package className="h-6 w-6 opacity-40" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {search || healthFilter !== 'all' ? 'Nenhum resultado encontrado' : 'Nenhum produto cadastrado'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {search || healthFilter !== 'all'
                          ? 'Tente ajustar sua busca ou usar termos diferentes.'
                          : 'Adicione seu primeiro produto ao lado para começar.'}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              paginated.map((product) => {
                const lowStock = product.stock <= lowStockThreshold;
                const health = product.health ?? (lowStock ? 'critical' : product.stock <= lowStockThreshold * 3 ? 'regular' : 'healthy');
                return (
                  <tr
                    key={product.id}
                    className="group border-b border-border/30 transition-colors hover:bg-muted/30 last:border-b-0"
                  >
                    <td className="px-4 py-3.5">
                      <div className="font-medium text-foreground">{product.name}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground font-mono">SKU: {product.sku}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <MarketplaceBadge marketplace={product.marketplace} />
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={cn(
                        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold',
                        health === 'critical' && 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300 ring-1 ring-inset ring-red-600/20',
                        health === 'regular' && 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 ring-1 ring-inset ring-amber-600/20',
                        health === 'healthy' && 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 ring-1 ring-inset ring-emerald-600/20',
                      )}>
                        {health === 'critical' && <AlertTriangle className="h-3 w-3" />}
                        {health === 'regular' && <MinusCircle className="h-3 w-3" />}
                        {health === 'healthy' && <CheckCircle className="h-3 w-3" />}
                        {health === 'critical' ? 'Crítico' : health === 'regular' ? 'Regular' : 'Alto'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <span
                          className={cn(
                            'h-2.5 w-2.5 rounded-full ring-1 ring-black/5',
                            getCategoryColorClass(
                              categories.find((c) => c.name === product.category)?.color ?? '#94a3b8',
                            ),
                          )}
                        />
                        <span>{product.category}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-right font-medium tabular-nums text-foreground">
                      R$ {product.price?.toFixed(2) ?? '0.00'}
                      {product.grossMargin != null && (
                        <div className={cn(
                          'text-[10px] font-medium',
                          product.grossMargin >= 30 ? 'text-emerald-600' : product.grossMargin >= 10 ? 'text-amber-600' : 'text-red-600',
                        )}>
                          {product.grossMargin.toFixed(0)}% margem
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <span
                        className={cn(
                          'inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-semibold',
                          lowStock
                            ? 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-950/40 dark:text-amber-300'
                            : 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-300',
                        )}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onEdit(product)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                          title="Editar"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDelete(product.id)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                            title="Excluir"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          {onStockMovement && (
                            <button
                              onClick={() => onStockMovement(product)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-blue-500/10 hover:text-blue-600"
                              title="Movimentação de estoque"
                            >
                              <History className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                      {onRegisterSale && (
                        <td className="px-4 py-3.5 text-right">
                          <button
                            onClick={() => onRegisterSale(product)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-emerald-500/10 hover:text-emerald-600"
                            title="Registrar venda"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </button>
                        </td>
                      )}
                    </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {displayTotal > PAGE_SIZE && (
        <div className="flex items-center justify-between border-t border-border/50 px-5 py-3">
          <p className="text-sm text-muted-foreground">
            {displayPage * PAGE_SIZE + 1}–{Math.min((displayPage + 1) * PAGE_SIZE, displayTotal)} de {displayTotal}
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handlePageChange(displayPage - 1)}
              disabled={displayPage === 0}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: displayTotalPages }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handlePageChange(i)}
                className={cn(
                  'inline-flex h-8 min-w-[32px] items-center justify-center rounded-lg px-2 text-sm font-medium transition-colors',
                  i === displayPage
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-accent',
                )}
              >
                {i + 1}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handlePageChange(displayPage + 1)}
              disabled={displayPage >= displayTotalPages - 1}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
