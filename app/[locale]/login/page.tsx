'use client';

import { Suspense, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Store, PackageCheck, TrendingUp, Shield, Loader2 } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError('');

    const result: { error?: string } | undefined = await signIn('credentials', {
      email: email.trim(),
      password,
      redirect: false,
    }) as any;

    if (result?.error) {
      setError('Email ou senha inválidos.');
      setLoading(false);
      return;
    }

    const redirect = searchParams.get('redirect') || '/pt/dashboard';
    router.push(redirect);
    router.refresh();
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-border/50 bg-card/95 p-8 shadow-xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-sm">
            <Store className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Ponto das Ofertas</p>
            <p className="text-xs text-muted-foreground">Controle de Estoque</p>
          </div>
        </div>

        <h1 className="mt-6 text-2xl font-bold tracking-tight text-foreground">Acesse seu painel</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Entre com seu email para gerenciar seus produtos e estoque.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="voce@exemplo.com"
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
              required
              autoFocus
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="Sua senha"
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
              required
              minLength={6}
            />
          </div>

          {error && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Entrando…
              </>
            ) : (
              'Entrar'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Ainda não tem conta?{' '}
          <a href="/pt/register" className="font-medium text-primary hover:text-primary/80 transition-colors">
            Criar conta
          </a>
        </p>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-card/50 px-4 py-3 backdrop-blur-sm">
          <PackageCheck className="h-4 w-4 text-primary" />
          <p className="text-xs text-muted-foreground">Gestão de estoque</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-card/50 px-4 py-3 backdrop-blur-sm">
          <TrendingUp className="h-4 w-4 text-success" />
          <p className="text-xs text-muted-foreground">Multi-canal</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-card/50 px-4 py-3 backdrop-blur-sm">
          <Shield className="h-4 w-4 text-warning" />
          <p className="text-xs text-muted-foreground">Segurança</p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.08)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(var(--primary)/0.05)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--primary)/0.03)_0%,_transparent_50%)]" />
      <div className="relative animate-scale-in">
        <Suspense fallback={
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Carregando…
          </div>
        }>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
