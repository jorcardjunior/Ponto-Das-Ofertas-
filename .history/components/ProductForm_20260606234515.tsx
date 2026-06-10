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

type ProductFormProps = {
  categories: string[];
  marketplaces: string[];
  onSave: (product: Product) => void;
  selected?: Product | null;
  onCancelEdit: () => void;
};

export function ProductForm({ categories, marketplaces, onSave, selected, onCancelEdit }: ProductFormProps) {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState(categories[0] ?? 'Geral');
  const [marketplace, setMarketplace] = useState(marketplaces[0] ?? 'Shopee');
  const [price, setPrice] = useState('0');
  const [stock, setStock] = useState('0');

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
      setSku('');
      setCategory(categories[0] ?? 'Geral');
      setMarketplace(marketplaces[0] ?? 'Shopee');
      setPrice('0');
      setStock('0');
    }
  }, [selected, categories, marketplaces]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !sku.trim()) {
      return;
    }

    onSave({
      id: selected?.id ?? `${Date.now()}`,
      name: name.trim(),
      sku: sku.trim(),
      category,
      marketplace,
      price: Number(price),
      stock: Number(stock),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-700">Cadastro de Produto</p>
        <p className="mt-2 text-sm text-slate-500">Adicione ou edite produtos e mantenha o estoque atualizado.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-700">
          Nome do produto
          <input value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100" />
        </label>

        <label className="space-y-2 text-sm text-slate-700">
          SKU
          <input value={sku} onChange={(event) => setSku(event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-700">
          Categoria
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100">
            {categories.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm text-slate-700">
          Marketplace
          <select value={marketplace} onChange={(event) => setMarketplace(event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100">
            {marketplaces.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-700">
          Preço (R$)
          <input type="number" min="0" step="0.01" value={price} onChange={(event) => setPrice(event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100" />
        </label>

        <label className="space-y-2 text-sm text-slate-700">
          Quantidade em estoque
          <input type="number" min="0" step="1" value={stock} onChange={(event) => setStock(event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100" />
        </label>
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="submit" className="rounded-2xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">
          {selected ? 'Atualizar produto' : 'Adicionar produto'}
        </button>
        {selected && (
          <button type="button" onClick={onCancelEdit} className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            Cancelar edição
          </button>
        )}
      </div>
    </form>
  );
}
