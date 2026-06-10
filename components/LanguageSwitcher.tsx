'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Globe } from 'lucide-react';
import { useEffect, useState } from 'react';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('LanguageSwitcher');
  const [locale, setLocale] = useState<string>('pt');

  useEffect(() => {
    // Extract locale from pathname (e.g., /pt/dashboard -> pt)
    const pathLocale = pathname.split('/')[1];
    if (pathLocale === 'pt' || pathLocale === 'es') {
      setLocale(pathLocale);
    }
  }, [pathname]);

  const handleLocaleChange = (newLocale: string) => {
    // Replace the locale in the pathname
    const newPathname = pathname.replace(
      /^\/(\w{2})/,
      `/${newLocale}`
    ) || `/${newLocale}${pathname}`;
    router.push(newPathname);
  };

  return (
    <div className="relative flex items-center gap-2 rounded-lg px-3 py-1.5 transition-colors hover:bg-accent hover:text-foreground">
      <Globe className="h-4 w-4" />
      <button
        type="button"
        onClick={() => handleLocaleChange(locale === 'pt' ? 'es' : 'pt')}
        className="text-sm font-medium text-foreground hover:text-primary transition-colors"
      >
        {locale === 'pt' ? 'Español' : 'Português'}
      </button>
    </div>
  );
}