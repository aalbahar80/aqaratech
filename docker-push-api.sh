#!/bin/bash

# build
docker build -t aqaratech-api -f "Dockerfile.backend" .

# tag
docker tag aqaratech-api registry.digitalocean.com/aqtech/aqaratech-api

# push
docker push registry.digitalocean.com/aqtech/aqaratech-api
