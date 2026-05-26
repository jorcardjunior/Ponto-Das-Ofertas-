import chalk from 'chalk';

export function banner() {
  console.log('');
  console.log(chalk.bold.cyan('  ██╗  ██╗ ██████╗ ██╗ █████╗ '));
  console.log(chalk.bold.cyan('  ╚██╗██╔╝██╔═══██╗██║██╔══██╗'));
  console.log(chalk.bold.cyan('   ╚███╔╝ ██║   ██║██║███████║'));
  console.log(chalk.bold.cyan('   ██╔██╗ ██║   ██║██║██╔══██║'));
  console.log(chalk.bold.cyan('  ██╔╝ ██╗╚██████╔╝██║██║  ██║'));
  console.log(chalk.bold.cyan('  ╚═╝  ╚═╝ ╚═════╝ ╚═╝╚═╝  ╚═╝'));
  console.log('');
  console.log(chalk.dim('  Framework autonomo para agencias de marketing'));
  console.log(chalk.dim('  v1.0.0'));
  console.log('');
}

export function info(msg) { console.log(chalk.cyan('  ℹ ') + msg); }
export function success(msg) { console.log(chalk.green('  ✓ ') + msg); }
export function warn(msg) { console.log(chalk.yellow('  ⚠ ') + msg); }
export function error(msg) { console.log(chalk.red('  ✗ ') + msg); }
export function step(n, total, msg) { console.log(chalk.dim(`  [${n}/${total}]`) + ' ' + msg); }

export function summary(items) {
  console.log('');
  console.log(chalk.bold.green('  Instalacao completa!'));
  console.log('');
  items.forEach(item => console.log(chalk.dim('    •') + ' ' + item));
  console.log('');
}
