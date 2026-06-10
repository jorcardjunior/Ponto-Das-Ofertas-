import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { prisma } from './lib/db';
import type { SessionWithTenant } from './types/session';
import type { AuthOptions } from 'next-auth';

// --- Password Hashing Utilities ---
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${derivedKey}`;
}

export function verifyPassword(password: string, hash: string): boolean {
  const [salt, key] = hash.split(':');
  const derivedKey = scryptSync(password, salt, 64).toString('hex');
  return timingSafeEqual(Buffer.from(key), Buffer.from(derivedKey));
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// --- next-auth v4 Configuration ---
export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' as const },
        password: { label: 'Senha', type: 'password' as const },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        const email = String(credentials.email).trim().toLowerCase();
        if (!EMAIL_REGEX.test(email)) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        if (user.passwordHash) {
          if (!credentials.password) return null;
          if (!verifyPassword(String(credentials.password), user.passwordHash)) return null;
        } else {
          if (credentials.password) {
            const hashed = hashPassword(String(credentials.password));
            await prisma.user.update({
              where: { id: user.id },
              data: { passwordHash: hashed },
            });
          }
        }

        return {
          id: user.id,
          email: user.email ?? '',
          name: user.name ?? '',
          image: null,
          tenantId: user.tenantId,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token as unknown as Record<string, unknown>).tenantId = (user as unknown as Record<string, unknown>).tenantId ?? 'default';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const u = session.user as unknown as Record<string, unknown>;
        u.id = token.sub ?? '';
        u.tenantId = (token as unknown as Record<string, unknown>).tenantId as string ?? 'default';
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);

// Auth.js v4 compat: auth() wrapper for API routes that import { auth } from '@/auth'
import { getServerSession } from 'next-auth';
export async function auth(): Promise<SessionWithTenant | null> {
  return getServerSession(authOptions) as Promise<SessionWithTenant | null>;
}
