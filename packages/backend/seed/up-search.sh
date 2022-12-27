#!/bin/bash

isRunning=$(docker inspect -f '{{.State.Running}}' meili)

if [ "$isRunning" = "true" ]; then
	echo "MeiliSearch is already running"

	# Re-use
	exit 0

	# Force restart - might cause issues with testing (backend likes to start before meilisearch)
	# echo "Stopping MeiliSearch container"
	# docker stop meili
else
	echo "MeiliSearch is not running"
fi

echo "Starting MeiliSearch container"
docker run --rm -d -p 7700:7700 --name=meili getmeili/meilisearch:v0.28.1
