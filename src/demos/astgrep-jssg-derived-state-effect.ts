/**
 * JSSG codemod: Collapse derived state synced via useEffect
 *
 * Authored for Codemod's JavaScript ast-grep runtime (`codemod:ast-grep`).
 * Same structural idea as the YAML + @ast-grep/napi demos — multi-edit across
 * the useState / useEffect pair.
 *
 *   yarn demo:ast-grep:jssg:derived-state-effect
 */

import type TSX from '@codemod.com/jssg-types/langs/tsx';
import type { Edit, Transform } from '@codemod.com/jssg-types/main';

const codemod: Transform<TSX> = async (root) => {
  const rootNode = root.root();
  const edits: Edit[] = [];

  const effects = rootNode.findAll({
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

  const importNode = rootNode.find({
    rule: { pattern: "import { useEffect, useState } from 'react'" },
  });
  if (importNode && edits.length > 0) {
    edits.push(importNode.replace("import { useState } from 'react'"));
  }

  if (edits.length === 0) return null;
  return rootNode.commitEdits(edits);
};

export default codemod;
