# Site

## Dev

```bash
pnpm dev
```

## Build

```bash
pnpm build
```

## Test

```bash
pnpm test
```

## Vercel

root: packages/site

```bash
# build
pnpm build && pnpm run postbuild:vercel

# install
pnpm install
```

## Docker Test

```bash
# TODO: update to use turbo
cd packages/site/tests
./run-docker-test.sh
# result will be served on port 3001 to avoid conflict with any local playwright instances
```

```bash
## TODO: Environment should have pscale cli
pnpm install --filter=@self/site-test...
pnpm run --filter=@self/site-test... build
pnpm test --filter=@self/site-test
```
