/** Ambient shims — full @types/babel__* packages conflict across Babel 7 copies. */
declare module '@babel/generator' {
  import type { Node } from '@babel/types';
  type Generator = (
    ast: Node,
    opts?: { compact?: boolean }
  ) => { code: string };
  const generate: Generator & { default: Generator };
  export default generate;
}

declare module '@babel/traverse' {
  import type { File, Node } from '@babel/types';
  type Visitors = Record<string, (path: { node: Node }) => void>;
  type Traverse = (ast: File, visitors: Visitors) => void;
  const traverse: Traverse & { default: Traverse };
  export default traverse;
}
