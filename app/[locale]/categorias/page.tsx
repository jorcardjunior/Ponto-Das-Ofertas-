'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { AppShell } from '@/components/AppShell';
import { CategoryManager } from '@/components/CategoryManager';
import { useCategories } from '@/lib/hooks/useCategories';
import { useLowStockAlerts } from '@/lib/hooks/useLowStockAlerts';
import { useToast } from '@/components/Toast';

export default function CategoriasPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const { categories, loading, addCategory, removeCategory } = useCategories();
  const { count: alertCount } = useLowStockAlerts();

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

  async function handleCreate(category: { name: string; color: string }) {
    try {
      await addCategory(category);
      toast('Categoria criada!', 'success');
    } catch {
      toast('Erro ao criar categoria.', 'error');
    }
  }

  async function handleDelete(idOrName: string) {
    try {
      await removeCategory(idOrName);
      toast('Categoria removida.', 'success');
    } catch {
      toast('Erro ao remover categoria.', 'error');
    }
  }

  return (
    <AppShell alertCount={alertCount}>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Categorias</h1>
          <p className="text-sm text-muted-foreground">Organize seus produtos por categoria.</p>
        </div>

        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
          <h2 className="text-base font-semibold text-foreground mb-1">Gerenciar categorias</h2>
          <p className="text-sm text-muted-foreground mb-4">
            {categories.length} categoria{categories.length !== 1 && 's'} cadastrada{categories.length !== 1 && 's'}
          </p>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
            </div>
          ) : (
            <CategoryManager
              categories={categories}
              onCreate={handleCreate}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </AppShell>
  );
}
