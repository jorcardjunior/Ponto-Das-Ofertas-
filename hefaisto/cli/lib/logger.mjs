export const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
  bold: '\x1b[1m',
};

export const c = (color, text) => `${colors[color]}${text}${colors.reset}`;

export const log = {
  info: (msg) => console.log(c('cyan', 'ℹ ') + msg),
  success: (msg) => console.log(c('green', '✅ ') + msg),
  warn: (msg) => console.log(c('yellow', '⚠ ') + msg),
  error: (msg) => console.log(c('red', '❌ ') + msg),
  step: (n, msg) => console.log(c('bold', `[${n}]`) + ' ' + msg),
  section: (msg) => console.log('\n' + c('bold', c('magenta', msg))),
};
