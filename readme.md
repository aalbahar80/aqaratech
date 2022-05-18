# Site

### Run

```bash
pnpm install --filter=@self/site...
pnpm run --filter=@self/site... build
## TODO: replace `pnpm run v-postbuild-new`
```

### Test

#### Local

```bash
# It's important to reuse the Prisma instance when running tests to avoid connection pooling limits
# To do that: Set REUSE_PRISMA=TRUE in site/.env
cd packages/site/tests
pnpm test
```

#### Docker

```bash
# using the Dockerfile
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

### Vercel

```bash
## build
pnpm run build:vercel

## install
pnpm install --filter=@self/site... --unsafe-perm
```
