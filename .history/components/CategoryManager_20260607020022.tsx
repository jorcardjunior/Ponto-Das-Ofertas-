'use client';

import { useState } from 'react';
import { getCategoryColorClass } from '../lib/categoryColors';

type Category = { name: string; color: string };

type Props = {
  categories: Category[];
  onCreate: (c: Category) => void;
  onDelete?: (name: string) => void;
};

const PALETTE = ['#0ea5e9', '#f97316', '#10b981', '#a78bfa', '#f43f5e', '#f59e0b', '#60a5fa', '#ef4444', '#94a3b8', '#22c55e', '#ec4899', '#14b8a6', '#f97316', '#8b5cf6', '#0d9488'];

export function CategoryManager({ categories, onCreate, onDelete }: Props) {
  const [name, setName] = useState('');
  const [color, setColor] = useState(PALETTE[0]);
  const [error, setError] = useState('');

  function handleAdd() {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Informe um nome de categoria.');
      return;
    }

    if (categories.some((category) => category.name.toLowerCase() === trimmedName.toLowerCase())) {
      setError('Essa categoria já existe.');
      return;
    }

    setError('');
    onCreate({ name: trimmedName, color });
    setName('');
  }

  return (
    <div className="mt-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome da categoria" className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm outline-none" />
        <div className="flex flex-wrap items-center gap-2">
          {PALETTE.map((c) => (
            <button key={c} type="button" onClick={() => setColor(c)} className={`h-6 w-6 rounded-full ${getCategoryColorClass(c)} ring-2 ${color === c ? 'ring-offset-2 ring-sky-400' : ''}`} aria-label={c} />
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <button onClick={handleAdd} className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Adicionar categoria</button>
        {error && <p className="text-sm text-rose-600">{error}</p>}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">Nenhuma categoria cadastrada ainda.</div>
        ) : (
          categories.map((c) => (
            <div key={c.name} className="rounded-[28px] border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className={`h-3.5 w-3.5 rounded-full ${getCategoryColorClass(c.color)}`} />
                  <span className="font-semibold text-slate-900">{c.name}</span>
                </div>
                {onDelete && (
                  <button type="button" onClick={() => onDelete(c.name)} className="text-slate-400 transition hover:text-rose-600" aria-label={`Remover ${c.name}`}>
                    ×
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
