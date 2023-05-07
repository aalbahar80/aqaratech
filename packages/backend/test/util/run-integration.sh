#!/usr/bin/env bash

set -e

DIR="$(cd "$(dirname "$0")" && pwd)"
DATABASE_URL="postgresql://postgres:postgres@localhost:5435/aq-db"
export DATABASE_URL
docker compose -f docker-compose-test.yml up -d
echo '🟡 - Waiting for database to be ready...'
"$DIR/wait-for-it.sh" -t 3 "${DATABASE_URL}" -- echo '🟢 - Database is ready!'
pnpm prisma migrate reset --force --skip-seed
pnpm vitest --run
