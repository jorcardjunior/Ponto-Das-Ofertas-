import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MetricCard } from '../MetricCard';

describe('MetricCard', () => {
  it('renders label, value and description', () => {
    render(<MetricCard label="Produtos" value={42} description="Itens cadastrados" />);
    expect(screen.getByText('Produtos')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('Itens cadastrados')).toBeInTheDocument();
  });

  it('renders string values', () => {
    render(<MetricCard label="Valor" value="R$ 1.234,56" description="Total" />);
    expect(screen.getByText('R$ 1.234,56')).toBeInTheDocument();
  });
});
