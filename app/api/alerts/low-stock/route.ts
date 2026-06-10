import { NextResponse } from 'next/server';
import { auth } from "@/auth";

import { prisma } from '@/lib/db';
import { checkRateLimit } from '@/lib/rate-limit';

export async function GET() {
  const rateLimit = await checkRateLimit('alerts-low-stock');
  if (rateLimit) return rateLimit;

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  const LOW_STOCK_THRESHOLD = 5;

  const products = await prisma.product.findMany({
    where: {
      userId: session.user.id,
      tenantId: session.user.tenantId,
      deletedAt: null,
      stock: { lte: LOW_STOCK_THRESHOLD },
    },
    select: {
      id: true,
      name: true,
      sku: true,
      stock: true,
      category: true,
    },
    orderBy: { stock: 'asc' },
  });

  return NextResponse.json({
    alerts: products,
    count: products.length,
    threshold: LOW_STOCK_THRESHOLD,
  });
}
