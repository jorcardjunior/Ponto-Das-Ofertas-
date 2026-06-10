'use client';

import { useEffect, useState } from 'react';
import { Save, X, Package, Loader2, TrendingUp, Percent, DollarSign } from 'lucide-react';
import { cn } from '../lib/utils';
import { MarketplaceBadge } from './MarketplaceBadge';
import type { Product, Category } from '../lib/types';

type ProductFormProps = {
  categories: Category[];
  marketplaces: string[];
  onSave: (product: Product) => Promise<void> | void;
  selected?: Product | null;
  onCancelEdit: () => void;
};

const TAX_RATE = 18; // 18% default tax

function generateSKU(marketplace: string) {
  const map: Record<string, string> = { Shopee: 'SHP', 'Mercado Livre': 'MLV', Amazon: 'AMZ' };
  const prefix = map[marketplace] ?? marketplace.slice(0, 3).toUpperCase();
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `${prefix}-${suffix}`;
}

const MAX_NAME_LENGTH = 100;
const MAX_SKU_LENGTH = 30;
const MAX_CATEGORY_LENGTH = 40;

type Field = 'name' | 'sku' | 'price' | 'stock' | 'costPrice' | 'marketplaceFee';
type Errors = Partial<Record<Field | 'category', string>>;

export function ProductForm({ categories, marketplaces, onSave, selected, onCancelEdit }: ProductFormProps) {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState(categories[0]?.name ?? 'Geral');
  const [marketplace, setMarketplace] = useState(marketplaces[0] ?? 'Shopee');
  const [price, setPrice] = useState('0');
  const [costPrice, setCostPrice] = useState('0');
  const [marketplaceFee, setMarketplaceFee] = useState('15');
  const [stock, setStock] = useState('0');
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!selected) {
      setSku(generateSKU(marketplace));
    }
  }, [marketplace, selected]);

  useEffect(() => {
    if (selected) {
      setName(selected.name);
      setSku(selected.sku);
      setCategory(selected.category);
      setMarketplace(selected.marketplace);
      setPrice(String(selected.price));
      setCostPrice(String(selected.costPrice ?? 0));
      setMarketplaceFee(String(selected.marketplaceFee ?? 15));
      setStock(String(selected.stock));
    } else {
      setName('');
      setSku(generateSKU(marketplaces[0] ?? 'Shopee'));
      setCategory(categories[0]?.name ?? 'Geral');
      setMarketplace(marketplaces[0] ?? 'Shopee');
      setPrice('0');
      setCostPrice('0');
      setMarketplaceFee('15');
      setStock('0');
      setErrors({});
    }
  }, [selected, categories, marketplaces]);

  const priceNum = Number(price) || 0;
  const costNum = Number(costPrice) || 0;
  const feePercent = Number(marketplaceFee) || 0;

  const taxAmount = priceNum * (TAX_RATE / 100);
  const totalFees = priceNum * (feePercent / 100);
  const grossProfit = priceNum - costNum - totalFees - taxAmount;
  const grossMargin = priceNum > 0 ? (grossProfit / priceNum) * 100 : 0;
  const markup = costNum > 0 ? ((priceNum - costNum) / costNum) * 100 : 0;

  function validate(): Errors {
    const errs: Errors = {};
    const trimmedName = name.trim();
    const trimmedCategory = category.trim();

    if (!trimmedName) errs.name = 'Informe o nome do produto.';
    else if (trimmedName.length > MAX_NAME_LENGTH) errs.name = `Máx ${MAX_NAME_LENGTH} caracteres.`;

    if (!sku.trim()) errs.sku = 'SKU não pode estar vazio.';
    else if (sku.trim().length > MAX_SKU_LENGTH) errs.sku = `Máx ${MAX_SKU_LENGTH} caracteres.`;

    if (!trimmedCategory) errs.category = 'Selecione uma categoria.';
    else if (trimmedCategory.length > MAX_CATEGORY_LENGTH) errs.category = `Máx ${MAX_CATEGORY_LENGTH} caracteres.`;

    const priceNum2 = Number(price);
    const stockNum2 = Number(stock);
    const costNum2 = Number(costPrice);
    if (Number.isNaN(priceNum2) || priceNum2 < 0) errs.price = 'Preço inválido.';
    if (Number.isNaN(stockNum2) || stockNum2 < 0) errs.stock = 'Estoque inválido.';
    if (Number.isNaN(costNum2) || costNum2 < 0) errs.costPrice = 'Custo inválido.';

    return errs;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      await onSave({
        id: selected?.id ?? `${Date.now()}`,
        name: name.trim(),
        sku: sku.trim(),
        category: category.trim(),
        marketplace,
        price: Number(price),
        costPrice: Number(costPrice),
        marketplaceFee: Number(marketplaceFee),
        stock: Number(stock),
      });
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = (field: Field) =>
    cn(
      'w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition',
      'placeholder:text-muted-foreground',
      'focus:border-ring focus:ring-2 focus:ring-ring/20',
      errors[field] ? 'border-destructive' : 'border-input',
    );

  const selectClass = cn(
    'w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition',
    'focus:border-ring focus:ring-2 focus:ring-ring/20',
  );

  const labelClass = 'space-y-1.5 text-sm font-medium text-foreground';

  return (
    <form onSubmit={handleSubmit} className="animate-scale-in rounded-xl border border-border/50 bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Package className="h-4 w-4 text-primary" />
        <div>
          <p className="text-sm font-semibold text-foreground">
            {selected ? 'Editar produto' : 'Novo produto'}
          </p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {selected ? 'Altere os dados e salve as alterações.' : 'Preencha os dados para adicionar ao catálogo.'}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Nome do produto
          <input
            value={name}
            onChange={(e) => { setName(e.target.value); setErrors((prev) => ({ ...prev, name: undefined })); }}
            maxLength={MAX_NAME_LENGTH}
            className={inputClass('name')}
            placeholder="Nome da oferta"
          />
          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
        </label>

        <label className={labelClass}>
          SKU
          <input
            value={sku}
            onChange={(e) => { setSku(e.target.value); setErrors((prev) => ({ ...prev, sku: undefined })); }}
            maxLength={MAX_SKU_LENGTH}
            className={inputClass('sku')}
            placeholder="Código único"
          />
          {errors.sku && <p className="text-xs text-destructive mt-1">{errors.sku}</p>}
        </label>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Categoria
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setErrors((prev) => ({ ...prev, category: undefined })); }}
            className={selectClass}
          >
            {categories.length === 0 ? (
              <option value="">Nenhuma disponível</option>
            ) : (
              categories.map((opt) => (
                <option key={opt.name} value={opt.name}>
                  {opt.name}
                </option>
              ))
            )}
          </select>
          {errors.category && <p className="text-xs text-destructive mt-1">{errors.category}</p>}
        </label>

        <label className={labelClass}>
          <span className="flex items-center gap-2">
            Marketplace
            <MarketplaceBadge marketplace={marketplace} className="text-[11px] leading-none" />
          </span>
          <select
            value={marketplace}
            onChange={(e) => setMarketplace(e.target.value)}
            className={selectClass}
          >
            {marketplaces.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Unit Economics Section */}
      <div className="mt-6">
        <div className="flex items-center gap-1.5 mb-3">
          <DollarSign className="h-4 w-4 text-emerald-500" />
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Unit Economics</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className={labelClass}>
            Preço venda (R$)
            <input
              type="number" min="0" step="0.01"
              value={price}
              onChange={(e) => { setPrice(e.target.value); setErrors((prev) => ({ ...prev, price: undefined })); }}
              className={inputClass('price')}
            />
            {errors.price && <p className="text-xs text-destructive mt-1">{errors.price}</p>}
          </label>

          <label className={labelClass}>
            Custo unitário (R$)
            <input
              type="number" min="0" step="0.01"
              value={costPrice}
              onChange={(e) => { setCostPrice(e.target.value); setErrors((prev) => ({ ...prev, costPrice: undefined })); }}
              className={inputClass('costPrice')}
              placeholder="0.00"
            />
            {errors.costPrice && <p className="text-xs text-destructive mt-1">{errors.costPrice}</p>}
          </label>

          <label className={labelClass}>
            <span className="flex items-center gap-1">
              Taxa marketplace (%)
              <Percent className="h-3 w-3 text-muted-foreground" />
            </span>
            <input
              type="number" min="0" max="100" step="0.1"
              value={marketplaceFee}
              onChange={(e) => setMarketplaceFee(e.target.value)}
              className={inputClass('marketplaceFee')}
              placeholder="15"
            />
          </label>

          <label className={labelClass}>
            Estoque
            <input
              type="number" min="0" step="1"
              value={stock}
              onChange={(e) => { setStock(e.target.value); setErrors((prev) => ({ ...prev, stock: undefined })); }}
              className={inputClass('stock')}
            />
            {errors.stock && <p className="text-xs text-destructive mt-1">{errors.stock}</p>}
          </label>
        </div>

        {/* Profitability Preview */}
        {priceNum > 0 && (
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="rounded-lg bg-muted/50 px-3 py-2">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Impostos (18%)</p>
              <p className="text-sm font-semibold text-foreground">R$ {taxAmount.toFixed(2)}</p>
            </div>
            <div className="rounded-lg bg-muted/50 px-3 py-2">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Taxas</p>
              <p className="text-sm font-semibold text-foreground">R$ {totalFees.toFixed(2)}</p>
            </div>
            <div className={cn('rounded-lg px-3 py-2', grossProfit > 0 ? 'bg-emerald-50 dark:bg-emerald-950/30' : 'bg-red-50 dark:bg-red-950/30')}>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Lucro Bruto</p>
              <p className={cn('text-sm font-semibold', grossProfit > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400')}>
                R$ {grossProfit.toFixed(2)}
              </p>
            </div>
            <div className={cn('rounded-lg px-3 py-2', grossMargin >= 30 ? 'bg-emerald-50 dark:bg-emerald-950/30' : grossMargin > 10 ? 'bg-amber-50 dark:bg-amber-950/30' : 'bg-red-50 dark:bg-red-950/30')}>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Margem</p>
              <p className={cn('text-sm font-semibold', grossMargin >= 30 ? 'text-emerald-600 dark:text-emerald-400' : grossMargin > 10 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400')}>
                {grossMargin.toFixed(1)}%
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {submitting ? 'Salvando…' : selected ? 'Atualizar produto' : 'Adicionar produto'}
        </button>
        {selected && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="inline-flex items-center gap-2 rounded-xl border border-input bg-background px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-accent active:scale-[0.97]"
          >
            <X className="h-4 w-4" />
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
