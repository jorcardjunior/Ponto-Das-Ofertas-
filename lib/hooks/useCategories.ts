'use client';
import { useCallback, useEffect, useState } from 'react';
import { apiRequest, ApiError } from '../api';
import type { Category } from '../types';

type CategoriesResponse = { categories: Category[] };

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await apiRequest<CategoriesResponse>('/api/categories');
      setCategories(res.categories);
      setError(null);
    } catch (err) {
      if (err instanceof ApiError && err.status !== 401) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  async function addCategory(category: Category) {
    if (categories.some((c) => c.name.toLowerCase() === category.name.toLowerCase())) {
      return;
    }
    const res = await apiRequest<{ category: Category }>('/api/categories', {
      method: 'POST',
      body: category,
    });
    setCategories((current) => [res.category, ...current]);
  }

  async function removeCategory(idOrName: string) {
    const category = categories.find((c) => c.id === idOrName || c.name === idOrName);
    if (!category?.id) return;
    await apiRequest(`/api/categories/${category.id}`, { method: 'DELETE' });
    setCategories((current) => current.filter((c) => c.id !== category.id));
  }

  return { categories, loading, error, addCategory, removeCategory, refresh: fetchCategories };
}
