import { NextResponse } from 'next/server';
import { auth } from "@/auth";
import { prisma } from '@/lib/db';
import { checkRateLimit } from '@/lib/rate-limit';

function linearRegression(values: number[]): { slope: number; intercept: number } {
  const n = values.length;
  if (n < 2) return { slope: 0, intercept: values[0] || 0 };
  
  const xMean = (n - 1) / 2;
  const yMean = values.reduce((a, b) => a + b, 0) / n;
  
  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i++) {
    num += (i - xMean) * (values[i] - yMean);
    den += (i - xMean) * (i - xMean);
  }
  
  const slope = den !== 0 ? num / den : 0;
  const intercept = yMean - slope * xMean;
  
  return { slope, intercept };
}

export async function GET() {
  const rateLimit = await checkRateLimit('sales-projections');
  if (rateLimit) return rateLimit;

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  const now = new Date();
  const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
  const endOfForecast = new Date(now.getFullYear(), now.getMonth() + 4, 0);

  const sales = await prisma.sale.findMany({
    where: {
      userId: session.user.id,
      tenantId: session.user.tenantId,
      date: { gte: threeMonthsAgo },
    },
    select: {
      price: true,
      quantity: true,
      date: true,
    },
    orderBy: { date: 'asc' },
  });

  // Build monthly data (last 6 months)
  const monthMap = new Map<string, { revenue: number; sales: number }>();
  for (let m = -5; m <= 0; m++) {
    const d = new Date(now.getFullYear(), now.getMonth() + m, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    monthMap.set(key, { revenue: 0, sales: 0 });
  }

  for (const sale of sales) {
    const key = `${sale.date.getFullYear()}-${String(sale.date.getMonth() + 1).padStart(2, '0')}`;
    if (monthMap.has(key)) {
      const entry = monthMap.get(key)!;
      entry.revenue += Number(sale.price);
      entry.sales += sale.quantity;
    }
  }

  const historicalMonths = Array.from(monthMap.entries());
  const revenues = historicalMonths.map(([, d]) => d.revenue);
  const salesCounts = historicalMonths.map(([, d]) => d.sales);

  const revenueReg = linearRegression(revenues);
  const salesReg = linearRegression(salesCounts);

  // Generate forecast for next 3 months
  const forecastMonths: string[] = [];
  for (let m = 1; m <= 3; m++) {
    const d = new Date(now.getFullYear(), now.getMonth() + m, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    forecastMonths.push(key);
  }

  const nHistorical = historicalMonths.length;
  const forecast = forecastMonths.map((month, i) => {
    const x = nHistorical + i;
    const projectedRevenue = Math.max(0, revenueReg.slope * x + revenueReg.intercept);
    const projectedSales = Math.max(0, Math.round(salesReg.slope * x + salesReg.intercept));
    return { month, projectedRevenue, projectedSales };
  });

  // Confidence score based on data consistency
  const revenueVariance = revenues.length > 1
    ? revenues.reduce((a, b) => a + Math.abs(b - revenues.reduce((c, d) => c + d, 0) / revenues.length), 0) / revenues.length
    : 0;
  const avgRevenue = revenues.reduce((a, b) => a + b, 0) / Math.max(1, revenues.length);
  const confidence = Math.min(95, Math.max(30, Math.round(100 - (revenueVariance / Math.max(1, avgRevenue)) * 50)));

  return NextResponse.json({
    historical: historicalMonths.map(([month, data]) => ({ month, revenue: data.revenue, sales: data.sales })),
    forecast,
    confidence,
    trend: revenueReg.slope > 0 ? 'up' : revenueReg.slope < 0 ? 'down' : 'stable',
    growthRate: avgRevenue > 0 ? Math.round((revenueReg.slope / avgRevenue) * 100 * 10) / 10 : 0,
  });
}
