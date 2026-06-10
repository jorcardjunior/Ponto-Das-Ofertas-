'use client';
import { useCallback, useEffect, useState } from 'react';
import { apiRequest, ApiError } from '../api';
import type { Sale, SaleStats } from '../types';

type RegisterSaleInput = {
  productId: string;
  quantity: number;
  price: number;
  channel: string;
  date?: string;
};

export function useSales() {
  const [recentSales, setRecentSales] = useState<Sale[]>([]);
  const [stats, setStats] = useState<SaleStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const data = await apiRequest<SaleStats>('/api/sales/stats');
      setStats(data);
    } catch (err) {
      if (err instanceof ApiError && err.status !== 401) {
        console.error('Erro ao carregar stats de vendas:', err.message);
      }
    }
  }, []);

  const fetchRecent = useCallback(async () => {
    try {
      const res = await apiRequest<{ data: Sale[] }>('/api/sales', {
        params: { page: 1, pageSize: 5 },
      });
      setRecentSales(res.data);
    } catch (err) {
      if (err instanceof ApiError && err.status !== 401) {
        console.error('Erro ao carregar vendas recentes:', err.message);
      }
    }
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    await Promise.all([fetchStats(), fetchRecent()]);
    setLoading(false);
  }, [fetchStats, fetchRecent]);

  useEffect(() => {
    load();
  }, [load]);

  async function registerSale(input: RegisterSaleInput) {
    const res = await apiRequest<{ sale: Sale }>('/api/sales', {
      method: 'POST',
      body: input,
    });
    setRecentSales((current) => [res.sale, ...current.slice(0, 4)]);
    await fetchStats();
    return res.sale;
  }

  return { recentSales, stats, loading, registerSale, refresh: load };
}
