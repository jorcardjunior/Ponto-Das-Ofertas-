'use client';
import { useCallback, useEffect, useState } from 'react';
import { apiRequest, ApiError } from '../api';

export type LowStockAlert = {
  id: string;
  name: string;
  sku: string;
  stock: number;
  category: string;
};

type LowStockResponse = {
  alerts: LowStockAlert[];
  count: number;
  threshold: number;
};

export function useLowStockAlerts() {
  const [alerts, setAlerts] = useState<LowStockAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [threshold, setThreshold] = useState(5);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiRequest<LowStockResponse>('/api/alerts/low-stock');
      setAlerts(data.alerts);
      setThreshold(data.threshold);
    } catch (err) {
      if (err instanceof ApiError && err.status !== 401) {
        console.error('Erro ao carregar alertas:', err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { alerts, count: alerts.length, loading, threshold, refresh: fetch };
}
