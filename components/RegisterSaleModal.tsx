'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import type { Product } from '../lib/types';

type RegisterSaleModalProps = {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onConfirm: (data: { productId: string; quantity: number; price: number; channel: string; date: string }) => Promise<void>;
};

const CHANNELS = ['Shopee', 'Mercado Livre', 'Amazon', 'WhatsApp', 'Loja Física', 'Outro'];

export function RegisterSaleModal({ open, product, onClose, onConfirm }: RegisterSaleModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(product?.price ?? 0);
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [submitting, setSubmitting] = useState(false);

  if (!open || !product) return null;

  const currentProduct = product;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onConfirm({
        productId: currentProduct.id,
        quantity,
        price,
        channel,
        date: new Date().toISOString(),
      });
      setQuantity(1);
      setPrice(currentProduct.price);
      setChannel(CHANNELS[0]);
      onClose();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl border border-border/50 bg-card p-6 shadow-xl animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Registrar Venda</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          Produto: <span className="font-medium text-foreground">{currentProduct.name}</span>
          <span className="font-mono ml-2">(SKU: {currentProduct.sku})</span>
        </p>
        <p className="text-xs text-muted-foreground mb-4">
          Estoque atual: <span className="font-semibold text-foreground">{currentProduct.stock}</span> unidades
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Quantidade</label>
            <input
              type="number"
              min={1}
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Math.min(Number(e.target.value), product.stock))}
              className="w-full h-9 rounded-xl border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Preço unitário (R$)</label>
            <input
              type="number"
              min={0}
              step={0.01}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full h-9 rounded-xl border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Canal</label>
            <select
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
              className="w-full h-9 rounded-xl border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {CHANNELS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="h-9 rounded-xl border border-input bg-background px-4 text-sm font-medium text-foreground hover:bg-accent transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting || quantity > product.stock}
              className="inline-flex h-9 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {submitting && <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
              {submitting ? 'Registrando…' : 'Registrar Venda'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
