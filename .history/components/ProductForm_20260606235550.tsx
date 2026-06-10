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
  onAddCategory: (category: string) => void;
  selected?: Product | null;
  onCancelEdit: () => void;
};

export function ProductForm({ categories, marketplaces, onSave, onAddCategory, selected, onCancelEdit }: ProductFormProps) {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState(categories[0] ?? 'Geral');
  const [marketplace, setMarketplace] = useState(marketplaces[0] ?? 'Shopee');
  const [price, setPrice] = useState('0');
  const [stock, setStock] = useState('0');
  const [newCategory, setNewCategory] = useState('');
  const [creatingCategory, setCreatingCategory] = useState(false);

  useEffect(() => {
    if (selected) {
      setName(selected.name);
      setSku(selected.sku);
      setCategory(selected.category);
      setMarketplace(selected.marketplace);
      setPrice(String(selected.price));
      setStock(String(selected.stock));
      setCreatingCategory(false);
      setNewCategory('');
    } else {
      setName('');
      setSku('');
      setCategory(categories[0] ?? 'Geral');
      setMarketplace(marketplaces[0] ?? 'Shopee');
      setPrice('0');
      setStock('0');
      setCreatingCategory(false);
      setNewCategory('');
    }
  }, [selected, categories, marketplaces]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !sku.trim()) {
      return;
    }

    const finalCategory = creatingCategory && newCategory.trim() ? newCategory.trim() : category;

    if (creatingCategory && newCategory.trim()) {
      onAddCategory(newCategory.trim());
    }

    onSave({
      id: selected?.id ?? `${Date.now()}`,
      name: name.trim(),
      sku: sku.trim(),
      category: finalCategory,
      marketplace,
      price: Number(price),
      stock: Number(stock),
    });

    setCreatingCategory(false);
    setNewCategory('');
  }

  function handleCategoryChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    if (value === '__new__') {
      setCreatingCategory(true);
      setNewCategory('');
      return;
    }
    setCategory(value);
    setCreatingCategory(false);
  }

  function handleAddCategory() {
    if (!newCategory.trim()) {
      return;
    }
    onAddCategory(newCategory.trim());
    setCategory(newCategory.trim());
    setCreatingCategory(false);
    setNewCategory('');
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
          <input value={sku} onChange={(event) => setSku(event.target.value)} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100" placeholder="Código único" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-700">
          Categoria
          <div className="grid gap-3">
            <select value={creatingCategory ? '__new__' : category} onChange={handleCategoryChange} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100">
              {categories.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
              <option value="__new__">+ Nova categoria</option>
            </select>
            {creatingCategory && (
              <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <input value={newCategory} onChange={(event) => setNewCategory(event.target.value)} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100" placeholder="Digite a nova categoria" />
                <button type="button" onClick={handleAddCategory} className="rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
                  Adicionar
                </button>
              </div>
            )}
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
