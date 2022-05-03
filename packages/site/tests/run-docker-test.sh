#!/bin/bash

cd ../../..

docker stop sitetest

docker build --pull --rm -f "Dockerfile" -t aqtech:latest "."

# use port 3001 to avoid conflict with a local playwright instance
docker run --rm -it -p 3001:9323/tcp --ipc=host --name sitetest aqtech:latest