import { NextResponse } from 'next/server';
import { auth } from "@/auth";

import { prisma } from '@/lib/db';
import { createAuditLog } from '@/lib/audit';
import { checkRateLimit } from '@/lib/rate-limit';

export async function GET() {
  const rateLimit = await checkRateLimit('suppliers-get');
  if (rateLimit) return rateLimit;

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  const suppliers = await prisma.supplier.findMany({
    where: { userId: session.user.id, tenantId: session.user.tenantId },
    include: { _count: { select: { products: true } } },
    orderBy: { name: 'asc' },
  });

  return NextResponse.json({
    suppliers: suppliers.map((s) => ({
      id: s.id,
      name: s.name,
      contact: s.contact,
      phone: s.phone,
      email: s.email,
      productCount: s._count.products,
    })),
  });
}

export async function POST(request: Request) {
  const rateLimit = await checkRateLimit('suppliers-post');
  if (rateLimit) return rateLimit;

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const name = String(body.name ?? '').trim();
    if (!name) {
      return NextResponse.json({ error: 'Nome do fornecedor é obrigatório.' }, { status: 400 });
    }

    const supplier = await prisma.supplier.create({
      data: {
        name: name.slice(0, 100),
        contact: body.contact ? String(body.contact).trim().slice(0, 100) : null,
        phone: body.phone ? String(body.phone).trim().slice(0, 20) : null,
        email: body.email ? String(body.email).trim().slice(0, 100) : null,
        userId: session.user.id,
        tenantId: session.user.tenantId,
      },
    });

    await createAuditLog('create', 'supplier', supplier.id, session.user.id, `Fornecedor criado: ${supplier.name}`, session.user.tenantId);

    return NextResponse.json({ supplier }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Erro ao salvar fornecedor.' }, { status: 500 });
  }
}
