import { NextResponse } from 'next/server';
import { auth } from "@/auth";

import { prisma } from '@/lib/db';
import { createAuditLog } from '@/lib/audit';
import { checkRateLimit } from '@/lib/rate-limit';

export async function GET() {
  const rateLimit = await checkRateLimit('categories-get');
  if (rateLimit) return rateLimit;

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  const categories = await prisma.category.findMany({
    where: { userId: session.user.id, tenantId: session.user.tenantId },
    orderBy: { name: 'asc' },
  });

  return NextResponse.json({ categories });
}

export async function POST(request: Request) {
  const rateLimit = await checkRateLimit('categories-post');
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

      const existing = await prisma.category.findFirst({
        where: { name, userId: session.user.id, tenantId: session.user.tenantId },
      });

    if (existing) {
      return NextResponse.json({ error: 'Categoria já existe.' }, { status: 409 });
    }

      const category = await prisma.category.create({
        data: { name, color, userId: session.user.id, tenantId: session.user.tenantId },
      });

      await createAuditLog('create', 'category', category.id, session.user.id, `Categoria criada: ${category.name}`, session.user.tenantId);

    return NextResponse.json({ category }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Erro ao salvar categoria.' }, { status: 500 });
  }
}
