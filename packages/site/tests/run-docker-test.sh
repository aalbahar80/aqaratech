#!/bin/bash

cd ../../..

docker stop sitetest

# remove exited containers
docker rm $(docker ps -qa --no-trunc --filter "status=exited")


# build new image
docker build --pull --rm -f "Dockerfile" -t aqtech:latest "."

# remove dangling images
docker rmi $(docker images --filter "dangling=true" -q --no-trunc)

# Run contaner from image
# use port 3001 to avoid conflict with a local playwright instance
docker run --rm -it -p 3001:9323/tcp --ipc=host --name sitetest aqtech:latest