This repository is a mono-repo containing multiple packages located in the `packages` directory. Maintained using [pnpm](https://pnpm.io/) and [turborepo](https://turborepo.org/).

`site`: [sveltekit](https://kit.svelte.dev) frontend.

`backend`: [nestjs](https://github.com/nestjs/nest) backend server.

`test`: End-to-end [playwright](https://playwright.dev) tests for both site and backend.

`utils`: Various shared utilities.

`seed`: Helpers for generating realistic fake data to use for development/testing.

### Development 🛠️

```bash
# clone the repo and scaffold .env files
git clone https://github.com/aqaratech/aqtech.git && cd aqtech && ./scripts/scaffold-worktree.sh

# start postgres and minio (S3 storage) docker containers, run migrations, and seed the database. While the seeded data is mostly random, a set of constant test users are always created. Their details can be found in `packages/test/tests/api/fixtures/users/test-users.ts`.
pnpm -r run test:setup

# run site on port 3000 and backend on port 3002. (run from root directory)
pnpm dev
```

See [.env.example](.env.example) for more info about environment variables.

### Build 📦

```bash
pnpm run build
```

### Test 🧪

```bash
pnpm run test

# Alternatively, run `precompute` in the repo root to check, build, and test all packages.
pnpm run precompute
```

> Hint: The term `precompute` refers to the act of "precomputing the cache". See [turbo's docs](https://turbo.build/repo/docs/core-concepts/remote-caching#a-single-shared-cache) for more about remote caching.

## CI

CI is handled by Github Actions. Any pushes to the master branch will trigger a build and deploy to the [staging environment](https://cloud.digitalocean.com/projects/95f2e61f-f483-4518-89ae-79b1d9200dd9/resources?i=404036).

Occasionally, you will want a separate preview environment. This is especially true when working on a largish PR or long living feature branch. Below are the steps to trigger the creation of new preview environment. When done, you should end up with a new preview environment with it's own database and all.

1. Create a new branch.
2. Push the branch to Github.
3. On the create PR page, add the label `preview` to the PR. This will trigger the creation of a new [DigitalOcean App](https://docs.digitalocean.com/products/app-platform/) with it's own (1) backend, (2) site, and (3) database. The configuration is taken from the configuration file found in `.do/spec.yml`. The process might take a few minutes - you can monitor the progress on the [Actions page](https://github.com/aqaratech/aqtech/actions) and subsequently on [DigitalOcean](https://cloud.digitalocean.com/projects/95f2e61f-f483-4518-89ae-79b1d9200dd9/resources?i=404036).
4. Once the App is created, you should be able to access it at the URL provided on the DigitalOcean dashboard.
5. We now need to seed the database. Unfortunately, all new DigitalOcean "Apps" are created with a setting called `Trusted Sources` set to `enabled`. Currently, there is no way to turn this off except by hand from the DigitalOcean dashboard. Find the newly created "App" -> Settings -> Components -> db-stage -> Set `Trusted Sources` to `disabled`.
6. On the same page, copy the database connection string. Found under `Connection Details` -> `Connection String`. It should look like this: `postgresql://db-stage:...`
7. Trigger the `Seed stage db` workflow. From the [Actions page](https://github.com/aqaratech/aqtech/actions) -> `Seed stage db` -> expand the `Run workflow` dropdown -> choose the PR branch name -> paste the database connection string into the required text input -> click `Run workflow`.
8. Once the workflow is done, you should be able to access the preview environment and login with the seeded user credentials (found in `packages/test/tests/api/fixtures/users/test-users.ts`).
9. When the PR is merged, the preview environment will be destroyed automatically.

## Release

This repo uses [changesets](https://github.com/changesets/changesets) to manage releases. To trigger a production release:

1. Create a changeset (`pnpm changeset`), commit it, push it to master.
2. A PR called "Version Packages" will be created automatically.
3. Merge the PR to trigger a release.

## Manual Tasks

```bash
# Regenerate openapi schema and types (this is done automatically when running `pnpm precompute`)
task swagger:all
```

### i18n

> [typesafe-i18n](https://github.com/ivanhofer/typesafe-i18n) library is used for managing translations in `packages/site`. The strings are currently stored on [Tolgee](https://tolgee.io/).

To import translations after they have been updated on Tolgee:

1. Go to https://app.tolgee.io/projects/1593/export
1. Toggle `Nested Structure` to `true`.
1. Download files and unzip. You should have `en.json` and `ar.json`.
1. Paste contents of `en.json` into `packages/site/src/i18n/en/tolgee.json`.
1. Paste contents of `ar.json` into `packages/site/src/i18n/ar/tolgee.json`.
1. Generate types: `cd packages/site && pnpm typesafe-i18n` (this should be done whenever i18n files `packages/site/src/i18n/*` are updated. The type check (`pnpm run check`) will fail and remind you otherwise.)

### Update non-npm dependencies

Some dependencies are not managed by npm, so they need to be updated by hand. All that is required here is to occasionally increment the version number in the appropriate files. Below is a list of these dependencies and the files where the version needs to be incremented.

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

## More info

Other topics are covered in their own `README` files:

- `packages/backend/src/myfatoorah/README.md`
- `packages/backend/src/tier/README.md`
- `packages/backend/README.md`
