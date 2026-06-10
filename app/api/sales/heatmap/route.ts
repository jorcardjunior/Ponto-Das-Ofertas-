import { NextResponse } from 'next/server';
import { auth } from "@/auth";
import { prisma } from '@/lib/db';
import { checkRateLimit } from '@/lib/rate-limit';

export async function GET() {
  const rateLimit = await checkRateLimit('sales-heatmap');
  if (rateLimit) return rateLimit;

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  const sales = await prisma.sale.findMany({
    where: {
      userId: session.user.id,
      tenantId: session.user.tenantId,
    },
    select: {
      quantity: true,
      price: true,
      date: true,
    },
  });

  // Build hour density: 0-23h
  const hourMap = new Map<number, { sales: number; revenue: number; count: number }>();
  for (let h = 0; h < 24; h++) {
    hourMap.set(h, { sales: 0, revenue: 0, count: 0 });
  }

  for (const sale of sales) {
    const hour = sale.date.getHours();
    const entry = hourMap.get(hour)!;
    entry.sales += sale.quantity;
    entry.revenue += Number(sale.price);
    entry.count += 1;
  }

  const heatmap = Array.from(hourMap.entries()).map(([hour, data]) => ({
    hour,
    sales: data.sales,
    revenue: data.revenue,
    orders: data.count,
    intensity: Math.min(1, data.count / Math.max(1, Math.max(...Array.from(hourMap.values()).map((d) => d.count)))),
  }));

  const maxRevenue = Math.max(...heatmap.map((h) => h.revenue), 1);
  const maxSales = Math.max(...heatmap.map((h) => h.sales), 1);

  return NextResponse.json({ heatmap, maxRevenue, maxSales });
}
