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

const STORAGE_PRODUCTS = 'promptfyos-products';
const STORAGE_CATEGORIES = 'promptfyos-categories';
const LOW_STOCK_THRESHOLD = 5;

const initialCategories = ['Eletrônicos', 'Roupas', 'Casa', 'Beleza', 'Acessórios', 'Geral'];
const marketplaces = ['Shopee', 'Mercado Livre', 'Amazon'];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const storedProducts = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_PRODUCTS) : null;
    const storedCategories = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_CATEGORIES) : null;

    if (storedProducts) {
      try {
        setProducts(JSON.parse(storedProducts) as Product[]);
      } catch {
        setProducts([]);
      }
    }

    if (storedCategories) {
      try {
        const parsedCategories = JSON.parse(storedCategories) as string[];
        if (Array.isArray(parsedCategories) && parsedCategories.length > 0) {
          setCategories(parsedCategories);
        }
      } catch {
        setCategories(initialCategories);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_PRODUCTS, JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_CATEGORIES, JSON.stringify(categories));
    }
  }, [categories]);

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
    if (!categories.includes(product.category)) {
      setCategories((current) => [product.category, ...current]);
    }

    if (selectedProduct && selectedProduct.id === product.id) {
      setProducts((current) => current.map((item) => (item.id === product.id ? product : item)));
    } else {
      setProducts((current) => [product, ...current]);
    }
    setSelectedProduct(null);
  }

  function handleAddCategory(category: string) {
    if (!categories.includes(category)) {
      setCategories((current) => [category, ...current]);
    }
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
        <header className="mb-10 rounded-[42px] bg-gradient-to-r from-slate-900 via-slate-800 to-sky-700 p-10 text-white shadow-[0_40px_120px_-80px_rgba(14,165,233,0.8)]">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-200/80">Painel de vendas multichannel</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">Domine seu estoque e vendas em Shopee, Mercado Livre e Amazon</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-200/90">
              Um painel moderno para cadastrar produtos, criar categorias personalizadas e controlar seu inventário sem perder vendas.
            </p>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          <div className="grid gap-6">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <MetricCard label="Produtos" value={metrics.totalProducts} description="Itens cadastrados" />
              <MetricCard label="Unidades" value={metrics.totalStock} description="Total disponível para venda" />
              <MetricCard label="Valor" value={`R$ ${metrics.inventoryValue.toFixed(2)}`} description="Valor estimado do estoque" />
              <MetricCard label="Estoque baixo" value={metrics.lowStockCount} description="Itens críticos" variant="warning" />
            </div>

            <ProductTable products={products} lowStockThreshold={LOW_STOCK_THRESHOLD} onEdit={handleEdit} onDelete={handleDelete} />
          </div>

          <ProductForm categories={categories} marketplaces={marketplaces} onSave={handleSave} onAddCategory={handleAddCategory} selected={selectedProduct} onCancelEdit={() => setSelectedProduct(null)} />
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40">
            <h2 className="text-2xl font-semibold text-slate-900">Como usar este painel</h2>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
              <li>• Adicione produtos com SKU, categoria e marketplace para ter o controle centralizado do catálogo.</li>
              <li>• Crie categorias novas no momento do cadastro para adaptar a sua operação.</li>
              <li>• Atualize o estoque sempre que receber mercadoria para evitar vendas fora de estoque.</li>
              <li>• Edite ou exclua itens diretamente da tabela para manter a base limpa.</li>
            </ul>
          </div>

          <div className="rounded-[32px] bg-gradient-to-br from-sky-600 via-sky-500 to-cyan-500 p-8 text-white shadow-xl shadow-sky-500/20">
            <h2 className="text-2xl font-semibold">Produto pronto para escalar</h2>
            <p className="mt-4 text-sm leading-7 text-sky-100/90">
              A interface foi modernizada para oferecer visual limpo, hierarquia clara e ações rápidas. Agora seu vendedor autônomo consegue gerenciar estoque e vendas com mais velocidade.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
