#!/bin/bash
git pull
pnpm install --filter=@self/temporal... --frozen-lockfile
pnpm build --filter=@self/temporal...
pnpm start --filter=@self/temporal