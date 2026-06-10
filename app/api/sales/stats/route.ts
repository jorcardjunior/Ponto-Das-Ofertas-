import { NextResponse } from 'next/server';
import { auth } from "@/auth";
import { prisma } from '@/lib/db';
import { checkRateLimit } from '@/lib/rate-limit';

export async function GET() {
  try {
    const rateLimit = await checkRateLimit('sales-stats');
    if (rateLimit) return rateLimit;

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
    }

    const now = new Date();
    const firstOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear() + 1, 0, 0);

    // Main stats queries (no product relations)
    const [totalSales, revenueAgg, monthlySalesData] = await Promise.all([
      prisma.sale.count({ where: { userId: session.user.id, tenantId: session.user.tenantId } }),
      prisma.sale.aggregate({
        where: { userId: session.user.id, tenantId: session.user.tenantId },
        _sum: { price: true },
      }),
      prisma.sale.findMany({
        where: {
          userId: session.user.id,
          tenantId: session.user.tenantId,
          date: { gte: firstOfYear, lte: endOfYear },
        },
        select: { price: true, quantity: true, date: true },
        orderBy: { date: 'asc' },
      }),
    ]);

    const totalRevenue = Number(revenueAgg._sum.price ?? 0);

    // Profit calculation (separate, can fail without breaking main stats)
    let totalProfit = 0;
    let roi = 0;
    try {
      const allSales = await prisma.sale.findMany({
        where: { userId: session.user.id, tenantId: session.user.tenantId },
        select: { price: true, quantity: true, productId: true },
      });

      // Get products with cost data
      const productIds = [...new Set(allSales.map((s) => s.productId))];
      const products = await prisma.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true, costPrice: true, marketplaceFee: true },
      });
      const productMap = new Map(products.map((p) => [p.id, p]));

      let totalCost = 0;
      let totalFees = 0;
      for (const sale of allSales) {
        const qty = sale.quantity;
        const revenue = Number(sale.price);
        const product = productMap.get(sale.productId);
        const costPrice = product ? Number(product.costPrice) : 0;
        const feePercent = product ? Number(product.marketplaceFee) : 0;
        totalCost += costPrice * qty;
        totalFees += revenue * (feePercent / 100);
      }
      totalProfit = totalRevenue - totalCost - totalFees;
      roi = totalCost + totalFees > 0 ? (totalProfit / (totalCost + totalFees)) * 100 : 0;
    } catch (profitErr) {
      console.error('Erro ao calcular lucro (não crítico):', profitErr);
      // Profit calculation failed, return basic stats without profit
    }

    // Monthly breakdown
    const monthlyMap = new Map<string, { total: number; revenue: number }>();
    for (let m = 0; m < 12; m++) {
      const key = `${now.getFullYear()}-${String(m + 1).padStart(2, '0')}`;
      monthlyMap.set(key, { total: 0, revenue: 0 });
    }

    for (const sale of monthlySalesData) {
      const key = `${sale.date.getFullYear()}-${String(sale.date.getMonth() + 1).padStart(2, '0')}`;
      if (monthlyMap.has(key)) {
        const entry = monthlyMap.get(key)!;
        entry.total += sale.quantity;
        entry.revenue += Number(sale.price);
      }
    }

    const monthly = Array.from(monthlyMap.entries()).map(([month, data]) => ({
      month,
      total: data.total,
      revenue: data.revenue,
    }));

    const averageTicket = totalSales > 0 ? totalRevenue / totalSales : 0;

    return NextResponse.json({
      totalSales,
      totalRevenue,
      totalProfit: Math.round(totalProfit * 100) / 100,
      averageTicket: Math.round(averageTicket * 100) / 100,
      roi: Math.round(roi * 10) / 10,
      monthlySales: monthly,
    });
  } catch (error) {
    console.error('Erro na API /api/sales/stats:', error);
    return NextResponse.json(
      { error: 'Erro interno ao calcular estatísticas de vendas.' },
      { status: 500 },
    );
  }
}
