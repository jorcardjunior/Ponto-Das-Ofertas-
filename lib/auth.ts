import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';
import type { SessionWithTenant } from '../types/session';

/**
 * Re-exporta utilitários de auth e uma função auth() compatível.
 * Em next-auth v4, usamos getServerSession(authOptions) em vez do auth() do v5.
 * Esta função wrapper mantém compatibilidade com todos os imports existentes.
 */
export async function auth(): Promise<SessionWithTenant | null> {
  return getServerSession(authOptions) as Promise<SessionWithTenant | null>;
}

export { hashPassword, verifyPassword } from '../auth';
export { authOptions };
