
[![ci](https://github.com/ambiguous48/svelte_14dec21/actions/workflows/ci.yml/badge.svg)](https://github.com/ambiguous48/svelte_14dec21/actions/workflows/ci.yml)
# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte);

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm init svelte@next

# create a new project in my-app
npm init svelte@next my-app
```

> Note: the `@next` is temporary

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.

## Linting

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
yarn run check
```

```bash
yarn run check
yarn run check:watch

yarn eslint . --ext .ts,.svelte,.graphql
```

> graphql eslint linter not fully wired up. See eslint config file.

```bash
yarn run jest
```

## Run in external terminal

```bash
docker ps
docker exec -it 2298007f379d bash
cd workspaces/svelte_14dec21/

node --inspect node_modules/.bin/svelte-kit dev
# or
yarn dev
```

## Upgrading packages

```bash
yarn upgrade-interactive --latest

# for packages that use @next tag
yarn upgrade @sveltejs/kit@next
yarn upgrade @sveltejs/adapter-auto@next
```

```bash
# run cypress headed
yarn run cypress run --headed -s "cypress/integration/*.spec.ts"

# run cypress headless
yarn run cypress run -s "cypress/integration/*.spec.ts"

# watch mode

```
## In dev
- svelte-check watch mode
- eslint watch mode
- cypress watch mode

## Before committing

- Run Cypress / jest?
- Run lint
- Run formatter



```zsh
# supabase type generation
npx openapi-typescript https://datxutuqogarvvqnhxel.supabase.co/rest/v1/?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzY3NTg0OSwiZXhwIjoxOTU5MjUxODQ5fQ.2Q3C3dQwhonuTMB_k2P5-E2pT60PBBd9mauiE7ibcLE --output src/lib/types/supabase.ts
```

Prisma note:
```zsh
# to run prisma.ts file
# this does it on the fly without saving it to .js first (I think)
# useful for testing queries etc
# might need to install ts-node first?
# https://github.com/prisma/prisma/issues/5030#issuecomment-932823661
# https://github.com/prisma/prisma/discussions/9027#discussioncomment-1585810
# https://github.com/prisma/prisma/pull/4920#issuecomment-960373111
# https://github.com/noahsalvi/helvetikon/blob/a6b448f4067c7c467f31635518923a7b828e9529/src/lib/prisma.ts
# https://github.com/prisma/prisma/issues/6491#issuecomment-847141591
# full sveltekit + prisma setup https://github.com/mikenikles/sveltekit-prisma
node --loader ts-node/esm src/lib/config/prisma.ts
```

```ts
// src/lib/config/prisma.ts
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
	const allTenants = await prisma.tenants.findMany();
	console.log('sdf');
	console.log(allTenants);
}

main()
	.catch((e) => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
```

Initial prisma implementation taken from:
https://github.com/mikenikles/sveltekit-prisma