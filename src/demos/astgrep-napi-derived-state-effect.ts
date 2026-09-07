/**
 * @ast-grep/napi codemod: Collapse derived state synced via useEffect
 *
 * Same rewrite as astgrep-npx-derived-state-effect.yaml — relational matching across the
 * useState + useEffect pair, then multi-edit commit (const + delete effect +
 * tidy the React import).
 *
 * Usage:
 *   yarn demo:ast-grep:napi:derived-state-effect
 *   npx tsx src/demos/astgrep-napi-derived-state-effect.ts <file>
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Lang, parse } from '@ast-grep/napi';
import { fail, ok } from '@utils/cli';

const DEFAULT_TARGET = 'src/components/demos/derived-state-effect.tsx';

function transformSource(source: string): { output: string; edits: number } {
  const root = parse(Lang.Tsx, source).root();
  const edits = [];

  const effects = root.findAll({
    rule: {
      kind: 'expression_statement',
      has: {
        pattern: 'useEffect(() => { $SETTER($EXPR) }, $$$DEPS)',
        stopBy: 'end',
      },
      follows: {
        kind: 'lexical_declaration',
        pattern: 'const [$STATE, $SETTER] = useState($INIT)',
      },
    },
  });

  for (const effect of effects) {
    const setter = effect.getMatch('SETTER');
    const expr = effect.getMatch('EXPR');
    const state = effect.getMatch('STATE');
    if (!setter || !expr || !state) continue;

    const decl = effect.prev();
    if (!decl) continue;

    edits.push(decl.replace(`const ${state.text()} = ${expr.text()};`));
    edits.push(effect.replace(''));
  }

  const importNode = root.find("import { useEffect, useState } from 'react'");
  if (importNode && edits.length > 0) {
    edits.push(importNode.replace("import { useState } from 'react'"));
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
    fail(`No derived-state-in-useEffect matches in ${targetRel}`);
    return;
  }

  writeFileSync(target, output);
  ok(`Applied ${edits} edit(s) via @ast-grep/napi → ${targetRel}`);
}

main();
