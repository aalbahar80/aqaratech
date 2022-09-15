#!/bin/bash

DATABASE_URL=$(awk '/^DATABASE_URL/' ../../.env.ci | awk -F '=' '{print $2}')

set -e

echo "Preparing DB. DATABASE_URL is $DATABASE_URL"

# create a docker container running postgresql
docker run --rm --name test-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -d -p 5434:5432 postgres && \

# poll until the server is ready
until docker exec test-postgres pg_isready -U postgres; do sleep 1; done && \
echo "Postgres is ready @ $DATABASE_URL" && \
mkdir prisma && \
cp ../backend/prisma/schema.prisma ./prisma/schema.prisma && \
cp -r ../backend/prisma/migrations ./prisma/migrations && \
DATABASE_URL=$DATABASE_URL npx prisma migrate reset --force
