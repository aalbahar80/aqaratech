
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
