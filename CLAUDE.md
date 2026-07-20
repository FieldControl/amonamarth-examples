# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Runnable example scripts for **Amonamarth** — Field Control's public REST API for the supplier/maintenance-management product (a.k.a. "gestão de fornecedores"). This is a documentation-companion repo: each script is a self-contained, executable demonstration of one API operation, not part of a shipped application. Official API docs: <https://amonamarth.fieldcontrol.com.br/docs>

## Commands

```sh
nvm use            # switch to Node v16 (see .nvmrc)
npm install        # install dependencies

# Run any example directly with Node (ESM, no build step):
node pt/exemplos/manutencoes/criar-manutencao-com-anexo.js

npm run lint:fix   # eslint --fix over the whole repo
```

There is **no build and no test runner**. Scripts self-verify at runtime using `node:assert` and exit non-zero on failure — running a script _is_ its test. CI (`.github/workflows/lint.yml`) runs github/super-linter on PRs to `master`; only changed files are validated.

## Setup / auth

Copy `.env-example` to `.env` and set `API_KEY` (an Amonamarth API key). All requests authenticate via the `x-api-key` header, wired in `core/client.js`. Base URL defaults to prod; homolog and localhost URLs are commented in the same file.

## Layout

- `core/` — shared code imported by every example.
  - `client.js` — the pre-configured axios instance. Logs every request/response, parses XML responses, and sets `validateStatus: () => true` (non-2xx does **not** throw — examples assert on status/body themselves).
  - `utils.js` — response unwrappers: `getData` (`response.data`), `getItems` (`response.data.items`), `getFistItem` (`response.data.items[0]`). All throw a descriptive error when the value is missing.
- `data/` — sample files used by upload examples (attachments).
- `pt/`, `en/`, `es/` — the same set of examples in three languages, differing only in comments and string text. Examples live under `pt/exemplos/`, `en/examples/`, `es/ejemplos/`, grouped by resource (`manutencoes`/`maintenances`, `empresas`/`companies`, `locais`/`locations`, `equipamentos`, `pendencias`, `segmentos`, `tipos-de-equipamento`, `tipos-de-manutencao`).

## Conventions to follow when adding or editing examples

- **ESM only** (`"type": "module"`). Use `import`, and reference the shared client with a relative path back to root: `import { client } from '../../../core/client.js'`.
- **Code style is StandardJS** (ESLint `standard` config): no semicolons, 2-space indent, single quotes, space before function parens.
- Every script follows the same shape: helper functions, an `async function run()`, then:

  ```js
  run().catch((err) => {
    const error = err.isAxiosError ? err.toJSON() : err;
    console.log("error: ", error);
    process.exit(1);
  });
  ```

- Chain the response unwrappers off requests: `await client.get('/locations', { params }).then(getFistItem)`.
- Assert expected outcomes with `node:assert` so the script fails loudly if the API behavior drifts.
- **Keep all three language versions in sync.** A change to a `pt/` example should be mirrored in `en/` and `es/`, translating only comments and human-readable strings — never the API paths, params, or logic.
- Every file opens with the standard header comment noting it's based on the official docs and that data shown is illustrative test data.
