'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';
import { cn } from '../lib/utils';

type ToastVariant = 'success' | 'error' | 'info';

type ToastItem = {
  id: string;
  message: string;
  variant: ToastVariant;
};

type ToastContextValue = {
  toast: (message: string, variant?: ToastVariant) => void;
};

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  info: AlertCircle,
};

const styleMap = {
  success: 'border-emerald-200/80 bg-emerald-50 text-emerald-800 dark:border-emerald-800/50 dark:bg-emerald-950/80 dark:text-emerald-300',
  error: 'border-red-200/80 bg-red-50 text-red-800 dark:border-red-800/50 dark:bg-red-950/80 dark:text-red-300',
  info: 'border-sky-200/80 bg-sky-50 text-sky-800 dark:border-sky-800/50 dark:bg-sky-950/80 dark:text-sky-300',
};

const iconStyleMap = {
  success: 'text-emerald-500 dark:text-emerald-400',
  error: 'text-red-500 dark:text-red-400',
  info: 'text-sky-500 dark:text-sky-400',
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string, variant: ToastVariant = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setItems((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => {
      setItems((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  function remove(id: string) {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm" role="status" aria-live="polite">
        {items.map((item) => {
          const Icon = iconMap[item.variant];
          return (
            <div
              key={item.id}
              className={cn(
                'animate-slide-in-right flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-sm',
                styleMap[item.variant],
              )}
            >
              <Icon className={cn('h-5 w-5 shrink-0', iconStyleMap[item.variant])} />
              <p className="text-sm font-medium flex-1">{item.message}</p>
              <button
                type="button"
                onClick={() => remove(item.id)}
                className="ml-1 rounded-md p-0.5 opacity-60 hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
