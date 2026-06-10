'use client';

type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  marketplace: string;
  price: number;
  stock: number;
};

type ProductTableProps = {
  products: Product[];
  lowStockThreshold: number;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
};

export function ProductTable({ products, lowStockThreshold, onEdit, onDelete }: ProductTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/40">
      <div className="px-6 py-5 border-b border-slate-200 bg-slate-50">
        <h2 className="text-lg font-semibold text-slate-900">Produtos cadastrados</h2>
        <p className="mt-1 text-sm text-slate-500">Gerencie itens, categorias e controle o estoque em um painel único.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr className="bg-slate-100 text-slate-700">
              <th className="px-5 py-4 font-medium">Produto</th>
              <th className="px-5 py-4 font-medium">Marketplace</th>
              <th className="px-5 py-4 font-medium">Categoria</th>
              <th className="px-5 py-4 font-medium">Preço</th>
              <th className="px-5 py-4 font-medium">Estoque</th>
              <th className="px-5 py-4 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-sm text-slate-500">
                  Nenhum produto cadastrado ainda.
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const lowStock = product.stock <= lowStockThreshold;
                return (
                  <tr key={product.id} className="border-b border-slate-200 last:border-b-0">
                    <td className="px-5 py-4">
                      <div className="font-medium text-slate-900">{product.name}</div>
                      <div className="text-xs text-slate-500">SKU: {product.sku}</div>
                    </td>
                    <td className="px-5 py-4 text-slate-700">{product.marketplace}</td>
                    <td className="px-5 py-4 text-slate-700">{product.category}</td>
                    <td className="px-5 py-4 text-slate-700">R$ {product.price.toFixed(2)}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${lowStock ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {product.stock} em estoque
                      </span>
                    </td>
                    <td className="px-5 py-4 space-x-2">
                      <button onClick={() => onEdit(product)} className="rounded-2xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-700">
                        Editar
                      </button>
                      <button onClick={() => onDelete(product.id)} className="rounded-2xl bg-rose-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-rose-600">
                        Excluir
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
