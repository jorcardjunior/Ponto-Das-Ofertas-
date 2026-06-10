import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductTable } from '../ProductTable';
import type { Product } from '../../lib/types';

const sample: Product[] = [
  { id: '1', name: 'Camiseta', sku: 'SHP-AAA', category: 'Roupas', marketplace: 'Shopee', price: 49.9, stock: 3 },
  { id: '2', name: 'Tênis', sku: 'MLV-BBB', category: 'Esportes', marketplace: 'Mercado Livre', price: 199, stock: 25 },
];

describe('ProductTable', () => {
  it('shows empty state when there are no products', () => {
    render(<ProductTable products={[]} lowStockThreshold={5} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Nenhum produto cadastrado')).toBeInTheDocument();
  });

  it('renders all products with prices formatted as BRL', () => {
    render(<ProductTable products={sample} lowStockThreshold={5} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Camiseta')).toBeInTheDocument();
    expect(screen.getByText('R$ 49.90')).toBeInTheDocument();
    expect(screen.getByText('R$ 199.00')).toBeInTheDocument();
  });

  it('flags products with low stock', () => {
    render(<ProductTable products={sample} lowStockThreshold={5} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('calls onEdit and onDelete', () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    render(<ProductTable products={sample} lowStockThreshold={5} onEdit={onEdit} onDelete={onDelete} />);

    fireEvent.click(screen.getAllByTitle('Editar')[0]);
    expect(onEdit).toHaveBeenCalledWith(sample[0]);

    fireEvent.click(screen.getAllByTitle('Excluir')[0]);
    expect(onDelete).toHaveBeenCalledWith(sample[0].id);
  });
});
