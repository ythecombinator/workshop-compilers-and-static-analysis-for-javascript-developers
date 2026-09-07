/**
 * @ast-grep/napi codemod: Enforce lazy useState initializers
 *
 * Same rewrite as astgrep-npx-lazy-state-initializer.yaml, authored against the
 * programmatic NAPI (parse → findAll → replace → commitEdits) instead of YAML.
 *
 * Usage:
 *   yarn demo:ast-grep-napi
 *   npx tsx src/codemods/astgrep-napi-lazy-state-initializer.ts <file>
 *
 * Before:  useState(new Set(...))
 * After:   useState(() => new Set(...))
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Lang, parse, type SgNode } from '@ast-grep/napi';
import { fail, ok } from '@utils/cli';

const DEFAULT_TARGET = 'src/components/demos/lazy-state-initializer.tsx';

function isEagerConstructorInit(init: SgNode): boolean {
  if (!init.find('new $$$_')) return false;
  // Already lazy: useState(() => new …)
  if (init.find('() => $$$_')) return false;
  return true;
}

export function transformSource(source: string): {
  output: string;
  edits: number;
} {
  const root = parse(Lang.Tsx, source).root();
  const calls = root.findAll('useState($INIT)');
  const edits = [];

  for (const call of calls) {
    const init = call.getMatch('INIT');
    if (!init || !isEagerConstructorInit(init)) continue;
    edits.push(call.replace(`useState(() => ${init.text()})`));
  }

  if (edits.length === 0) {
    return { output: source, edits: 0 };
  }

  return { output: root.commitEdits(edits), edits: edits.length };
}

function main() {
  const targetRel = process.argv[2] ?? DEFAULT_TARGET;
  const target = resolve(process.cwd(), targetRel);
  const source = readFileSync(target, 'utf8');
  const { output, edits } = transformSource(source);

  if (edits === 0) {
    fail(`No eager useState(new …) matches in ${targetRel}`);
    return;
  }

  writeFileSync(target, output);
  ok(`Applied ${edits} edit(s) via @ast-grep/napi → ${targetRel}`);
}

main();
