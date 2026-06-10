'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

type SignInResult = { ok: true } | { ok: false; error: string };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useAuth() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  async function handleSignIn(email: string, password?: string): Promise<SignInResult> {
    if (!EMAIL_REGEX.test(email)) {
      return { ok: false, error: 'Email inválido.' };
    }

    const result: { error?: string } | undefined = await signIn('credentials', {
      email: email.trim(),
      password: password ?? '',
      redirect: false,
    }) as any;

    if (result?.error) {
      return { ok: false, error: 'Email ou senha inválidos.' };
    }

    return { ok: true };
  }

  function handleSignOut() {
    signOut({ callbackUrl: '/login' });
  }

  return {
    user: session?.user ?? null,
    loading,
    signIn: handleSignIn,
    signOut: handleSignOut,
  };
}
