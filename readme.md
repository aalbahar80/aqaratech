# Site

```bash
# Run
pnpm install --filter=@self/site...
pnpm build --filter=@self/site...
## TODO: replace `pnpm run v-postbuild-new`

# Test
## TODO: Environment should have pscale cli
pnpm install --filter=@self/site-test...
pnpm build --filter=@self/site-test...
pnpm test --filter=@self/site-test
```

# Temporal

```bash
# Run
pnpm install --filter=@self/temporal...
pnpm build --filter=@self/temporal...
pnpm start --filter=@self/temporal

#test
pnpm install --filter=@self/temporal...
pnpm build --filter=@self/temporal...
pnpm test --filter=@self/temporal
```
