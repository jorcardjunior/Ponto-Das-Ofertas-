'use client';

import { useState } from 'react';

type Category = { name: string; color: string };

type Props = {
  categories: Category[];
  onCreate: (c: Category) => void;
  onDelete?: (name: string) => void;
};

const PALETTE = ['#0ea5e9', '#f97316', '#10b981', '#a78bfa', '#f43f5e', '#f59e0b', '#60a5fa', '#ef4444', '#94a3b8'];

export function CategoryManager({ categories, onCreate, onDelete }: Props) {
  const [name, setName] = useState('');
  const [color, setColor] = useState(PALETTE[0]);

  function handleAdd() {
    if (!name.trim()) return;
    onCreate({ name: name.trim(), color });
    setName('');
  }

  return (
    <div className="mt-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome da categoria" className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm outline-none" />
        <div className="flex items-center gap-2">
          {PALETTE.map((c) => (
            <button key={c} type="button" onClick={() => setColor(c)} className={`h-8 w-8 rounded-full bg-[var(--swatch)] ring-2 ${color === c ? 'ring-offset-2 ring-sky-400' : ''}`} style={{ '--swatch': c } as React.CSSProperties} aria-label={c} />
          ))}
        </div>
      </div>

      <div className="mt-3">
        <button onClick={handleAdd} className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Adicionar categoria</button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {categories.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 px-4 py-3 text-sm text-slate-500">Nenhuma categoria cadastrada ainda.</div>
        ) : (
          categories.map((c) => (
            <div key={c.name} className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-sm">
              <span className="h-3 w-3 rounded-full bg-[var(--category-chip)]" style={{ '--category-chip': c.color } as React.CSSProperties} />
              <span className="text-slate-700">{c.name}</span>
              {onDelete && (
                <button type="button" onClick={() => onDelete(c.name)} className="rounded-full px-2 py-1 text-xs font-semibold text-slate-500 transition hover:text-slate-900">
                  ×
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
