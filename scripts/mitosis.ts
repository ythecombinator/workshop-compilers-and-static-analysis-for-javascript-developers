/**
 * Mitosis multi-target emit — Node-only.
 *
 *   yarn demo:mitosis
 *
 * Flow: source (.lite.tsx) → Mitosis IR → React + Vue
 */
import { readFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  componentToReact,
  componentToVue,
  parseJsx,
} from '@builder.io/mitosis';
import { banner, c, fail, kv, ok, panel, step, truncate } from '@utils/cli';

const __dirname = dirname(fileURLToPath(import.meta.url));
const workshopRoot = join(__dirname, '..');
const fixture = join(workshopRoot, 'src/demos-fixtures/Mitosis.lite.tsx');

async function main() {
  banner('Mitosis · multi-target emit', 'one source → IR → React + Vue');

  kv('fixture', relative(workshopRoot, fixture));
  kv('pipeline', 'parseJsx → IR → componentToReact / componentToVue');

  step('1/3', 'read .lite.tsx source');
  const source = await readFile(fixture, 'utf8');
  panel('SOURCE · Mitosis.lite.tsx', source, c.cyan);

  step('2/3', 'parseJsx → MitosisComponent IR');
  const component = parseJsx(source);
  const irExcerpt = {
    name: component.name,
    state: component.state,
    hooks: Object.keys(component.hooks ?? {}),
    children: component.children,
  };
  panel(
    'IR · MitosisComponent (excerpt)',
    truncate(JSON.stringify(irExcerpt, null, 2), 4000),
    c.magenta
  );
  ok(`IR name: ${c.bold(String(component.name ?? '(anonymous)'))}`);

  step('3/3', 'generate targets');
  const reactCode = String(componentToReact()({ component }));
  const vueCode = String(componentToVue()({ component }));

  panel('EMIT · React', truncate(reactCode), c.brightGreen);
  panel('EMIT · Vue', truncate(vueCode), c.brightYellow);

  console.log(
    c.bold(c.brightCyan('Done.')) +
      c.dim('  Same IR, two backends — that’s the Mitosis bet.\n')
  );
}

main().catch((error) => {
  fail(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
