This repository is a mono-repo containing multiple packages located in the `packages` directory. Maintained using [pnpm](https://pnpm.io/) and [turborepo](https://turborepo.org/).

`site`: Main site built with [sveltekit](https://kit.svelte.dev/) & `typescript`.

`backend`: Server built with [nest](https://github.com/nestjs/nest) & `typescript`.

`test`: End-to-end tests for both site and backend. Uses with [playwright](https://playwright.dev/).

`utils`: Various utilities used by other packages.

`seed`: Helpers for generating realistic fake data to use for development/testing.

### Development 🛠️

```bash
# clone the repo and scaffold .env files
git clone https://github.com/aqaratech/aqtech.git && cd aqtech && ./scripts/scaffold-worktree.sh
# run site on port 3000 and backend on port 3002.
pnpm dev
```

Take a look [.env.example](.env.example) to know what env vars are required.

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

# Test all browsers
cd packages/test
pnpm run test:all-browsers
```

# i18n

1. Go to https://app.tolgee.io/projects/1593/export
1. Check `Nested Structure`
1. Download files and unzip. You should have `en.json` and `ar.json`.
1. Paste contents of `en.json` into `packages/site/src/i18n/en/tolgee.json`.
1. Paste contents of `ar.json` into `packages/site/src/i18n/ar/tolgee.json`.
1. Generate types: `cd packages/site && pnpm typesafe-i18n` (should be done whenever i18n files `packages/site/src/i18n/*` are updated)

- `NODE_VERSION` in dockerfiles + `@types/node` in root `package.json` under `pnpm.overrides`. [Releases](https://nodejs.org/en/about/releases/)
- `TIER_CLI_VERSION` in dockerfiles. [Releases](https://github.com/tierrun/tier/releases/)
- `SENTRY_CLI_VERSION` in `.github/workflows/ci.yml`. [Releases](https://github.com/getsentry/sentry-cli/releases)
- openapi-generator-cli version in `packages/backend/get-openapi.sh`. [Releases](https://github.com/OpenAPITools/openapi-generator/releases)
