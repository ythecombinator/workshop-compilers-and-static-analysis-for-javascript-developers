# Compilers & Static Analysis for JavaScript Developers

Welcome to the `Compilers & Static Analysis for JavaScript Developers`
workshop!

This hands-on workshop is designed to help you understand how static analysis
and compiler techniques power modern JavaScript tooling—and how to build
workflows of your own.

## 📋 Overview

We'll explore core compiler concepts alongside practical tooling like Babel,
jscodeshift, ast-grep, ts-morph, and AST Explorer. Expect plenty of code
reading, experimentation with open-source compilers, and guided exercises that
reshape how you approach large JavaScript codebases.

A non-exhaustive list of topics includes:

- **Compilers 101** — types of compilers, lexers, parsers, ASTs, intermediate
  representations (IR), and the glossary you'll keep meeting in tooling
- **UI frameworks & libraries** — how React, Svelte, Solid, Astro (and tools
  like Mitosis, Million.js, Marko, Inferno) leverage static analysis for
  performance, extraction, and collocation
- **Engines** — how V8 and JavaScriptCore use multi-tier compiler pipelines
- **Build your own workflows** — analyze, transform, and generate code with
  Babel, jscodeshift, ast-grep, ts-morph, and friends

Through case studies and exercises you'll practice AST transformations, codemod
pipelines, and classic techniques such as control-flow analysis and dead-code
elimination—the same ideas that drive linters, bundlers, frameworks, and even
browsers.

## 🚀 Getting Started

### Prerequisites

- Node.js 24+
- Yarn 1.x
- Basic familiarity with React and TypeScript

### Installation

1. Clone the repository:

```sh
git clone https://github.com/ythecombinator/workshop-compilers-and-static-analysis-for-javascript-developers.git

cd workshop-compilers-and-static-analysis-for-javascript-developers
```

2. Install dependencies:

```sh
yarn
```

3. Start the development server:

```sh
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Quality checks

```sh
yarn verify       # typecheck + lint + format:check
yarn deps:check   # unused dependency scan
```

## 🧪 What's in this app

The Vite app hosts **live codemod targets**—pages with intentional anti-patterns
you rewrite during the workshop. Terminal demos cover generating and querying
code when a UI surface isn't the right fit.

### 🪄 Live codemod targets

| Route                 | Script(s)                            | Focus                                      |
| --------------------- | ------------------------------------ | ------------------------------------------ |
| `/jscodeshift-oss`    | `yarn demo:jscodeshift:oss:*`        | OSS React 19 codemods                      |
| `/jscodeshift-custom` | `yarn demo:jscodeshift:custom:*`     | Custom transforms (styles / handlers)      |
| `/ast-grep`           | `yarn demo:ast-grep`                 | YAML rules → lazy `useState`               |
| `/ast-grep-napi`      | `yarn demo:ast-grep-napi`            | Same smell via `@ast-grep/napi`            |
| `/ast-grep-jssg`      | `yarn demo:ast-grep:jssg`            | Same smell via Codemod JSSG                |
| `/ts-morph`           | `yarn demo:ts-morph`                 | Prop types → interfaces                    |

Transforms live flat under `src/codemods/`. The three ast-grep tools all rewrite
the shared target `src/components/demos/lazy-state-initializer.tsx` — restore
from git between runs after a mutating codemod.

```sh
yarn demo:jscodeshift:oss:remove-forward-ref
yarn demo:jscodeshift:custom:extract-styles
yarn demo:ast-grep
yarn demo:ast-grep-napi
yarn demo:ast-grep:jssg
yarn demo:ts-morph
```

### 🧬 Terminal demos

Fixtures under `src/demos-fixtures/` are only used when the tool needs non-React
inputs (e.g. Mitosis `.lite.tsx`). Scripts live in `scripts/`.

```sh
yarn demo:mitosis                 # .lite.tsx → IR → React + Vue
yarn demo:radius-tracker          # UI kit vs homebrew adoption graph + report
yarn demo:radius-tracker:report   # rebuild report from ./usages.sqlite.gz
yarn demo:radius-tracker:serve    # open the static dashboard
yarn demo:react-doctor            # scan src/components for React health smells
```

**Radius Tracker** analyzes this workshop app: imports resolving under
`src/components/ui` are the design-system target; wrappers in
`src/components/homebrew` show up as homebrew. The scan writes
`./usages.sqlite.gz`, then builds `radius-tracker-report/`. Do **not** point
`--database` at anything inside the report folder—`report` deletes that outdir
first.

**react-doctor** scans live code under `src/components` (eager `useState` on
`lazy-state-initializer`, unstable props on jscodeshift-custom, setState-in-effect on
`homebrew/derived-label`).

## 🛠️ Suggested extras

These aren't required to run the app, but they pair well with the material:

- [AST Explorer](https://astexplorer.net/) — poke at parsers and transforms
- [ast-grep Playground](https://ast-grep.github.io/playground.html) — iterate on
  structural rules
- Browser DevTools + your editor's TypeScript language service — follow symbols
  the same way static tools do

## 📖 Additional Resources

> This is an everliving section and I'll keep adding more content here.

- [Engineering a Compiler](https://shop.elsevier.com/books/engineering-a-compiler/cooper/978-0-12-815412-0)
  (Cooper & Torczon) — classic Compilers 101 reference
- [Babel Handbook](https://github.com/jamiebuilds/babel-handbook) — plugin /
  AST mental model
- [jscodeshift](https://github.com/facebook/jscodeshift)
- [ast-grep](https://ast-grep.github.io/)
- [ts-morph](https://ts-morph.com/)
- [Mitosis](https://mitosis.builder.io/)
- [Radius Tracker](https://github.com/rangle/radius-tracker)
- [react-doctor](https://github.com/millionco/react-doctor)

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for
details.
