import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/auth';
import { env } from '@/lib/env';

const requestSchema = z.object({
  message: z.string().min(1).max(2000),
  history: z
    .array(z.object({ role: z.enum(['user', 'assistant']), content: z.string() }))
    .max(20)
    .optional()
    .default([]),
});

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Requisição inválida.', details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { message, history } = parsed.data;

    const apiKey = env.XAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key do Grok não configurada. Configure XAI_API_KEY no .env.' },
        { status: 500 },
      );
    }

    const systemPrompt = `Você é um assistente especializado em controle de estoque para lojas. Você ajuda o usuário a:
- Analisar estoque e vendas
- Sugerir reposições de produtos
- Calcular margens e lucros
- Identificar produtos críticos (estoque baixo)
- Dar dicas de precificação e marketplace
- Analisar tendências de vendas

Seja direto, profissional e responda em português. Use dados concretos quando possível.

Contexto do sistema: Ponto das Ofertas - Controle de Estoque para lojas que vendem em marketplaces como Shopee, Mercado Livre e Amazon.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...(history || []).slice(-10),
      { role: 'user', content: message },
    ];

    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'grok-4.3',
        messages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[GROK API ERROR]', response.status, errorText);
      return NextResponse.json(
        { error: `Erro na API do Grok: ${response.status}` },
        { status: 502 },
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || '';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('[GROK ERROR]', error);
    return NextResponse.json({ error: 'Erro interno ao processar requisição.' }, { status: 500 });
  }
}
