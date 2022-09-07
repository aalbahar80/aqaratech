#!/bin/bash

# build
## .env is loaded to inject Docker ARGs
source ./.env && docker build -t registry.digitalocean.com/aqtech/aqaratech-site -f "Dockerfile.site" --build-arg PUBLIC_SITE_URL=$PUBLIC_SITE_URL .

# push
docker push registry.digitalocean.com/aqtech/aqaratech-site
