import { NextResponse } from 'next/server';
import { auth } from "@/auth";
import { prisma } from '@/lib/db';
import { createAuditLog } from '@/lib/audit';
import { checkRateLimit } from '@/lib/rate-limit';

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const rateLimit = await checkRateLimit(`products-delete-${params.id}`);
  if (rateLimit) return rateLimit;

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  const product = await prisma.product.findFirst({
    where: { id: params.id, userId: session.user.id, tenantId: session.user.tenantId },
  });

  if (!product) {
    return NextResponse.json({ error: 'Produto não encontrado.' }, { status: 404 });
  }

  await prisma.product.delete({ where: { id: params.id } });
  await createAuditLog('delete', 'product', params.id, session.user.id, `Produto removido: ${product.name}`, session.user.tenantId);

  return NextResponse.json({ ok: true });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const rateLimit = await checkRateLimit(`products-put-${params.id}`);
  if (rateLimit) return rateLimit;

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  try {
    const body = await request.json();
  const existing = await prisma.product.findFirst({
    where: { id: params.id, userId: session.user.id, tenantId: session.user.tenantId },
  });

    if (!existing) {
      return NextResponse.json({ error: 'Produto não encontrado.' }, { status: 404 });
    }

    const newStock = Number(body.stock ?? existing.stock);
    const stockDiff = newStock - existing.stock;

    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name: String(body.name ?? existing.name).trim().slice(0, 100),
        sku: String(body.sku ?? existing.sku).trim().slice(0, 30),
        category: String(body.category ?? existing.category).trim().slice(0, 40),
        marketplace: String(body.marketplace ?? existing.marketplace),
        price: Number(body.price ?? existing.price),
        costPrice: body.costPrice !== undefined ? Number(body.costPrice) : Number(existing.costPrice),
        marketplaceFee: body.marketplaceFee !== undefined ? Number(body.marketplaceFee) : Number(existing.marketplaceFee),
        stock: newStock,
        supplierId: body.supplierId !== undefined ? body.supplierId : existing.supplierId,
      },
    });

    if (stockDiff !== 0) {
      await prisma.stockMovement.create({
        data: {
          productId: params.id,
          type: stockDiff > 0 ? 'IN' : 'OUT',
          quantity: Math.abs(stockDiff),
          reason: 'Ajuste manual',
          userId: session.user.id,
          tenantId: session.user.tenantId,
        },
      });
    }

    await createAuditLog('update', 'product', product.id, session.user.id, `Produto atualizado: ${product.name}`, session.user.tenantId);

    return NextResponse.json({ product: { ...product, price: Number(product.price), costPrice: Number(product.costPrice), marketplaceFee: Number(product.marketplaceFee) } });
  } catch {
    return NextResponse.json({ error: 'Erro ao atualizar produto.' }, { status: 500 });
  }
}
