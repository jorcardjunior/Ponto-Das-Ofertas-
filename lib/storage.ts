import type { Category, Product, Supplier } from './types';

const STORAGE_PREFIX = 'promptfyos';

const isBrowser = () => typeof window !== 'undefined';

function read<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(`${STORAGE_PREFIX}-${key}`);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(`${STORAGE_PREFIX}-${key}`, JSON.stringify(value));
  } catch {
    /* ignore quota or serialization errors */
  }
}

export const storage = {
  loadProducts: (): Product[] => read<Product[]>('products', []),
  saveProducts: (products: Product[]): void => write('products', products),

  loadCategories: (): Category[] | null => read<Category[] | null>('categories', null),
  saveCategories: (categories: Category[]): void => write('categories', categories),

  loadUserId: (): string | null => read<string | null>('user-id', null),
  saveUserId: (id: string | null): void => write('user-id', id),

  loadUserEmail: (): string | null => read<string | null>('user-email', null),
  saveUserEmail: (email: string | null): void => write('user-email', email),

  loadSuppliers: (): Supplier[] => read<Supplier[]>('suppliers', []),
  saveSuppliers: (suppliers: Supplier[]): void => write('suppliers', suppliers),

  clear: (): void => {
    if (!isBrowser()) return;
    ['products', 'categories', 'user-id', 'user-email', 'suppliers'].forEach((k) => {
      window.localStorage.removeItem(`${STORAGE_PREFIX}-${k}`);
    });
  },
};
