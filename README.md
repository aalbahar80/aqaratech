This repository is a mono-repo containing multiple packages located in the `packages` directory. Maintained using [pnpm](https://pnpm.io/) and [turborepo](https://turborepo.org/).

`site`: [sveltekit](https://kit.svelte.dev/) frontend.

`backend`: [nestjs](https://github.com/nestjs/nest) backend server.

`test`: End-to-end [playwright](https://playwright.dev/)tests for both site and backend.

`utils`: Various shared utilities.

`seed`: Helpers for generating realistic fake data to use for development/testing.

### Development 🛠️

```bash
# clone the repo and scaffold .env files
git clone https://github.com/aqaratech/aqtech.git && cd aqtech && ./scripts/scaffold-worktree.sh
# run site on port 3000 and backend on port 3002. (run from root directory)
pnpm dev
```

Take a look [.env.example](.env.example) to know what env vars are required. Environment variables are validated using Zod. Description of each variable + schema in `packages/utils/src/config/env/*`

### Build 📦

```bash
pnpm run build
```

### Test 🧪

```bash
pnpm run test

# Alternatively, run `precompute` in the repo root to lint, type-check, build, and test all packages.
pnpm run precompute
```

# Release

1. Create a changeset (`pnpm changeset`), commit it, push it to master.
2. A PR called "Version Packages" will be created automatically.
3. Merge the PR to trigger a release.

# Manual Tasks

```bash
# Regenerate openapi schema and types
task swagger:all
```

## i18n

1. Go to https://app.tolgee.io/projects/1593/export
1. Check `Nested Structure`
1. Download files and unzip. You should have `en.json` and `ar.json`.
1. Paste contents of `en.json` into `packages/site/src/i18n/en/tolgee.json`.
1. Paste contents of `ar.json` into `packages/site/src/i18n/ar/tolgee.json`.
1. Generate types: `cd packages/site && pnpm typesafe-i18n` (should be done whenever i18n files `packages/site/src/i18n/*` are updated)

## Update non-npm dependencies

- `NODE_VERSION` - [Releases](https://nodejs.org/en/about/releases/)
  - `packages/site/Dockerfile`
  - `packages/backend/Dockerfile`
  - `@types/node` in root `package.json` under `pnpm.overrides`
- `TIER_CLI_VERSION` - [Releases](https://github.com/tierrun/tier/releases/)
  - `packages/site/Dockerfile`
  - `packages/backend/Dockerfile`
  - `flake.nix`
- `SENTRY_CLI_VERSION` - [Releases](https://github.com/getsentry/sentry-cli/releases)
  - `.github/workflows/ci.yml`
- `openapi-generator-cli` - [Releases](https://github.com/OpenAPITools/openapi-generator/releases)
  - `packages/backend/get-openapi.sh`

# More info

Other topics are covered in their own `README` files:

- `packages/backend/src/myfatoorah/README.md`
- `packages/backend/src/tier/README.md`
- `packages/backend/README.md`
