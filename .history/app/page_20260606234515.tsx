'use client';

import { useEffect, useMemo, useState } from 'react';
import { MetricCard } from '../components/MetricCard';
import { ProductForm } from '../components/ProductForm';
import { ProductTable } from '../components/ProductTable';

type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  marketplace: string;
  price: number;
  stock: number;
};

const STORAGE_KEY = 'promptfyos-products';
const LOW_STOCK_THRESHOLD = 5;

const initialCategories = ['Eletrônicos', 'Roupas', 'Casa', 'Beleza', 'Acessórios', 'Geral'];
const marketplaces = ['Shopee', 'Mercado Livre', 'Amazon'];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (stored) {
      try {
        setProducts(JSON.parse(stored) as Product[]);
      } catch {
        setProducts([]);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }
  }, [products]);

  const metrics = useMemo(() => {
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
    const inventoryValue = products.reduce((sum, product) => sum + product.price * product.stock, 0);
    const lowStockCount = products.filter((product) => product.stock <= LOW_STOCK_THRESHOLD).length;

    return {
      totalProducts,
      totalStock,
      inventoryValue,
      lowStockCount,
    };
  }, [products]);

  function handleSave(product: Product) {
    if (selectedProduct && selectedProduct.id === product.id) {
      setProducts((current) => current.map((item) => (item.id === product.id ? product : item)));
    } else {
      setProducts((current) => [product, ...current]);
    }
    setSelectedProduct(null);
  }

  function handleEdit(product: Product) {
    setSelectedProduct(product);
  }

  function handleDelete(id: string) {
    setProducts((current) => current.filter((product) => product.id !== id));
    if (selectedProduct?.id === id) {
      setSelectedProduct(null);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <header className="mb-10 rounded-3xl bg-gradient-to-r from-sky-600 to-cyan-600 p-10 text-white shadow-xl shadow-sky-500/20">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-100">Painel de Vendas Multichannel</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Controle seu estoque e catálogo em um só lugar</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-sky-100/90">
              Cadastre produtos, visualize estoque por marketplace e acompanhe as métricas essenciais para vender com segurança na Shopee, Mercado Livre e Amazon.
            </p>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <div className="grid gap-6">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <MetricCard label="Produtos" value={metrics.totalProducts} description="Itens cadastrados" />
              <MetricCard label="Unidades em estoque" value={metrics.totalStock} description="Total disponível para venda" />
              <MetricCard label="Valor do estoque" value={`R$ ${metrics.inventoryValue.toFixed(2)}`} description="Estimativa de inventário" />
              <MetricCard label="Estoque baixo" value={metrics.lowStockCount} description="Itens críticos em estoque" variant="warning" />
            </div>

            <ProductTable products={products} lowStockThreshold={LOW_STOCK_THRESHOLD} onEdit={handleEdit} onDelete={handleDelete} />
          </div>

          <ProductForm categories={initialCategories} marketplaces={marketplaces} onSave={handleSave} selected={selectedProduct} onCancelEdit={() => setSelectedProduct(null)} />
        </section>

        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40">
          <h2 className="text-2xl font-semibold text-slate-900">Como usar este painel</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <li>• Adicione seus produtos com SKU, categoria e marketplace para manter o catálogo organizado.</li>
            <li>• Atualize a quantidade sempre que receber novos itens para evitar vendas fora de estoque.</li>
            <li>• Confira rapidamente quais produtos estão com estoque baixo pela cor de alerta.</li>
            <li>• Use a tabela para editar ou remover produtos conforme necessário.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
