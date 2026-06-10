'use client';

import { X, AlertTriangle, Package } from 'lucide-react';
import type { LowStockAlert } from '../lib/hooks/useLowStockAlerts';

type LowStockAlertPanelProps = {
  open: boolean;
  alerts: LowStockAlert[];
  threshold: number;
  onClose: () => void;
};

export function LowStockAlertPanel({ open, alerts, threshold, onClose }: LowStockAlertPanelProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl border border-border/50 bg-card shadow-xl animate-fade-in">
        <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <h2 className="text-lg font-semibold text-foreground">Alertas de Estoque Baixo</h2>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-muted-foreground mb-4">
            {alerts.length === 0
              ? `Nenhum produto com estoque ≤ ${threshold}. Tudo ok!`
              : `${alerts.length} produto${alerts.length !== 1 ? 's' : ''} com estoque ≤ ${threshold} unidades.`}
          </p>

          {alerts.length > 0 && (
            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between rounded-lg border border-border/30 bg-background px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10">
                      <Package className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{alert.name}</p>
                      <p className="text-xs text-muted-foreground">SKU: {alert.sku} • {alert.category}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-lg bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-950/40 dark:text-amber-300">
                    {alert.stock} un
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
