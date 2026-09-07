/** Node / demo CLI helpers on top of picocolors. */
import pc from 'picocolors';

export const c = {
  bold: pc.bold,
  dim: pc.dim,
  red: pc.red,
  green: pc.green,
  yellow: pc.yellow,
  blue: pc.blue,
  magenta: pc.magenta,
  cyan: pc.cyan,
  white: pc.white,
  brightCyan: pc.cyanBright,
  brightMagenta: pc.magentaBright,
  brightGreen: pc.greenBright,
  brightYellow: pc.yellowBright,
};

export function banner(title: string, subtitle?: string) {
  const line = '═'.repeat(Math.max(title.length + 4, 48));
  console.log('\n' + c.cyan(line));
  console.log(c.bold(c.brightCyan(`  ${title}`)));
  if (subtitle) console.log(c.dim(`  ${subtitle}`));
  console.log(c.cyan(line) + '\n');
}

export function step(label: string, detail?: string) {
  const head = c.bold(c.magenta(`▸ ${label}`));
  console.log(detail ? `${head}  ${c.dim(detail)}` : head);
}

export function ok(message: string) {
  console.log(`${c.brightGreen('✓')} ${message}`);
}

export function fail(message: string) {
  console.error(`${c.red('✗')} ${message}`);
}

export function panel(
  title: string,
  body: string,
  color: (t: string) => string = c.cyan
) {
  const width = 72;
  const bar = '─'.repeat(width);
  console.log('\n' + color(bar));
  console.log(color(c.bold(` ${title}`)));
  console.log(color(bar));
  console.log(body.trimEnd());
  console.log(color(bar) + '\n');
}

export function kv(key: string, value: string) {
  console.log(`  ${c.yellow(key.padEnd(12))} ${c.white(value)}`);
}

export function truncate(text: string, max = 2800) {
  if (text.length <= max) return text;
  return `${text.slice(0, max)}\n${c.dim(`… truncated (${text.length - max} more chars)`)}`;
}
