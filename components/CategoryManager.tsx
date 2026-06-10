'use client';

import { useState } from 'react';
import { Plus, X, Palette, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { getCategoryColorClass } from '../lib/categoryColors';
import type { Category } from '../lib/types';

type Props = {
  categories: Category[];
  onCreate: (c: Category) => Promise<void>;
  onDelete: (idOrName: string) => Promise<void>;
};
const PALETTE = [
  '#0ea5e9', '#f97316', '#10b981', '#a78bfa', '#f43f5e',
  '#f59e0b', '#60a5fa', '#ef4444', '#94a3b8', '#22c55e',
  '#ec4899', '#14b8a6', '#8b5cf6', '#0d9488',
];

const MAX_CATEGORY_LENGTH = 40;

export function CategoryManager({ categories, onCreate, onDelete }: Props) {
  const [name, setName] = useState('');
  const [color, setColor] = useState(PALETTE[0]);
  const [error, setError] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleAdd() {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Informe um nome de categoria.');
      return;
    }
    if (trimmedName.length > MAX_CATEGORY_LENGTH) {
      setError(`Nome muito longo (máx ${MAX_CATEGORY_LENGTH} caracteres).`);
      return;
    }
    if (categories.some((c) => c.name.toLowerCase() === trimmedName.toLowerCase())) {
      setError('Essa categoria já existe.');
      return;
    }

    setError('');
    setSubmitting(true);
    try {
      await onCreate({ name: trimmedName, color });
      setName('');
    } catch {
      setError('Erro ao criar categoria.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(idOrName: string) {
    setDeleting(idOrName);
    try {
      await onDelete(idOrName);
    } catch {
      setError('Erro ao remover categoria.');
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="mt-4 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <input
            value={name}
            onChange={(e) => { setName(e.target.value); setError(''); }}
            maxLength={MAX_CATEGORY_LENGTH}
            placeholder="Nome da categoria"
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
          />
          <button
            type="button"
            onClick={() => setShowPicker(!showPicker)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-accent"
            title="Escolher cor"
          >
            <Palette className="h-4 w-4" />
          </button>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          {submitting ? 'Adicionando…' : 'Adicionar'}
        </button>
      </div>

      {showPicker && (
        <div className="animate-scale-in flex flex-wrap items-center gap-2 rounded-lg border border-border/50 bg-muted/30 p-3">
          {PALETTE.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={cn(
                'h-7 w-7 rounded-full transition-all duration-200',
                getCategoryColorClass(c),
                color === c ? 'ring-2 ring-ring ring-offset-2 ring-offset-background scale-110' : 'ring-1 ring-transparent hover:scale-110',
              )}
              aria-label={`Cor ${c}`}
            />
          ))}
        </div>
      )}

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {categories.length === 0 ? (
          <div className="col-span-full rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            Nenhuma categoria cadastrada ainda.
          </div>
        ) : (
          categories.map((c) => (
            <div
              key={c.id ?? c.name}
              className="group flex items-center justify-between rounded-lg border border-border/50 bg-card px-4 py-3 shadow-sm transition-all hover:border-border hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className={cn('h-3 w-3 rounded-full', getCategoryColorClass(c.color))} />
                <span className="text-sm font-medium text-foreground">{c.name}</span>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(c.id ?? c.name)}
                disabled={deleting === (c.id ?? c.name)}
                className="rounded-md p-1.5 text-muted-foreground opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100 disabled:opacity-100"
                aria-label={`Remover ${c.name}`}
              >
                {deleting === (c.id ?? c.name) ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <X className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
