'use client';
import { useCallback, useEffect, useState } from 'react';
import { apiRequest } from '../api';
import type { Supplier } from '../types';

export function useSuppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSuppliers = useCallback(async () => {
    try {
      const res = await apiRequest<{ suppliers: Supplier[] }>('/api/suppliers');
      setSuppliers(res.suppliers);
    } catch {
      /* silently fail */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSuppliers(); }, [fetchSuppliers]);

  async function create(data: { name: string; contact?: string; phone?: string; email?: string }) {
    const res = await apiRequest<{ supplier: Supplier }>('/api/suppliers', {
      method: 'POST',
      body: data,
    });
    await fetchSuppliers();
    return true;
  }

  async function remove(id: string) {
    await apiRequest(`/api/suppliers/${id}`, { method: 'DELETE' });
    setSuppliers((prev) => prev.filter((s) => s.id !== id));
    return true;
  }

  return { suppliers, loading, create, remove, refresh: fetchSuppliers };
}
