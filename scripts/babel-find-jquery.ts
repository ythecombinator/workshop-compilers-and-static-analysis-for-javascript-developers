/**
 * Babel · find jQuery in HTML inline scripts — Node-only.
 *
 *   yarn demo:babel:find-jquery
 *
 * Flow: HTML → cheerio (extract <script>) → @babel/parser → traverse → print
 */
import { readFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';
import { findJquery } from '../src/demos/babel-find-jquery.ts';
import { banner, c, fail, kv, ok, panel, step } from '@utils/cli';

const __dirname = dirname(fileURLToPath(import.meta.url));
const workshopRoot = join(__dirname, '..');
const fixture = join(workshopRoot, 'src/demos-fixtures/jquery.html');

async function main() {
  banner(
    'Babel · find jQuery',
    'HTML → cheerio → parse → traverse → pretty-print'
  );

  kv('fixture', relative(workshopRoot, fixture));
  kv('detects', '$(…), jQuery(…), $.fn(…), jQuery.fn(…)');

  step('1/3', 'read HTML fixture');
  const html = await readFile(fixture, 'utf8');
  panel('FIXTURE · page.html', html, c.cyan);

  step('2/3', 'cheerio · extract inline <script> bodies');
  const $ = load(html);
  const scripts = $('script')
    .toArray()
    .map((el) => {
      const node = $(el);
      const src = node.attr('src');
      const code = node.html()?.trim() ?? '';
      return { src, code };
    })
    .filter((script) => !script.src && script.code.length > 0);

  ok(
    `inline scripts: ${c.bold(String(scripts.length))}  ${c.dim('(skipped external src=…)')}`
  );

  step('3/3', '@babel/parser + traverse · CallExpression visitors');
  let total = 0;

  for (const [index, script] of scripts.entries()) {
    const hits = findJquery(script.code);
    total += hits.length;

    panel(
      `SCRIPT #${index + 1} · ${hits.length} hit(s)`,
      script.code,
      c.magenta
    );

    if (hits.length === 0) {
      console.log(c.dim('  (no jQuery call sites)\n'));
      continue;
    }

    for (const hit of hits) {
      console.log(
        `  ${c.yellow(`${hit.line}:${hit.column}`.padEnd(8))} ${c.bold(hit.callee)}`
      );
      console.log(
        hit.code
          .split('\n')
          .map((line) => `           ${c.brightGreen(line)}`)
          .join('\n')
      );
      console.log();
    }
  }

  console.log(
    c.bold(c.brightCyan('Done.')) +
      c.dim(
        `  ${total} jQuery call site(s) across ${scripts.length} inline script(s).\n`
      )
  );
}

main().catch((error) => {
  fail(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
