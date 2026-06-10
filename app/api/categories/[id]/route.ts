import { NextResponse } from 'next/server';
import { auth } from "@/auth";

import { prisma } from '@/lib/db';
import { createAuditLog } from '@/lib/audit';
import { checkRateLimit } from '@/lib/rate-limit';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const rateLimit = await checkRateLimit('categories-put');
  if (rateLimit) return rateLimit;

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const name = String(body.name ?? '').trim().slice(0, 40);
    const color = String(body.color ?? '#94a3b8').trim();

    if (!name) {
      return NextResponse.json({ error: 'Nome da categoria é obrigatório.' }, { status: 400 });
    }

  const category = await prisma.category.updateMany({
    where: { id: params.id, userId: session.user.id, tenantId: session.user.tenantId },
    data: { name, color },
  });

  if (category.count === 0) {
    return NextResponse.json({ error: 'Categoria não encontrada.' }, { status: 404 });
  }

  await createAuditLog('update', 'category', params.id, session.user.id, `Categoria atualizada: ${name}`, session.user.tenantId);

    return NextResponse.json({ id: params.id, name, color });
  } catch {
    return NextResponse.json({ error: 'Erro ao atualizar categoria.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const rateLimit = await checkRateLimit('categories-delete');
  if (rateLimit) return rateLimit;

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  try {
    const category = await prisma.category.findFirst({
      where: { id: params.id, userId: session.user.id, tenantId: session.user.tenantId },
    });

    if (!category) {
      return NextResponse.json({ error: 'Categoria não encontrada.' }, { status: 404 });
    }

    await prisma.category.delete({ where: { id: params.id } });
    await createAuditLog('delete', 'category', params.id, session.user.id, `Categoria removida: ${category.name}`, session.user.tenantId);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Erro ao remover categoria.' }, { status: 500 });
  }
}
