#!/bin/bash

# build
docker build \
-t registry.digitalocean.com/aqtech/aqaratech-api:$(awk -F'"' '/"version": ".+"/{ print $4; exit; }' packages/backend/package.json) \
-f "Dockerfile.backend" . && \
docker push \
registry.digitalocean.com/aqtech/aqaratech-api:$(awk -F'"' '/"version": ".+"/{ print $4; exit; }' packages/backend/package.json)
