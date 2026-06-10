'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { AppShell } from '@/components/AppShell';
import { ProductForm } from '@/components/ProductForm';
import { ProductTable } from '@/components/ProductTable';
import { RegisterSaleModal } from '@/components/RegisterSaleModal';
import { StockMovementPanel } from '@/components/StockMovementPanel';
import { LowStockAlertPanel } from '@/components/LowStockAlertPanel';
import { useProducts } from '@/lib/hooks/useProducts';
import { useCategories } from '@/lib/hooks/useCategories';
import { useSales } from '@/lib/hooks/useSales';
import { useLowStockAlerts } from '@/lib/hooks/useLowStockAlerts';
import { useToast } from '@/components/Toast';
import type { Product } from '@/lib/types';

export default function ProdutosPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [selected, setSelected] = useState<Product | null>(null);
  const [saleProduct, setSaleProduct] = useState<Product | null>(null);
  const [movementProduct, setMovementProduct] = useState<Product | null>(null);
  const [showAlerts, setShowAlerts] = useState(false);

  const { categories } = useCategories();
  const { registerSale } = useSales();
  const { alerts: lowStockAlerts, count: alertCount, threshold, refresh: refreshAlerts } = useLowStockAlerts();

  const [filters, setFilters] = useState<{
    search?: string;
    sort?: string;
    dir?: 'asc' | 'desc';
    page?: number;
  }>({ page: 1 });

  const { products, total, totalPages, currentPage, loading, addOrUpdate, remove, refresh } = useProducts(filters);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
          <p className="text-sm text-muted-foreground">Carregando…</p>
        </div>
      </main>
    );
  }

  const marketplaces = ['Shopee', 'Mercado Livre', 'Amazon'];

  async function handleSave(product: Product) {
    try {
      await addOrUpdate(product, selected?.id);
      toast(selected ? 'Produto atualizado!' : 'Produto adicionado!', 'success');
      setSelected(null);
      refresh();
      refreshAlerts();
    } catch {
      toast('Erro ao salvar produto.', 'error');
    }
  }

  async function handleDelete(id: string) {
    try {
      await remove(id);
      toast('Produto removido.', 'success');
      refreshAlerts();
    } catch {
      toast('Erro ao remover produto.', 'error');
    }
  }

  async function handleSale(data: { productId: string; quantity: number; price: number; channel: string; date: string }) {
    try {
      await registerSale(data);
      toast('Venda registrada!', 'success');
      refresh();
      refreshAlerts();
    } catch {
      toast('Erro ao registrar venda.', 'error');
    }
  }

  return (
    <AppShell alertCount={alertCount} onAlertClick={() => setShowAlerts(true)}>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Produtos</h1>
          <p className="text-sm text-muted-foreground">Gerencie seu catálogo de produtos.</p>
        </div>

        <ProductForm
          categories={categories}
          marketplaces={marketplaces}
          onSave={handleSave}
          selected={selected}
          onCancelEdit={() => setSelected(null)}
        />

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
          </div>
        ) : (
          <ProductTable
            products={products}
            categories={categories}
            lowStockThreshold={threshold}
            onEdit={setSelected}
            onDelete={handleDelete}
            onRegisterSale={setSaleProduct}
            onStockMovement={setMovementProduct}
            total={total}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={(page) => setFilters((f) => ({ ...f, page }))}
            onSearchChange={(search) => setFilters((f) => ({ ...f, search, page: 1 }))}
            onSortChange={(sort, dir) => setFilters((f) => ({ ...f, sort, dir, page: 1 }))}
          />
        )}

        <RegisterSaleModal
          open={!!saleProduct}
          product={saleProduct}
          onClose={() => setSaleProduct(null)}
          onConfirm={handleSale}
        />

        <StockMovementPanel
          open={!!movementProduct}
          product={movementProduct}
          onClose={() => setMovementProduct(null)}
          onStockChanged={() => { refresh(); refreshAlerts(); }}
        />

        <LowStockAlertPanel
          open={showAlerts}
          alerts={lowStockAlerts}
          threshold={threshold}
          onClose={() => setShowAlerts(false)}
        />
      </div>
    </AppShell>
  );
}
