#!/bin/bash

# The script takes two arguments, the url to check and the timeout. 
# It then checks the health endpoint every 5 seconds until the timeout is reached. 
# If the health endpoint returns a 200 status code, the script exits with a 0 status code.
# If the timeout is reached, the script exits with a 1 status code.

# Usage: health-probe.sh <url> <timeout>
# Example: health-probe.sh http://localhost:8080/health 60

url=$1
timeout=$2
interval=1
elapsed=0

echo "Checking $url every $interval seconds for $timeout seconds"

if [ $# -eq 0 ]; then
    echo "No arguments provided"

    echo "Usage: health-probe.sh <url> <timeout>"
    echo "Example: health-probe.sh http://localhost:8080/health 60"
    exit 1
fi

# check if correct url is provided
if [[ $url != http* ]]; then
    echo "Invalid url"
    exit 1
fi

# check if timeout is a number
if ! [[ $timeout =~ ^[0-9]+$ ]]; then
    echo "Invalid timeout"
    exit 1
fi

while [ $elapsed -lt $timeout ]; do
  status=$(curl -s -o /dev/null -w "%{http_code}" $url)
  if [ $status -eq 200 ]; then
    echo "$url is healthy"
    exit 0
  fi
  echo "$url not ready, waiting $interval seconds"
  sleep $interval
  elapsed=$((elapsed + interval))
done

echo "$url not ready after $timeout seconds"
exit 1
