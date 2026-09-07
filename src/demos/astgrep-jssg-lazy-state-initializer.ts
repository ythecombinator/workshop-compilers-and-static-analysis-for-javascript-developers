/**
 * JSSG codemod: Enforce lazy useState initializers
 *
 * Authored for Codemod's JavaScript ast-grep runtime (`codemod:ast-grep`).
 * Same structural idea as the YAML + @ast-grep/napi demos.
 *
 *   yarn demo:ast-grep:jssg:lazy-state-initializer
 */

import type TSX from '@codemod.com/jssg-types/langs/tsx';
import type { Edit, Transform } from '@codemod.com/jssg-types/main';

const codemod: Transform<TSX> = async (root) => {
  const rootNode = root.root();
  const edits: Edit[] = [];

  const calls = rootNode.findAll({
    rule: {
      pattern: 'useState($INIT)',
      has: {
        pattern: 'new $$$_',
        stopBy: 'end',
      },
      not: {
        has: {
          pattern: '() => $$$_',
          stopBy: 'end',
        },
      },
    },
  });

  for (const call of calls) {
    const init = call.getMatch('INIT');
    if (!init) continue;
    edits.push(call.replace(`useState(() => ${init.text()})`));
  }

  if (edits.length === 0) return null;
  return rootNode.commitEdits(edits);
};

export default codemod;
