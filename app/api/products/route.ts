import { NextResponse } from 'next/server';
import { auth } from "@/auth";
import { prisma } from '@/lib/db';
import { createAuditLog } from '@/lib/audit';
import { checkRateLimit } from '@/lib/rate-limit';
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(1).max(100).transform((v) => v.trim()),
  sku: z.string().min(1).max(30).transform((v) => v.trim()),
  category: z.string().min(1).max(40).transform((v) => v.trim()),
  marketplace: z.string().min(1),
  price: z.number().nonnegative(),
  costPrice: z.number().nonnegative().optional().default(0),
  marketplaceFee: z.number().nonnegative().optional().default(0),
  stock: z.number().int().nonnegative(),
  supplierId: z.string().nullable().optional(),
});

export async function GET(request: Request) {
  const rateLimit = await checkRateLimit('products-get');
  if (rateLimit) return rateLimit;

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const pageSize = Math.min(50, Math.max(1, Number(searchParams.get('pageSize')) || 10));
  const search = searchParams.get('search')?.toLowerCase() || '';
  const sortField = searchParams.get('sort') || 'name';
  const sortDir = searchParams.get('dir') === 'desc' ? 'desc' : 'asc';

  const orderBy: Record<string, 'asc' | 'desc'> = {};
  if (['name', 'price', 'stock', 'marketplace'].includes(sortField)) {
    orderBy[sortField] = sortDir;
  } else {
    orderBy.name = 'asc';
  }

  const where: Record<string, unknown> = { userId: session.user.id, tenantId: session.user.tenantId };
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { sku: { contains: search } },
      { category: { contains: search } },
      { marketplace: { contains: search } },
    ];
  }

  const [data, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { supplier: { select: { id: true, name: true } } },
    }),
    prisma.product.count({ where }),
  ]);

  // Calculate health for each product
  const LOW_STOCK_THRESHOLD = 5;
  const enrichedData = data.map((product) => {
    const lowStock = product.stock <= LOW_STOCK_THRESHOLD;
    const costPrice = Number(product.costPrice);
    const marketplaceFee = Number(product.marketplaceFee);
    const price = Number(product.price);
    const grossProfit = price - costPrice - (price * marketplaceFee / 100) - (price * 0.18);
    const grossMargin = price > 0 ? (grossProfit / price) * 100 : 0;

    let health: 'critical' | 'regular' | 'healthy' = 'healthy';
    if (lowStock || grossMargin < 10) health = 'critical';
    else if (product.stock <= LOW_STOCK_THRESHOLD * 3 || grossMargin < 30) health = 'regular';

    return {
      ...product,
      price: Number(product.price),
      costPrice: Number(product.costPrice),
      marketplaceFee: Number(product.marketplaceFee),
      health,
      grossMargin: Math.round(grossMargin * 10) / 10,
      grossProfit: Math.round(grossProfit * 100) / 100,
    };
  });

  return NextResponse.json({
    data: enrichedData,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  });
}

export async function POST(request: Request) {
  const rateLimit = await checkRateLimit('products-post');
  if (rateLimit) return rateLimit;

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = productSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dados inválidos.', details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const product = await prisma.product.create({
      data: {
        ...parsed.data,
        userId: session.user.id,
        tenantId: session.user.tenantId,
      },
    });

    if (parsed.data.stock > 0) {
      await prisma.stockMovement.create({
        data: {
          productId: product.id,
          type: 'IN',
          quantity: parsed.data.stock,
          reason: 'Estoque inicial',
          userId: session.user.id,
          tenantId: session.user.tenantId,
        },
      });
    }

    await createAuditLog('create', 'product', product.id, session.user.id, `Produto criado: ${product.name}`, session.user.tenantId);

    return NextResponse.json({ product: { ...product, price: Number(product.price), costPrice: Number(product.costPrice), marketplaceFee: Number(product.marketplaceFee) } }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Erro ao salvar produto.' }, { status: 500 });
  }
}
