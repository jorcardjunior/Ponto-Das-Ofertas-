import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = locale || 'pt';
  return {
    messages: (await import(`../locales/${resolvedLocale}/common.json`)).default,
    locale: resolvedLocale,
  };
});
