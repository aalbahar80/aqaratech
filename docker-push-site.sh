#!/bin/bash

# build
docker build -t registry.digitalocean.com/aqtech/aqaratech-site -f "Dockerfile.site" .

# push
docker push registry.digitalocean.com/aqtech/aqaratech-site
