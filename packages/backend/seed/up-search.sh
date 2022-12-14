#!/bin/bash

isRunning=$(docker inspect -f '{{.State.Running}}' meili)

if [ "$isRunning" -eq 200 ]; then
	echo "MeiliSearch is already running"

	echo "Stopping MeiliSearch container"
	docker stop meili
	sleep 3
else
	echo "MeiliSearch is not running"
fi

echo "Starting MeiliSearch container"
docker run --rm -d -p 7700:7700 --name=meili getmeili/meilisearch:v0.28.1
