This repository is a mono-repo containing multiple packages located in the `packages` directory. Maintained using [pnpm](https://pnpm.io/) and [turborepo](https://turborepo.org/).

`site`: Main site built with [sveltekit](https://kit.svelte.dev/). Fully typed with `typescript` & [trpc](https://trpc.io/). Uses [playwright](https://playwright.dev/) for testing.

`docs`: Documentation for site. Built using [kit-docs](https://github.com/svelteness/kit-docs).

`seed`: Helpers for generating realistic fake data to use for development/testing.

`utils`: Contains code to trigger [`/notify-all`](packages/site/src/routes/transactions/notify-all.ts) webhook to send payment reminders to tenants. Hosted on [render](https://render.com/).

## Develop:

> In the root directory, run `pnpm install`, then:

### Dev 🛠️

```bash
pnpm dev
# runs site on port 3000 and docs on port 3001
```

Take a look [.env.example](packages/site/.env.example) to know what env vars are required.

### Test 🧪

```bash
# local
pnpm test

# docker - using the included convenience bash script
cd packages/site/tests && ./run-docker-test.sh
```

Requires [.env.test](packages/site/.env.test.example) for the db connection string. Will delete and set up the db on each run.

### Build 📦

```bash
pnpm build
```

## Deploy:

Site and docs are deployed on vercel as sepereate projects.

Settings:

> Site (vercel):

```bash
# build
pnpm build && pnpm run postbuild:vercel
# install
pnpm install --filter=@self/site
```

> Docs (vercel):

```bash
# build
pnpm build
# install
pnpm install --filter=@self/docs
# output dir
build
```

> /notify-all cron job (render.com):

```bash
# schedule
0 6 1,3,7,14 * *
# build
cd packages/utils && npm install && npm run build
# run
cd packages/utils && npm run start
```
