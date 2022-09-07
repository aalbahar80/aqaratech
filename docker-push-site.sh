#!/bin/bash

# build (grabs values from .env)
source ./.env && docker build -t registry.digitalocean.com/aqtech/aqaratech-site -f "Dockerfile.site" --build-arg PUBLIC_AQARATECH_ENV=$PUBLIC_AQARATECH_ENV --build-arg PUBLIC_SITE_URL=$PUBLIC_SITE_URL --build-arg PUBLIC_API_URL=$PUBLIC_API_URL --build-arg PUBLIC_API_URL_LOCAL=$PUBLIC_API_URL_LOCAL --build-arg AUTH0_CLIENT_SECRET=$AUTH0_CLIENT_SECRET .

# push
docker push registry.digitalocean.com/aqtech/aqaratech-site
