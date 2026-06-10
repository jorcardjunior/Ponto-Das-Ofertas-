export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  marketplace: string;
  price: number;
  costPrice?: number;
  marketplaceFee?: number;
  stock: number;
  supplierId?: string | null;
  tenantId?: string;
  // Health / BI fields
  health?: 'critical' | 'regular' | 'healthy';
  grossProfit?: number;
  grossMargin?: number;
  totalRevenue?: number;
  totalSold?: number;
  salesVelocity?: number;
  turnoverRate?: number;
  daysUntilStockout?: number;
  suggestedReorder?: number;
};

export type Category = {
  id?: string;
  name: string;
  color: string;
  tenantId?: string;
};

export type Supplier = {
  id: string;
  name: string;
  contact: string | null;
  phone: string | null;
  email: string | null;
  productCount?: number;
  tenantId?: string;
};

export type User = {
  id: string;
  email: string;
  tenantId?: string;
};

export type AuditLogEntry = {
  id: string;
  action: string;
  entity: string;
  entityId: string | null;
  details: string | null;
  userId: string;
  createdAt: string;
};

export type Sale = {
  id: string;
  productId: string;
  product?: { id: string; name: string; sku: string };
  quantity: number;
  price: number;
  channel: string;
  date: string;
  tenantId?: string;
};

export type StockMovement = {
  id: string;
  productId: string;
  product?: Product;
  type: 'IN' | 'OUT';
  quantity: number;
  reason: string | null;
  userId: string;
  tenantId?: string;
  createdAt: string;
};

export type SaleStats = {
  totalSales: number;
  totalRevenue: number;
  totalProfit?: number;
  averageTicket?: number;
  roi?: number;
  monthlySales: { month: string; total: number; revenue: number }[];
};

export type PaginatedResult<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type HealthSummary = {
  totalProducts: number;
  criticalCount: number;
  regularCount: number;
  healthyCount: number;
  totalRevenue: number;
  totalProfit: number;
  avgMargin: number;
  avgTurnover: number;
};

export type ProjectionData = {
  historical: { month: string; revenue: number; sales: number }[];
  forecast: { month: string; projectedRevenue: number; projectedSales: number }[];
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  growthRate: number;
};

export type HeatmapData = {
  heatmap: { hour: number; sales: number; revenue: number; orders: number; intensity: number }[];
  maxRevenue: number;
  maxSales: number;
};
