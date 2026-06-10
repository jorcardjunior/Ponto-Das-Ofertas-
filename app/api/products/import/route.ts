import { NextResponse } from 'next/server';
import { auth } from "@/auth";

import { prisma } from '@/lib/db';
import { createAuditLog } from '@/lib/audit';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
  const rateLimit = await checkRateLimit('products-import');
  if (rateLimit) return rateLimit;

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    if (!file) {
      return NextResponse.json({ error: 'Arquivo não enviado.' }, { status: 400 });
    }

    const text = await file.text();
    const lines = text.split('\n').filter(Boolean);
    if (lines.length < 2) {
      return NextResponse.json({ error: 'Arquivo vazio.' }, { status: 400 });
    }

    const [, ...dataLines] = lines;
    let imported = 0;

    for (const line of dataLines) {
      const parts = line.split(',').map((s) => s.replace(/^"|"$/g, '').trim());
      if (parts.length < 6) continue;

      const [name, sku, category, marketplace, priceStr, stockStr] = parts;
      const price = Number(priceStr);
      const stock = Number(stockStr);
      if (!name || !sku || Number.isNaN(price) || Number.isNaN(stock)) continue;

      await prisma.product.create({
        data: {
          name: name.slice(0, 100),
          sku: sku.slice(0, 30),
          category: category.slice(0, 40) || 'Geral',
          marketplace: marketplace || 'Shopee',
          price: Math.max(0, price),
          stock: Math.max(0, Math.round(stock)),
          userId: session.user.id,
          tenantId: session.user.tenantId,
        },
      });
      imported++;
    }

    await createAuditLog('create', 'product', null, session.user.id, `Importação CSV: ${imported} produtos`, session.user.tenantId);

    return NextResponse.json({ imported });
  } catch {
    return NextResponse.json({ error: 'Erro ao importar CSV.' }, { status: 500 });
  }
}
