import { NextResponse } from 'next/server';
import { auth } from "@/auth";

import { prisma } from '@/lib/db';
import { checkRateLimit } from '@/lib/rate-limit';

export async function GET() {
  const rateLimit = await checkRateLimit('products-export');
  if (rateLimit) return rateLimit;

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  const products = await prisma.product.findMany({
    where: { userId: session.user.id, tenantId: session.user.tenantId },
    orderBy: { name: 'asc' },
    include: { supplier: { select: { name: true } } },
  });

  const header = 'nome,sku,categoria,marketplace,preco,estoque,fornecedor\n';
  const rows = products
    .map(
      (p) =>
        `"${p.name}","${p.sku}","${p.category}","${p.marketplace}",${p.price},${p.stock},"${p.supplier?.name ?? ''}"`,
    )
    .join('\n');

  return new NextResponse(header + rows, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="produtos.csv"',
    },
  });
}
