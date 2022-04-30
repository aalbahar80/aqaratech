#!/bin/bash

cd ../../..

docker build --pull --rm -f "Dockerfile" -t aqtech:latest "."

docker run --rm -p 3001:9323/tcp --name sitetest aqtech:latest