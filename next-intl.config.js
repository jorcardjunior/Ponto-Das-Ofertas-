
/** @type {import('next-intl').NextIntlConfig} */
module.exports = {
  locales: ['pt', 'es'],
  defaultLocale: 'pt',
  pathnames: {
    '/': '/',
    '/login': '/login',
    '/register': '/register',
    '/dashboard': '/dashboard',
  },
  localePrefix: 'always',
};

