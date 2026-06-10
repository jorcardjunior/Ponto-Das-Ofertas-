'use client';

import { Download, Upload } from 'lucide-react';
import { useToast } from './Toast';

export function ImportExportBar() {
  const { toast } = useToast();

  return (
    <div className="animate-fade-in mb-8 flex flex-wrap items-center justify-between gap-3" style={{ animationDelay: '0.05s' }}>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => window.open('/api/products/export', '_blank')}
          className="inline-flex items-center gap-2 rounded-xl border border-input bg-background px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-accent hover:shadow active:scale-[0.97]"
        >
          <Download className="h-4 w-4" />
          Exportar CSV
        </button>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-input bg-background px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-accent hover:shadow active:scale-[0.97]">
          <Upload className="h-4 w-4" />
          Importar CSV
          <input
            type="file"
            accept=".csv"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const formData = new FormData();
              formData.append('file', file);
              try {
                const res = await fetch('/api/products/import', { method: 'POST', body: formData });
                const json = await res.json();
                if (res.ok) {
                  toast(`${json.imported} produto(s) importado(s)!`, 'success');
                  window.location.reload();
                } else {
                  toast(json.error || 'Erro na importação.', 'error');
                }
              } catch {
                toast('Erro ao importar.', 'error');
              }
              e.target.value = '';
            }}
          />
        </label>
      </div>
    </div>
  );
}
