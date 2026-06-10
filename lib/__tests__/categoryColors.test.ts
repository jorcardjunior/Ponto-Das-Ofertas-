import { describe, it, expect } from 'vitest';
import { getCategoryColorClass, CATEGORY_COLOR_CLASSES } from '../categoryColors';

describe('categoryColors', () => {
  it('returns the mapped tailwind class for known colors', () => {
    expect(getCategoryColorClass('#0ea5e9')).toBe('bg-sky-500');
    expect(getCategoryColorClass('#10b981')).toBe('bg-emerald-500');
  });

  it('falls back to slate-400 for unknown colors', () => {
    expect(getCategoryColorClass('#000000')).toBe('bg-slate-400');
    expect(getCategoryColorClass('')).toBe('bg-slate-400');
  });

  it('has no duplicate keys in CATEGORY_COLOR_CLASSES', () => {
    const values = Object.values(CATEGORY_COLOR_CLASSES);
    const unique = new Set(values);
    expect(unique.size).toBe(values.length);
  });
});
