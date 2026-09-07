/**
 * Babel stub: find jQuery call sites in a JS string.
 *
 * Didactic scope — we only look for CallExpressions whose callee is:
 *   • `$` / `jQuery`                          →  $(…), jQuery(…)
 *   • a member of `$` / `jQuery`              →  $.ajax(…), jQuery.getJSON(…)
 *
 * Not covered (on purpose): noConflict aliases, `$` as a local binding,
 * chained returns without a fresh call, etc. Extend the visitors below.
 *
 *   yarn demo:babel:find-jquery
 */

import _generate from '@babel/generator';
import { parse } from '@babel/parser';
import _traverse from '@babel/traverse';
import * as t from '@babel/types';

type CallPath = { node: t.CallExpression };

function defaultExport<T>(mod: T | { default: T }): T {
  return typeof mod === 'function'
    ? (mod as T)
    : (mod as { default: T }).default;
}

const traverse = defaultExport(_traverse) as (
  ast: t.File,
  visitors: { CallExpression: (path: CallPath) => void }
) => void;

const generate = defaultExport(_generate) as (
  node: t.Node,
  opts?: { compact?: boolean }
) => { code: string };

export type JqueryHit = {
  /** 1-based line in the script source */
  line: number;
  /** 0-based column */
  column: number;
  /** Pretty-printed CallExpression */
  code: string;
  /** `$`, `jQuery`, `$.ajax`, `jQuery.getJSON`, … */
  callee: string;
};

function isJqueryRoot(node: t.Node | null | undefined): node is t.Identifier {
  return t.isIdentifier(node) && (node.name === '$' || node.name === 'jQuery');
}

/** Root `$`/`jQuery`, or `$`/`jQuery`.something */
function jqueryCalleeName(callee: t.Node): string | null {
  if (isJqueryRoot(callee)) return callee.name;

  if (
    t.isMemberExpression(callee) &&
    !callee.computed &&
    isJqueryRoot(callee.object) &&
    t.isIdentifier(callee.property)
  ) {
    return `${callee.object.name}.${callee.property.name}`;
  }

  return null;
}

export function findJquery(source: string): JqueryHit[] {
  const ast = parse(source, {
    sourceType: 'script',
    // Inline page scripts are loose ES5-ish; keep the parser forgiving.
    allowReturnOutsideFunction: true,
  }) as t.File;

  const hits: JqueryHit[] = [];

  traverse(ast, {
    CallExpression(path) {
      const name = jqueryCalleeName(path.node.callee);
      if (!name) return;

      const loc = path.node.loc?.start;
      hits.push({
        line: loc?.line ?? 0,
        column: loc?.column ?? 0,
        callee: name,
        code: generate(path.node, { compact: false }).code.trim(),
      });
    },
  });

  return hits;
}
