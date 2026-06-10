import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { checkRateLimit, rateLimitHeaders, getClientIp } from '@/lib/rateLimit';

export async function POST(request: Request) {
  try {
    // Rate limiting: 5 registros por IP por 15 minutos
    const ip = getClientIp(request);
    const rl = checkRateLimit(`register:${ip}`, {
      windowMs: 15 * 60 * 1000,
      maxRequests: 5,
      keyPrefix: 'rl-register',
    });

    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Muitas tentativas. Tente novamente mais tarde.' },
        { status: 429, headers: rateLimitHeaders(rl, 5) }
      );
    }

    const body = await request.json();
    const email = String(body.email ?? '').trim().toLowerCase();
    const password = String(body.password ?? '');
    const name = String(body.name ?? '').trim() || email.split('@')[0];
    const inviteCode = String(body.inviteCode ?? '');

    // Se REGISTER_INVITE_CODE estiver configurado, exige o código
    const requiredCode = process.env.REGISTER_INVITE_CODE;
    if (requiredCode && inviteCode !== requiredCode) {
      return NextResponse.json({ error: 'Código de convite inválido.' }, { status: 403 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Email inválido.' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Senha deve ter no mínimo 6 caracteres.' }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'Este email já está cadastrado.' }, { status: 409 });
    }

  const user = await prisma.user.create({
    data: {
      email,
      name,
      passwordHash: hashPassword(password),
      tenantId: 'default',
    },
  });

    return NextResponse.json(
      { user: { id: user.id, email: user.email, name: user.name } },
      { status: 201, headers: rateLimitHeaders(rl, 5) }
    );
  } catch {
    return NextResponse.json({ error: 'Erro ao criar conta.' }, { status: 500 });
  }
}
