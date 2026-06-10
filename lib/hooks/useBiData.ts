'use client';
import { useCallback, useEffect, useState } from 'react';
import { apiRequest, ApiError } from '../api';
import type { HealthSummary, ProjectionData, HeatmapData, SaleStats } from '../types';

export function useBiData() {
  const [health, setHealth] = useState<HealthSummary | null>(null);
  const [projections, setProjections] = useState<ProjectionData | null>(null);
  const [heatmap, setHeatmap] = useState<HeatmapData | null>(null);
  const [stats, setStats] = useState<SaleStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [healthData, projData, heatData, statsData] = await Promise.all([
        apiRequest<{ summary: HealthSummary }>('/api/products/health').then((r) => r.summary).catch(() => null),
        apiRequest<ProjectionData>('/api/sales/projections').catch(() => null),
        apiRequest<HeatmapData>('/api/sales/heatmap').catch(() => null),
        apiRequest<SaleStats>('/api/sales/stats').catch(() => null),
      ]);
      setHealth(healthData);
      setProjections(projData);
      setHeatmap(heatData);
      setStats(statsData);
    } catch (err) {
      if (err instanceof ApiError && err.status !== 401) {
        console.error('Erro ao carregar dados BI:', err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  return { health, projections, heatmap, stats, loading, refresh: fetchAll };
}
