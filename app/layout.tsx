import './globals.css';
import type { Metadata } from 'next';
import SessionProvider from '../components/SessionProvider';
import Providers from '../components/Providers';
import { ThemeProvider } from '../components/ThemeProvider';
import { ToastProvider } from '../components/Toast';
import { ErrorBoundary } from '../components/ErrorBoundary';

export const metadata: Metadata = {
  title: 'Ponto das Ofertas - Controle de Estoque',
  description: 'Sistema inteligente para controlar estoque e vendas em Shopee, Mercado Livre e Amazon.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ErrorBoundary>
          <ThemeProvider>
            <Providers>
              <SessionProvider>
                <ToastProvider>
                  {children}
                </ToastProvider>
              </SessionProvider>
            </Providers>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
