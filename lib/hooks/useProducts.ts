'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { apiRequest, ApiError } from '../api';
import type { Product } from '../types';

type PaginatedResponse = {
  data: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

type ProductFilters = {
  search?: string;
  sort?: string;
  dir?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
};

export function useProducts(filters?: ProductFilters) {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(filters?.page ?? 1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const prevFiltersRef = useRef('');

  const fetchProducts = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const res = await apiRequest<PaginatedResponse>('/api/products', {
        params: {
          page,
          pageSize: filters?.pageSize ?? 10,
          search: filters?.search,
          sort: filters?.sort,
          dir: filters?.dir,
        },
      });
      setProducts(res.data);
      setTotal(res.total);
      setTotalPages(res.totalPages);
      setCurrentPage(res.page);
      setError(null);
    } catch (err) {
      if (err instanceof ApiError && err.status !== 401) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [filters?.pageSize, filters?.search, filters?.sort, filters?.dir]);

  const filtersKey = JSON.stringify(filters ?? {});
  useEffect(() => {
    if (prevFiltersRef.current !== filtersKey) {
      prevFiltersRef.current = filtersKey;
      const page = filters?.page ?? 1;
      setCurrentPage(page);
      fetchProducts(page);
    }
  }, [filtersKey, fetchProducts, filters?.page]);

  async function addOrUpdate(product: Product, selectedId?: string) {
    if (selectedId) {
      const res = await apiRequest<{ product: Product }>(`/api/products/${selectedId}`, {
        method: 'PUT',
        body: product,
      });
      setProducts((current) => current.map((p) => (p.id === selectedId ? res.product : p)));
    } else {
      const res = await apiRequest<{ product: Product }>('/api/products', {
        method: 'POST',
        body: product,
      });
      setProducts((current) => [res.product, ...current]);
    }
  }

  async function remove(id: string) {
    await apiRequest(`/api/products/${id}`, { method: 'DELETE' });
    setProducts((current) => current.filter((p) => p.id !== id));
  }

  return { products, total, totalPages, currentPage, loading, error, addOrUpdate, remove, refresh: () => fetchProducts(currentPage) };
}
