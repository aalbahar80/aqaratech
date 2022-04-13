# Prisma

Note: Verify DB Url in `seed/.env`, since it's different than `site/.env`

```bash
# Generate Client
pnpm exec prisma generate --schema=../site/prisma/schema.prisma
```

```ts
// then import it like so:
// @ts-ignore
import pkg from "@prisma/client";
import type { PrismaClient as PrismaClientType } from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient() as PrismaClientType;
```

```bash
# run it
pnpm exec ts-node-esm ./seed.ts
# or
npx ts-node-esm ./seed.ts
```
