# Site

### Run

```bash
pnpm install --filter=@self/site...
pnpm run --filter=@self/site... build
## TODO: replace `pnpm run v-postbuild-new`
```

### Test

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
