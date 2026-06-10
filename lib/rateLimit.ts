/**
 * Rate limiter simples baseado em memória.
 * Para produção, considere usar Redis (ioredis já está nas dependências).
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Limpeza lazy: roda na primeira requisição após 5 minutos da última limpeza
let lastCleanup = Date.now();
function cleanupIfNeeded() {
  const now = Date.now();
  if (now - lastCleanup > 5 * 60 * 1000) {
    lastCleanup = now;
    for (const [key, entry] of store) {
      if (entry.resetAt <= now) {
        store.delete(key);
      }
    }
  }
}

export interface RateLimitConfig {
  /** Janela de tempo em milissegundos */
  windowMs: number;
  /** Máximo de requisições por janela */
  maxRequests: number;
  /** Chave personalizada (padrão: IP do request) */
  keyPrefix?: string;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Verifica se uma requisição está dentro do limite de taxa.
 * @param identifier - Identificador único (geralmente IP + rota)
 * @param config - Configuração do rate limit
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  cleanupIfNeeded();

  const { windowMs, maxRequests, keyPrefix = 'rl' } = config;
  const key = `${keyPrefix}:${identifier}`;
  const now = Date.now();

  const entry = store.get(key);

  if (!entry || entry.resetAt <= now) {
    // Nova janela
    store.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });
    return { allowed: true, remaining: maxRequests - 1, resetAt: now + windowMs };
  }

  if (entry.count >= maxRequests) {
    // Limite excedido
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  // Incrementar contador
  entry.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetAt: entry.resetAt,
  };
}

/**
 * Cria headers de resposta de rate limit.
 */
export function rateLimitHeaders(result: RateLimitResult, maxRequests: number): Record<string, string> {
  return {
    'X-RateLimit-Limit': String(maxRequests),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(Math.ceil(result.resetAt / 1000)),
  };
}

/**
 * Obtém o IP do cliente a partir do request.
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return '127.0.0.1';
}
