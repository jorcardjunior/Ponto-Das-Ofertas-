import { NextResponse } from 'next/server';
import { auth } from "@/auth";

import { prisma } from '@/lib/db';
import { createAuditLog } from '@/lib/audit';
import { checkRateLimit } from '@/lib/rate-limit';
import { z } from 'zod';

const saleSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().positive(),
  price: z.number().nonnegative(),
  channel: z.string().min(1).max(50),
  date: z.string().datetime().optional(),
});

export async function GET(request: Request) {
  const rateLimit = await checkRateLimit('sales-get');
  if (rateLimit) return rateLimit;

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const pageSize = Math.min(50, Math.max(1, Number(searchParams.get('pageSize')) || 10));
  const productId = searchParams.get('productId');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  const where: Record<string, unknown> = { userId: session.user.id, tenantId: session.user.tenantId };
  if (productId) where.productId = productId;
  if (startDate || endDate) {
    const dateFilter: Record<string, Date> = {};
    if (startDate) dateFilter.gte = new Date(startDate);
    if (endDate) dateFilter.lte = new Date(endDate);
    where.date = dateFilter;
  }

  const [data, total] = await Promise.all([
    prisma.sale.findMany({
      where,
      orderBy: { date: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { product: { select: { id: true, name: true, sku: true } } },
    }),
    prisma.sale.count({ where }),
  ]);

  return NextResponse.json({
    data,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  });
}

export async function POST(request: Request) {
  const rateLimit = await checkRateLimit('sales-post');
  if (rateLimit) return rateLimit;

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = saleSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dados inválidos.', details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const product = await prisma.product.findFirst({
    where: { id: parsed.data.productId, userId: session.user.id, tenantId: session.user.tenantId },
  });

  if (!product) {
    return NextResponse.json({ error: 'Produto não encontrado.' }, { status: 404 });
  }

  if (product.stock < parsed.data.quantity) {
    return NextResponse.json(
      { error: `Estoque insuficiente. Disponível: ${product.stock}, solicitado: ${parsed.data.quantity}.` },
      { status: 400 },
    );
  }

  const [sale] = await prisma.$transaction([
    prisma.sale.create({
      data: {
        productId: parsed.data.productId,
        quantity: parsed.data.quantity,
        price: parsed.data.price,
        channel: parsed.data.channel,
        date: parsed.data.date ? new Date(parsed.data.date) : new Date(),
        userId: session.user.id,
        tenantId: session.user.tenantId,
      },
    }),
    prisma.product.update({
      where: { id: parsed.data.productId },
      data: { stock: { decrement: parsed.data.quantity } },
    }),
  ]);

  await createAuditLog('create', 'sale', sale.id, session.user.id,
    `Venda registrada: ${product.name} x${parsed.data.quantity} - R$ ${parsed.data.price.toFixed(2)} em ${parsed.data.channel}`, session.user.tenantId);

    return NextResponse.json({ sale }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Erro ao registrar venda.' }, { status: 500 });
  }
}
