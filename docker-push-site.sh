#!/bin/bash

# build
## .env is loaded to inject Docker ARGs
source ./.env && \
docker build \
-t registry.digitalocean.com/aqtech/aqaratech-site:$(awk -F'"' '/"version": ".+"/{ print $4; exit; }' packages/site/package.json) \
-f "Dockerfile.site" \
--build-arg PUBLIC_SITE_URL=$PUBLIC_SITE_URL . && \
docker push registry.digitalocean.com/aqtech/aqaratech-site:$(awk -F'"' '/"version": ".+"/{ print $4; exit; }' packages/site/package.json)