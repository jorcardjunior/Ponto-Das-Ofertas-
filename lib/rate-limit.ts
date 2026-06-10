import { NextResponse } from 'next/server';

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 30;

const fallbackMap = new Map<string, { count: number; resetAt: number }>();

let redisClient: import('ioredis').Redis | null = null;

async function getRedis() {
  if (redisClient) return redisClient;
  try {
    const { Redis } = await import('ioredis');
    redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6380', {
      lazyConnect: true,
      maxRetriesPerRequest: 1,
      connectTimeout: 2000,
      retryStrategy: () => null,
    });
    await redisClient.connect();
    return redisClient;
  } catch {
    return null;
  }
}

export async function checkRateLimit(key: string): Promise<NextResponse | null> {
  const redis = await getRedis();
  const now = Date.now();

  if (redis) {
    try {
      const windowKey = `ratelimit:${key}:${Math.floor(now / WINDOW_MS)}`;
      const count = await redis.incr(windowKey);
      if (count === 1) {
        await redis.pexpire(windowKey, WINDOW_MS);
      }
      if (count > MAX_REQUESTS) {
        return NextResponse.json(
          { error: 'Muitas requisições. Tente novamente em breve.' },
          { status: 429, headers: { 'Retry-After': String(Math.ceil(WINDOW_MS / 1000)) } },
        );
      }
      return null;
    } catch {
      /* fall through to in-memory */
    }
  }

  const entry = fallbackMap.get(key);
  if (!entry || now > entry.resetAt) {
    fallbackMap.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return null;
  }

  entry.count += 1;

  if (entry.count > MAX_REQUESTS) {
    return NextResponse.json(
      { error: 'Muitas requisições. Tente novamente em breve.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((entry.resetAt - now) / 1000)) } },
    );
  }

  return null;
}
