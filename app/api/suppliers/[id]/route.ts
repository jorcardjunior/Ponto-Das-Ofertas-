import { NextResponse } from 'next/server';
import { auth } from "@/auth";

import { prisma } from '@/lib/db';
import { createAuditLog } from '@/lib/audit';
import { checkRateLimit } from '@/lib/rate-limit';

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const rateLimit = await checkRateLimit(`suppliers-delete-${params.id}`);
  if (rateLimit) return rateLimit;

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  const supplier = await prisma.supplier.findFirst({
    where: { id: params.id, userId: session.user.id, tenantId: session.user.tenantId },
  });

  if (!supplier) {
    return NextResponse.json({ error: 'Fornecedor não encontrado.' }, { status: 404 });
  }

  await prisma.supplier.delete({ where: { id: params.id } });
  await createAuditLog('delete', 'supplier', params.id, session.user.id, `Fornecedor removido: ${supplier.name}`, session.user.tenantId);

  return NextResponse.json({ ok: true });
}
