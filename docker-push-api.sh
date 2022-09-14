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
docker build \
-t registry.digitalocean.com/aqtech/aqaratech-api:$VERSION \
-f "Dockerfile.backend" . && \
docker push \
registry.digitalocean.com/aqtech/aqaratech-api:$VERSION
