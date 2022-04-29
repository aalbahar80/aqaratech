#!/bin/bash
git pull
pnpm install --filter=@self/temporal... --frozen-lockfile
pnpm run --filter=@self/temporal... build
pnpm start --filter=@self/temporal