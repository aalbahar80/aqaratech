[![ci](https://github.com/ambiguous48/svelte_14dec21/actions/workflows/ci.yml/badge.svg)](https://github.com/ambiguous48/svelte_14dec21/actions/workflows/ci.yml)

# Install

```bash
pnpm install
```

# Testing

## Playwright

```bash
pnpm exec playwright test tests/login
```

## Vitest

```bash
yarn run vitest run
yarn run vitest watch
```

# Linting

```bash
pnpm run check:watch
pnpm exec eslint .
```

# Debugging (server)

```bash
# run vite preview then attach vscode debugger
npx vite preview --port 3000

# run build output then attach vscode debugger (need to install source-map-support for node)
pnpm add source-map-support -DE
pnpm build && node --inspect -r source-map-support/register build/index.js

# vite also has a debug flag

npx vite --port 3000 --debug
```

```json
// .vscode/launch.json
{
	"version": "0.2.0",
	"configurations": [
		{
			"type": "pwa-node",
			"request": "launch",
			"name": "sveltekit ssr: debug",
			"skipFiles": ["<node_internals>/**"],
			"args": ["--inspect", "node_modules/.bin/svelte-kit", "dev"]
		}
	]
}
```

# Prisma + Planetscale

## Basics

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

## Workflow

```bash
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

# Vscode .devcontainer

## Run in external terminal

```bash
docker ps
docker exec -it 2298007f379d bash
cd workspaces/svelte_14dec21/

node --inspect node_modules/.bin/svelte-kit dev
# or
pnpm dev
```

# Docker

```bash
docker build --pull --rm -f "Dockerfile.site" -t aqtech-site:latest "." && \
docker run --rm -it -p 2016:2016 aqtech-site:latest
```
