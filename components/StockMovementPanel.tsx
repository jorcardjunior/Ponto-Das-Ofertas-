'use client';

import { useState } from 'react';
import { X, History, Plus, Minus, Loader2 } from 'lucide-react';
import { useStockMovements } from '../lib/hooks/useStockMovements';
import type { Product } from '../lib/types';

type StockMovementPanelProps = {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onStockChanged: () => void;
};

export function StockMovementPanel({ open, product, onClose, onStockChanged }: StockMovementPanelProps) {
  const { movements, total, loading, registerMovement, refresh } = useStockMovements(product?.id ?? null);
  const [type, setType] = useState<'IN' | 'OUT'>('IN');
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!open || !product) return null;
  const currentProduct = product;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await registerMovement({ type, quantity, reason: reason || undefined });
      setQuantity(1);
      setReason('');
      onStockChanged();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative flex max-h-[85vh] w-full max-w-lg flex-col rounded-xl border border-border/50 bg-card shadow-xl animate-fade-in">
        <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Movimentação de Estoque</h2>
            <p className="text-sm text-muted-foreground">{currentProduct.name} (SKU: {currentProduct.sku})</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border/50 bg-muted/20 p-4">
            <h3 className="text-sm font-semibold text-foreground">Registrar Movimentação</h3>
            <p className="text-xs text-muted-foreground">
              Estoque atual: <span className="font-semibold text-foreground">{currentProduct.stock}</span> unidades
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setType('IN')}
                className={`flex-1 inline-flex items-center justify-center gap-2 h-9 rounded-xl text-sm font-medium transition-colors ${type === 'IN' ? 'bg-emerald-500 text-white shadow-sm' : 'border border-input bg-background text-muted-foreground hover:bg-accent'}`}
              >
                <Plus className="h-4 w-4" /> Entrada
              </button>
              <button
                type="button"
                onClick={() => setType('OUT')}
                className={`flex-1 inline-flex items-center justify-center gap-2 h-9 rounded-xl text-sm font-medium transition-colors ${type === 'OUT' ? 'bg-red-500 text-white shadow-sm' : 'border border-input bg-background text-muted-foreground hover:bg-accent'}`}
              >
                <Minus className="h-4 w-4" /> Saída
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Quantidade</label>
              <input
                type="number"
                min={1}
                max={type === 'OUT' ? currentProduct.stock : undefined}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full h-9 rounded-xl border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Motivo (opcional)</label>
              <input
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Ex: Reposição de estoque"
                maxLength={200}
                className="w-full h-9 rounded-xl border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 h-9 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {submitting ? 'Registrando…' : 'Registrar Movimentação'}
            </button>
          </form>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <History className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">Histórico ({total})</h3>
            </div>
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : movements.length === 0 ? (
              <p className="text-center py-8 text-sm text-muted-foreground">Nenhuma movimentação registrada.</p>
            ) : (
              <div className="space-y-2">
                {movements.map((m) => (
                  <div key={m.id} className="flex items-center justify-between rounded-lg border border-border/30 bg-background px-4 py-2.5 text-sm">
                    <div className="flex items-center gap-3">
                      <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${m.type === 'IN' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'}`}>
                        {m.type === 'IN' ? '+' : '-'}
                      </span>
                      <div>
                        <p className="font-medium text-foreground">
                          {m.type === 'IN' ? 'Entrada' : 'Saída'} — {m.quantity} unidade{m.quantity !== 1 && 's'}
                        </p>
                        {m.reason && <p className="text-xs text-muted-foreground">{m.reason}</p>}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(m.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
