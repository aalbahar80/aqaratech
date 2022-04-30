# Site

### Run

```bash
pnpm install --filter=@self/site...
pnpm run --filter=@self/site... build
## TODO: replace `pnpm run v-postbuild-new`
```

### Test

```bash
# using the Dockerfile
cd packages/site/tests
./run-docker-test.sh
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

# Temporal

### Run

```bash
## TODO: Environment should have pscale cli/DB_URL
pnpm install --filter=@self/temporal...
pnpm run --filter=@self/temporal... build
pnpm start --filter=@self/temporal
```

### Test

```bash
pnpm install --filter=@self/temporal...
pnpm run --filter=@self/temporal... build
pnpm test --filter=@self/temporal
```
