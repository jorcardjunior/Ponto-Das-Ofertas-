'use client';
import { useCallback, useEffect, useState } from 'react';
import { apiRequest, ApiError } from '../api';
import type { StockMovement } from '../types';

type RegisterMovementInput = {
  type: 'IN' | 'OUT';
  quantity: number;
  reason?: string;
};

export function useStockMovements(productId: string | null) {
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const fetch = useCallback(async () => {
    if (!productId) { setMovements([]); return; }
    setLoading(true);
    try {
      const res = await apiRequest<{ data: StockMovement[]; total: number }>(
        `/api/products/${productId}/movements`,
        { params: { page: 1, pageSize: 50 } },
      );
      setMovements(res.data);
      setTotal(res.total);
    } catch (err) {
      if (err instanceof ApiError && err.status !== 401) {
        console.error('Erro ao carregar movimentações:', err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => { fetch(); }, [fetch]);

  async function registerMovement(input: RegisterMovementInput) {
    if (!productId) throw new Error('Nenhum produto selecionado');
    const res = await apiRequest<{ movement: StockMovement }>(
      `/api/products/${productId}/movements`,
      { method: 'POST', body: input },
    );
    setMovements((current) => [res.movement, ...current]);
    setTotal((t) => t + 1);
    return res.movement;
  }

  return { movements, total, loading, registerMovement, refresh: fetch };
}
