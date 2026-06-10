'use client';

import { useState } from 'react';
import { Plus, X, Building2, Package, Loader2 } from 'lucide-react';
import { useSuppliers } from '../lib/hooks/useSuppliers';
import { useToast } from './Toast';
import { ConfirmDialog } from './ConfirmDialog';
import type { Supplier } from '../lib/types';

export function SupplierManager() {
  const { suppliers, loading, create, remove } = useSuppliers();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleCreate(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    setSubmitting(true);
    try {
      await create({ name: trimmed, contact: contact.trim() || undefined, phone: phone.trim() || undefined, email: email.trim() || undefined });
      toast('Fornecedor adicionado!', 'success');
      setName('');
      setContact('');
      setPhone('');
      setEmail('');
      setShowForm(false);
    } catch {
      toast('Erro ao adicionar fornecedor.', 'error');
    } finally {
      setSubmitting(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    try {
      await remove(deleteTarget);
      toast('Fornecedor removido.', 'success');
    } catch {
      toast('Erro ao remover fornecedor.', 'error');
    }
    setDeleteTarget(null);
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">Carregando fornecedores…</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">Fornecedores</h2>
          <p className="text-sm text-muted-foreground">{suppliers.length} fornecedor(es)</p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Novo
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="mt-4 animate-scale-in space-y-3 rounded-lg border border-border/50 bg-muted/30 p-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do fornecedor"
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
            required
          />
          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Pessoa de contato (opcional)"
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Telefone"
              className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-accent"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : null}
              {submitting ? 'Salvando…' : 'Salvar'}
            </button>
          </div>
        </form>
      )}

      <div className="mt-4 space-y-2">
        {suppliers.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            <Building2 className="h-8 w-8 opacity-40" />
            Nenhum fornecedor cadastrado.
          </div>
        ) : (
          suppliers.map((s: Supplier) => (
            <div
              key={s.id}
              className="group flex items-center justify-between rounded-lg border border-border/50 px-4 py-3 transition-all hover:border-border hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {s.contact && `${s.contact} · `}
                    {s.productCount != null && (
                      <span className="inline-flex items-center gap-1">
                        <Package className="h-3 w-3" /> {s.productCount} produto(s)
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDeleteTarget(s.id)}
                className="rounded-md p-1.5 text-muted-foreground opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                aria-label={`Remover ${s.name}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))
        )}
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Excluir fornecedor"
        message="Tem certeza? Produtos vinculados não serão removidos."
        confirmLabel="Excluir"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
