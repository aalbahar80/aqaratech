#!/bin/bash

DATABASE_URL=$(awk '/^DATABASE_URL/' ../../.env.ci | awk -F '=' '{print $2}')

set -e

echo "Preparing DB. DATABASE_URL is $DATABASE_URL"

# check if the container is already running, if not, start it
if ! docker ps | grep test-postgres; then
  echo "Starting test-postgres container"
  docker run --rm --name test-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -d -p 5434:5432 postgres:14
fi

# poll until the server is ready
until docker exec test-postgres pg_isready -U postgres; do sleep 1; done

echo "Postgres is ready @ $DATABASE_URL. Note the port is $(echo $DATABASE_URL | awk -F ':' '{print $4}')"

# create prisma dir if it doesn't exist
rm -rf prisma
mkdir -p prisma

# copy schema/migrations, overwriting any existing files
cp ../backend/prisma/schema.prisma prisma/schema.prisma
cp -r ../backend/prisma/migrations prisma/migrations

DATABASE_URL=$DATABASE_URL npx prisma migrate reset --force
