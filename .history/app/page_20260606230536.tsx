export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <section className="rounded-3xl bg-white p-10 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200">
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Promptfy OS</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                Sistema inteligente para estoque e vendas em Shopee, Mercado Livre e Amazon
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Um painel unificado para o vendedor autônomo controlar catálogo, estoque e vendas em um só lugar.
                Comece a centralizar seus canais e elimine erros de estoque entre marketplaces.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="text-lg font-semibold">Controle de Estoque</h2>
                <p className="mt-2 text-sm text-slate-600">Veja o que tem em cada canal e evite vendas duplicadas.</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="text-lg font-semibold">Catálogo Unificado</h2>
                <p className="mt-2 text-sm text-slate-600">Cadastre produtos e categorias com facilidade.</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="text-lg font-semibold">Resumo de Vendas</h2>
                <p className="mt-2 text-sm text-slate-600">Acompanhe receitas, pedidos abertos e itens com estoque baixo.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl bg-sky-600 p-8 text-white shadow-xl shadow-sky-300/20">
            <h2 className="text-2xl font-semibold">O que foi criado</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6">
              <li>• Página inicial de apresentação do produto.</li>
              <li>• Estrutura Next.js + Tailwind pronta para desenvolvimento.</li>
              <li>• Ambiente local configurado para rodar o app em `localhost`.</li>
              <li>• Base para começar o painel de estoque e vendas.</li>
            </ul>
          </article>
          <article className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200">
            <h2 className="text-2xl font-semibold">Próximo passo</h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Agora podemos implementar o dashboard de produtos, cadastro de itens e visualização de estoque.
              Se quiser, avanço já para o Ciclo 1 do Hefaisto.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
