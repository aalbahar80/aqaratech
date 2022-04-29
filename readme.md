# Site

### Run

```bash
pnpm install --filter=@self/site...
pnpm build --filter=@self/site...
## TODO: replace `pnpm run v-postbuild-new`
```

### Test

```bash
## TODO: Environment should have pscale cli
pnpm install --filter=@self/site-test...
pnpm build --filter=@self/site-test...
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
pnpm build --filter=@self/temporal...
pnpm start --filter=@self/temporal
```

### Test

```bash
pnpm install --filter=@self/temporal...
pnpm build --filter=@self/temporal...
pnpm test --filter=@self/temporal
```
