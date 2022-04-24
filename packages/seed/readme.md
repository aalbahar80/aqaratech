# Prisma

Note: Verify DB Url in `seed/.env`, since it's different than `site/.env`

```bash
# Generate Client
pnpm exec prisma generate --schema=../site/prisma/schema.prisma
```

```bash
pnpm run seed
# or
npx ts-node-esm ./seed.ts
```

# TODO

Failsafe for not acting on production DB.
