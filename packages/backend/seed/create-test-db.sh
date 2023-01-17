#!/bin/bash

DATABASE_URL=$(awk '/^DATABASE_URL/' ../../.env.example | awk -F '=' '{print $2}')

set -e

echo "Starting script to create test database"

echo "Preparing DB. DATABASE_URL is $DATABASE_URL"

# If DATABASE_URL does not contain "localhost", abort and warn the user
if [[ $DATABASE_URL != *"localhost"* ]]; then
	echo "DATABASE_URL does not contain 'localhost'. Aborting."
	exit 1
fi

# check if the container is already running, if not, start it
if ! docker ps | grep test-postgres; then
	echo "Starting test-postgres container"
	docker run --rm --name test-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -d -p 5434:5432 postgres:14
fi

# poll until the server is ready
until docker exec test-postgres pg_isready -U postgres; do sleep 1; done

echo "Postgres is ready @ $DATABASE_URL. Note the port is $(echo $DATABASE_URL | awk -F ':' '{print $4}')"

cd ../backend

DATABASE_URL=$DATABASE_URL pnpm prisma migrate reset --force
