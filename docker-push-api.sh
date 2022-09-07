#!/bin/bash

# build
docker build -t registry.digitalocean.com/aqtech/aqaratech-api -f "Dockerfile.backend" .

# push
docker push registry.digitalocean.com/aqtech/aqaratech-api
