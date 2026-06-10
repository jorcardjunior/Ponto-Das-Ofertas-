import { NextResponse } from 'next/server';
import { auth } from "@/auth";
import { prisma } from '@/lib/db';
import { checkRateLimit } from '@/lib/rate-limit';

export async function GET() {
  const rateLimit = await checkRateLimit('products-health');
  if (rateLimit) return rateLimit;

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  const products = await prisma.product.findMany({
    where: {
      userId: session.user.id,
      tenantId: session.user.tenantId,
      deletedAt: null,
    },
    include: {
      sales: { select: { quantity: true, price: true, date: true } },
      movements: { select: { type: true, quantity: true, createdAt: true } },
    },
  });

  const now = new Date();
  const LOW_STOCK_THRESHOLD = 5;

  const healthData = products.map((product) => {
    const prodWithRel = product as any;
    const totalSold = prodWithRel.sales.reduce((sum: number, s: any) => sum + s.quantity, 0);
    const totalRevenue = prodWithRel.sales.reduce((sum: number, s: any) => sum + Number(s.price), 0);
    const costPrice = Number(product.costPrice);
    const marketplaceFee = Number(product.marketplaceFee);
    const totalCost = totalSold * costPrice;
    const totalFees = totalRevenue * (marketplaceFee / 100);
    const grossProfit = totalRevenue - totalCost - totalFees;
    const grossMargin = totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0;

    // Sales velocity: units sold per day (last 30 days)
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const recentSales = (product as any).sales.filter((s: any) => s.date >= thirtyDaysAgo);
    const recentSold = recentSales.reduce((sum: number, s: any) => sum + s.quantity, 0);
    const salesVelocity = recentSold / 30;

    // Inventory turnover
    const avgStock = product.stock + totalSold > 0 ? product.stock / Math.max(1, totalSold) : 0;
    const turnoverRate = totalSold > 0 ? totalSold / Math.max(1, product.stock) : 0;

    // Reorder suggestion
    const daysUntilStockout = salesVelocity > 0 ? product.stock / salesVelocity : 999;
    const suggestedReorder = salesVelocity > 0 ? Math.ceil(salesVelocity * 14) - product.stock : 0;

    // Health status
    let health: 'critical' | 'regular' | 'healthy' = 'healthy';
    if (product.stock <= LOW_STOCK_THRESHOLD || grossMargin < 10) health = 'critical';
    else if (product.stock <= LOW_STOCK_THRESHOLD * 3 || grossMargin < 30) health = 'regular';

    return {
      id: product.id,
      name: product.name,
      sku: product.sku,
      stock: product.stock,
      price: Number(product.price),
      costPrice: Number(product.costPrice),
      marketplaceFee: Number(product.marketplaceFee),
      grossProfit,
      grossMargin: Math.round(grossMargin * 10) / 10,
      totalRevenue,
      totalSold,
      salesVelocity: Math.round(salesVelocity * 100) / 100,
      turnoverRate: Math.round(turnoverRate * 10) / 10,
      daysUntilStockout: Math.round(daysUntilStockout),
      suggestedReorder: Math.max(0, suggestedReorder),
      health,
    };
  });

  const summary = {
    totalProducts: healthData.length,
    criticalCount: healthData.filter((h) => h.health === 'critical').length,
    regularCount: healthData.filter((h) => h.health === 'regular').length,
    healthyCount: healthData.filter((h) => h.health === 'healthy').length,
    totalRevenue: healthData.reduce((sum, h) => sum + h.totalRevenue, 0),
    totalProfit: healthData.reduce((sum, h) => sum + h.grossProfit, 0),
    avgMargin: healthData.length > 0
      ? healthData.reduce((sum, h) => sum + h.grossMargin, 0) / healthData.length
      : 0,
    avgTurnover: healthData.length > 0
      ? healthData.reduce((sum, h) => sum + h.turnoverRate, 0) / healthData.length
      : 0,
  };

  return NextResponse.json({ products: healthData, summary });
}
