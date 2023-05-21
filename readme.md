This repository is a mono-repo containing multiple packages located in the `packages` directory. Maintained using [pnpm](https://pnpm.io/) and [turborepo](https://turborepo.org/).

`site`: Main site built with [sveltekit](https://kit.svelte.dev/) & `typescript`.

`backend`: Server built with [nest](https://github.com/nestjs/nest) & `typescript`.

`test`: End-to-end tests for both site and backend. Uses with [playwright](https://playwright.dev/).

`utils`: Various utilities used by other packages.

`seed`: Helpers for generating realistic fake data to use for development/testing.

## Develop:

> In the root directory, run `pnpm install`, then:

### Dev 🛠️

```bash
pnpm dev
# runs site on port 3000, and backend on port 3002.
```

Take a look [.env.example](.env.example) to know what env vars are required.

### Test 🧪

```bash
pnpm run test
```

### Build 📦

```bash
pnpm run build
```

### Update 📦

```bash
# create a changeset file
pnpm changeset

# Changeset files will be consumed by CI and a PR will be opened.
# The PR can be merged to trigger a release.
```

# Manual Tasks

```bash
# generate types after changing openapi schema (note: openapi schema is only generated in when running pnpm dev)
pnpm run api:generate:all --force

# Test all browsers
cd packages/test
pnpm run test:all-browsers

# To update i18n types after changing i18n files
cd packages/site
pnpm typesafe-i18n
```

- `TIER_CLI_VERSION` in dockerfiles
- `SENTRY_CLI_VERSION` in `.github/workflows/ci.yml`
- openapi-generator-cli version in `packages/backend/get-openapi.sh`
