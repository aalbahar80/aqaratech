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

```zsh
yarn run check
yarn run check:watch

# .ts
yarn run eslint -c ./.eslintrc.cjs --ext .ts .
# .svelte
yarn run eslint --ext .svelte .
yarn run eslint -c ./.eslintrc.cjs --ext .svelte .

# combine outputs:
{ yarn run eslint -c ./.eslintrc.cjs --ext .ts . & yarn run eslint -c ./.eslintrc.cjs --ext .svelte .; }

# temporal
yarn run eslint -c ./temporal/.eslintrc.cjs --ignore-path ./temporal/.eslintignore --ext .ts ./temporal

#21 March
yarn run eslint .
# Notes: add temporal/lib to .eslintignore in root. For some reason not picked up if placed in .eslintignore in /temporal
# Unanswered q's:
## Removing ignorePatterns: ['*.cjs'] from temporal/.eslintrc.cjs causes an error in vscode, but not when running eslint in command line?
```

> graphql eslint linter not fully wired up. See eslint config file.

```bash
yarn run vitest run
yarn run vitest watch
yarn run jest # old
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

To run standalone ts file:

## Example 1:

1. Use .cts extension

```zsh
tsc prisma/seed.cts
node prima/seed.cjs
```

OR

## Example 2:

a normal .ts file

- has to have an import/export for some reason

```ts
// primsa/seed.ts
import * as faker from '@faker-js/faker';
console.log(faker.faker.animal.bear());
```

this file can be run with

```zsh
node --loader ts-node/esm prisma/seed.ts
```

note: that the faker import had to be a bit weird.

## Example 3 (prisma):

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

# Prisma + Planetscale workflow

Create empty db using pscale

```bash
# To connect to db from terminal.
pscale connect <db-name>
```

```bash
# for shell access
pscale shell prisma-planetscale
## Some example mysql commands
# lists all tables
show tables;

#shows the sql statement required to recreate table, doesn't include table data
show create table Tenant;

# shows the rows of a table
select * from Tenant;
```

```bash
### WORKFLOW ###
# create new development db branch
pscale branch create <db-name> <new-branch-name>
# it inherits schema only not data
# modify the schema.prisma with your changes
pscale connect <db-name> <branch-name>
npx prisma db push # push schema changes to branch
# refresh schema
pscale branch refresh-schema <db-name> <branch-name>
# check the diff
pscale branch diff <db-name> <branch-name>
pscale branch diff <db-name> <branch-name> --web

# optionally seed and test new branch
npx prisma db seed # runs the seed script against the branch

# create a deploy request. Confirm it. Then delete branch.
pscale deploy-request create redb require-ispaid
pscale deploy-request deploy redb 2
pscale branch delete redb require-ispaid
# seed it with a script if u want, or visually in Prisma Studio
# create a deploy request on app.planetscale.com. Planetscale will check if changes are deployable. It will also visually show the diff. If all is well, confirm the deployment to go ahead. Delete the branch. At this point, the main branch has it's original data intact AND it now has the schema changes applied.
```

```bash
npx prisma generate # refresh the local prisma client
```
