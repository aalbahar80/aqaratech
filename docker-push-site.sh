#!/bin/bash

# allow passing a version as an argument, otherwise use the version from package.json suffixed with -dev

if [ -z "$1" ]; then
  VERSION=$(awk -F'"' '/"version": ".+"/{ print $4; exit; }' packages/site/package.json)-dev
else
  VERSION=$1
fi

# print the version
echo "Version: $VERSION"

# build
## .env is loaded to inject Docker ARGs
source ./.env && \
docker build \
-t registry.digitalocean.com/aqtech/aqaratech-site:$VERSION \
-f "Dockerfile.site" \
--build-arg PUBLIC_SITE_URL=$PUBLIC_SITE_URL . && \
docker push registry.digitalocean.com/aqtech/aqaratech-site:$VERSION