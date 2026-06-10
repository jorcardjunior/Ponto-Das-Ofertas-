import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const intlMiddleware = createMiddleware({
  locales: ['pt', 'es'],
  defaultLocale: 'pt',
  localePrefix: 'always',
});

// Rotas protegidas que exigem autenticação
const PROTECTED_PREFIXES = [
  '/dashboard',
];

function stripLocale(pathname: string): string {
  const parts = pathname.split('/');
  if (parts.length > 1 && ['pt', 'es'].includes(parts[1])) {
    return '/' + parts.slice(2).join('/');
  }
  return pathname;
}

function isProtectedRoute(pathname: string): boolean {
  const normalized = stripLocale(pathname);
  return PROTECTED_PREFIXES.some((route) => normalized.startsWith(route));
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignorar arquivos estáticos e rotas internas
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/__next') ||
    pathname.includes('/_next/static')
  ) {
    return;
  }

  // Ignorar rotas API (auth é tratado pelo NextAuth)
  if (pathname.startsWith('/api')) {
    return;
  }

  // Verificar autenticação para rotas protegidas via getToken()
  if (isProtectedRoute(pathname)) {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });

    if (!token) {
      const locale = pathname.split('/')[1] || 'pt';
      const loginUrl = new URL(`/${locale}/login`, request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

