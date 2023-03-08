#!/bin/bash

# Script to start the backend and site containers, most useful for debugging
# issues that only occur in production due to the docker setup

# Stop and remove any existing containers
docker compose -f docker-compose.yml down

# Clean out old pruned packages
rm -rf pruned
rm -rf packages/backend/pruned
rm -rf packages/site/pruned

# Build the packages
pnpm turbo build --filter @self/backend --filter @self/site

# Prune the packages
pnpm --filter @self/backend --prod deploy packages/backend/pruned
pnpm --filter @self/site --prod deploy packages/site/pruned

# Build docker images
docker compose -f docker-compose.yml up -d --build

# Wait until db is ready, then run migrations
until docker exec test-postgres pg_isready -U postgres; do sleep 1; done

# Create the database
pnpm -F @self/backend exec prisma migrate reset --force

# Attach to the compose logs
docker compose -f docker-compose.yml logs -f

# Stop the containers, and remove them
docker compose -f docker-compose.yml down

# Remove the pruned packages
rm -rf packages/backend/pruned
rm -rf packages/site/pruned
