'use client';

import { useEffect, useState } from 'react';

type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  marketplace: string;
  price: number;
  stock: number;
};

type Category = { name: string; color: string };

type ProductFormProps = {
  categories: Category[];
  marketplaces: string[];
  onSave: (product: Product) => void;
  selected?: Product | null;
  onCancelEdit: () => void;
};

function generateSKU(marketplace: string) {
  const map: Record<string, string> = { Shopee: 'SHP', 'Mercado Livre': 'MLV', Amazon: 'AMZ' };
  const prefix = map[marketplace] ?? marketplace.slice(0, 3).toUpperCase();
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `${prefix}-${suffix}`;
}

export function ProductForm({ categories, marketplaces, onSave, selected, onCancelEdit }: ProductFormProps) {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState(categories[0]?.name ?? 'Geral');
  const [marketplace, setMarketplace] = useState(marketplaces[0] ?? 'Shopee');
  const [price, setPrice] = useState('0');
  const [stock, setStock] = useState('0');

  // auto-generate SKU for new products when marketplace/name changes
  useEffect(() => {
    if (!selected) {
      setSku(generateSKU(marketplace));
    }
  }, [marketplace, name, selected]);

  useEffect(() => {
    if (selected) {
      setName(selected.name);
      setSku(selected.sku);
      setCategory(selected.category);
      setMarketplace(selected.marketplace);
      setPrice(String(selected.price));
      setStock(String(selected.stock));
    } else {
      setName('');
      setSku(generateSKU(marketplaces[0] ?? 'Shopee'));
      setCategory(categories[0]?.name ?? 'Geral');
      setMarketplace(marketplaces[0] ?? 'Shopee');
      setPrice('0');
      setStock('0');
    }
  }, [selected, categories, marketplaces]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !sku.trim() || !category.trim()) {
      return;
    }

    onSave({
      id: selected?.id ?? `${Date.now()}`,
      name: name.trim(),
      sku: sku.trim(),
      category: category.trim(),
      marketplace,
      price: Number(price),
      stock: Number(stock),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_30px_100px_-60px_rgba(15,23,42,0.2)]">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-700">Cadastro de Produto</p>
        <p className="mt-2 text-sm text-slate-500">Adicione ou edite produtos e mantenha seu estoque organizado por canal.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-700">
          Nome do produto
          <input value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100" placeholder="Nome da oferta" />
        </label>

        <label className="space-y-2 text-sm text-slate-700">
          SKU
          <input value={sku} readOnly className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none" placeholder="Código único" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-700">
          Categoria
          <input
            list="category-options"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            placeholder="Digite ou selecione uma categoria"
          />
          <datalist id="category-options">
            {categories.map((option) => (
              <option key={option.name} value={option.name} />
            ))}
          </datalist>

          <div className="mt-2 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button key={c.name} type="button" onClick={() => setCategory(c.name)} className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-sm" style={{ '--category-color': c.color } as React.CSSProperties}>
                <span className="h-3 w-3 rounded-full bg-[var(--category-color)]" />
                <span className="text-slate-700">{c.name}</span>
              </button>
            ))}
          </div>
        </label>

        <label className="space-y-2 text-sm text-slate-700">
          Marketplace
          <select value={marketplace} onChange={(event) => setMarketplace(event.target.value)} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100">
            {marketplaces.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-700">
          Preço (R$)
          <input type="number" min="0" step="0.01" value={price} onChange={(event) => setPrice(event.target.value)} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100" />
        </label>

        <label className="space-y-2 text-sm text-slate-700">
          Quantidade em estoque
          <input type="number" min="0" step="1" value={stock} onChange={(event) => setStock(event.target.value)} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100" />
        </label>
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="submit" className="rounded-3xl bg-sky-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">
          {selected ? 'Atualizar produto' : 'Adicionar produto'}
        </button>
        {selected && (
          <button type="button" onClick={onCancelEdit} className="rounded-3xl border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            Cancelar edição
          </button>
        )}
      </div>
    </form>
  );
}
