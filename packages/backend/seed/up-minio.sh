#!/bin/bash

isRunning=$(docker inspect -f '{{.State.Running}}' minio)

if [ "$isRunning" = "true" ]; then
	echo "Minio is already running"

	# Re-use
	exit 0

	# Force restart - might cause issues with testing (backend likes to start before meilisearch)
	# echo "Stopping Minio container"
	# docker stop minio
else
	echo "Minio is not running"
fi

echo "Starting Minio container"
docker run --rm -d --name=minio -p 9000:9000 -p 9001:9001 \
	quay.io/minio/minio server /data --console-address ":9001"
