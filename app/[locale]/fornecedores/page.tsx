'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { AppShell } from '@/components/AppShell';
import { SupplierManager } from '@/components/SupplierManager';
import { useLowStockAlerts } from '@/lib/hooks/useLowStockAlerts';

export default function FornecedoresPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
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

  return (
    <AppShell alertCount={alertCount}>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Fornecedores</h1>
          <p className="text-sm text-muted-foreground">Gerencie seus fornecedores e parceiros.</p>
        </div>

        <SupplierManager />
      </div>
    </AppShell>
  );
}
