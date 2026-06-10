import { NextResponse } from 'next/server';
import { auth } from "@/auth";

import { prisma } from '@/lib/db';
import { checkRateLimit } from '@/lib/rate-limit';
import { createAuditLog } from '@/lib/audit';
import { z } from 'zod';

const movementSchema = z.object({
  type: z.enum(['IN', 'OUT']),
  quantity: z.number().int().positive(),
  reason: z.string().max(200).optional(),
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const rateLimit = await checkRateLimit('movements-get');
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

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const pageSize = Math.min(50, Math.max(1, Number(searchParams.get('pageSize')) || 20));

  const [data, total] = await Promise.all([
    prisma.stockMovement.findMany({
      where: { productId: params.id, tenantId: session.user.tenantId },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.stockMovement.count({ where: { productId: params.id, tenantId: session.user.tenantId } }),
  ]);

  return NextResponse.json({
    data,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  });
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const rateLimit = await checkRateLimit('movements-post');
  if (rateLimit) return rateLimit;

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = movementSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dados inválidos.', details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

  const product = await prisma.product.findFirst({
    where: { id: params.id, userId: session.user.id, tenantId: session.user.tenantId },
  });

  if (!product) {
    return NextResponse.json({ error: 'Produto não encontrado.' }, { status: 404 });
  }

  if (parsed.data.type === 'OUT' && product.stock < parsed.data.quantity) {
    return NextResponse.json(
      { error: `Estoque insuficiente. Disponível: ${product.stock}, solicitado: ${parsed.data.quantity}.` },
      { status: 400 },
    );
  }

  const stockChange = parsed.data.type === 'IN' ? parsed.data.quantity : -parsed.data.quantity;

  const [movement] = await prisma.$transaction([
    prisma.stockMovement.create({
      data: {
        productId: params.id,
        type: parsed.data.type,
        quantity: parsed.data.quantity,
        reason: parsed.data.reason ?? null,
        userId: session.user.id,
        tenantId: session.user.tenantId,
      },
    }),
    prisma.product.update({
      where: { id: params.id },
      data: { stock: { increment: stockChange } },
    }),
  ]);

  const typeLabel = parsed.data.type === 'IN' ? 'Entrada' : 'Saída';
  await createAuditLog('create', 'stock_movement', movement.id, session.user.id,
    `${typeLabel} de estoque: ${product.name} ${parsed.data.type === 'IN' ? '+' : '-'}${parsed.data.quantity}`, session.user.tenantId);

    return NextResponse.json({ movement }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Erro ao registrar movimentação.' }, { status: 500 });
  }
}
