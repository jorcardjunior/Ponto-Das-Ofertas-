import { describe, it, expect, beforeEach } from 'vitest';
import { storage } from '../storage';
import type { Product, Category, User } from '../types';

describe('storage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('returns fallback when nothing is stored', () => {
    expect(storage.loadProducts()).toEqual([]);
    expect(storage.loadCategories()).toBeNull();
    expect(storage.loadUserId()).toBeNull();
    expect(storage.loadUserEmail()).toBeNull();
  });

  it('persists and loads products', () => {
    const products: Product[] = [
      { id: '1', name: 'Camiseta', sku: 'SHP-ABC', category: 'Roupas', marketplace: 'Shopee', price: 49.9, stock: 10 },
    ];
    storage.saveProducts(products);
    expect(storage.loadProducts()).toEqual(products);
  });

  it('persists and loads categories', () => {
    const categories: Category[] = [{ name: 'Geral', color: '#94a3b8' }];
    storage.saveCategories(categories);
    expect(storage.loadCategories()).toEqual(categories);
  });

  it('persists and loads user', () => {
    const user: User = { id: 'usr-1', email: 'test@example.com' };
    storage.saveUserId(user.id);
    storage.saveUserEmail(user.email);
    expect(storage.loadUserId()).toBe(user.id);
    expect(storage.loadUserEmail()).toBe(user.email);
  });

  it('handles corrupted JSON gracefully', () => {
    window.localStorage.setItem('promptfyos-products', '{not json');
    expect(storage.loadProducts()).toEqual([]);
  });

  it('clears all keys', () => {
    storage.saveProducts([]);
    storage.saveCategories([]);
    storage.saveUserId('x');
    storage.saveUserEmail('y@z.com');
    storage.clear();
    expect(storage.loadProducts()).toEqual([]);
    expect(storage.loadCategories()).toBeNull();
    expect(storage.loadUserId()).toBeNull();
    expect(storage.loadUserEmail()).toBeNull();
  });
});
