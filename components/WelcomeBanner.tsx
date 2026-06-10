'use client';

type Props = {
  email: string | null | undefined;
};

export function WelcomeBanner({ email }: Props) {
  return (
    <div className="animate-fade-in mb-8 rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 via-primary/[0.02] to-transparent p-6 sm:p-8 dark:from-primary/10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary/70">
            Painel de vendas multichannel
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Olá, {email?.split('@')[0] ?? 'vendedor'}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Gerencie produtos, estoque e vendas para Shopee, Mercado Livre e Amazon em um só lugar.
          </p>
        </div>
      </div>
    </div>
  );
}
