import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Promptfy OS — Vendas Multichannel',
  description: 'Sistema inteligente para controlar estoque e vendas em Shopee, Mercado Livre e Amazon.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
