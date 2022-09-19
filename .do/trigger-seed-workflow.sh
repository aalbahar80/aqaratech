#!/bin/bash

# Script that triggers the `seed` workflow in GitHub Actions.
# Meant to be run after a new deployment is created from DigitalOcean App Platform.

# If database url does not "stage-db", exit and warn user
if [[ $DATABASE_URL != *"stage-db"* ]]; then
  echo "DATABASE_URL does not contain 'stage-db'"
  echo "Exiting..."
  exit 1
fi

curl \
  -X POST \
  -H "Accept: application/vnd.github+json" \ 
  -H "Authorization: Bearer $GH_TOKEN" \
  https://api.github.com/repos/aqaratech/aqtech/actions/workflows/seed/dispatches \
  -d '{"ref":"$GH_REF","inputs":{"db_url":"$DATABASE_URL"}}'