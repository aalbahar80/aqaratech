#!/bin/bash

isRunning=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:7700/health)

if [ $isRunning -eq 200 ]; then
	echo "MeiliSearch is already running"
else
	echo "MeiliSearch is not running"

	# start it
	echo "Starting MeiliSearch"
	docker run --rm -d -p 7700:7700 -v "$(pwd)/meili_data:/meili_data" getmeili/meilisearch:v0.28.1
fi
