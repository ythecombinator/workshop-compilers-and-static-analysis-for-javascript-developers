export const demos = [
  {
    id: 'jscodeshift-oss',
    title: 'jscodeshift (OSS)',
    path: '/jscodeshift-oss',
    description: 'Legacy React patterns for OSS codemods',
  },
  {
    id: 'jscodeshift-custom',
    title: 'jscodeshift (Custom)',
    path: '/jscodeshift-custom',
    description: 'Inline styles / handlers for custom transforms',
  },
  {
    id: 'ast-grep',
    title: 'ast-grep (YAML)',
    path: '/ast-grep',
    description: 'Eager useState initializers',
  },
  {
    id: 'ast-grep-napi',
    title: '@ast-grep/napi',
    path: '/ast-grep-napi',
    description: 'Same smell, JS transform API',
  },
  {
    id: 'jssg',
    title: 'JSSG',
    path: '/jssg',
    description: 'ast-grep patterns in TypeScript',
  },
  {
    id: 'ts-morph',
    title: 'ts-morph',
    path: '/ts-morph',
    description: 'Prop types → interfaces',
  },
] as const;
