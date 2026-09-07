# Compilers & Static Analysis for JavaScript Developers

Hands-on workshop. The UI hosts **live codemod targets**. Generating and querying demos are terminal scripts plus
fixtures under `src/demos-fixtures/`.

## App routes

| Path                  | Script(s)                        |
| --------------------- | -------------------------------- |
| `/jscodeshift-oss`    | `yarn demo:jscodeshift:oss:*`    |
| `/jscodeshift-custom` | `yarn demo:jscodeshift:custom:*` |
| `/ast-grep`           | `yarn demo:ast-grep`             |
| `/ast-grep-napi`      | `yarn demo:ast-grep-napi`        |
| `/jssg`               | `yarn demo:jssg`                 |
| `/ts-morph`           | `yarn demo:ts-morph`             |

## Prerequisites

- Node.js 24
- Yarn 1.x

## Install

```sh
yarn
```

## Run the app

```sh
yarn dev
```

## Node demos (terminal)

Fixtures live in `src/demos-fixtures/` only when the tool needs non-React inputs
(e.g. Mitosis `.lite.tsx`). Scripts under `scripts/`.

`yarn demo:react-doctor` scans **`src/components`**: eager `useState` on the
ast-grep/jssg demos, unstable props on jscodeshift-custom, setState-in-effect on
`homebrew/derived-label`.

`yarn demo:radius-tracker` analyzes **this workshop app**. Target matches
resolved paths under `src/components/ui` (the design-system kit). Named wrappers
under `src/components/homebrew` that still render raw DOM show up as homebrew.

```sh
yarn demo:radius-tracker          # scan → usages.sqlite.gz + radius-tracker-report/
yarn demo:radius-tracker:report   # rebuild report from ./usages.sqlite.gz
yarn demo:radius-tracker:serve    # open the static dashboard
```

Do **not** point `--database` at anything under `radius-tracker-report/` —
`report` deletes that folder first. The DB is always `./usages.sqlite.gz`.

```sh
yarn demo:mitosis          # .lite.tsx → IR → React + Vue
yarn demo:radius-tracker   # UI kit vs homebrew (+ report)
yarn demo:react-doctor     # scan src/components (live smells, no fixtures)
```

## Codemods

All transforms live flat under `src/codemods/`.

```sh
yarn demo:jscodeshift:oss:remove-forward-ref
yarn demo:jscodeshift:custom:extract-styles
yarn demo:ast-grep
yarn demo:ast-grep-napi
yarn demo:jssg
yarn demo:ts-morph
```

Restore demo anti-patterns from git after running mutating codemods.
