#!/bin/bash

# Script that creates a new deployment for a DigitalOcean App Platform app using doctl

# Get app name from arguments
DO_APP_NAME=$1

echo "Project ID: $DO_PROJECT_ID"

# If the project ID is empty, exit
if [ -z "$DO_PROJECT_ID" ]; then
  echo "No project ID found"
  echo "Exiting..."
  exit 1
fi

# Check DO_APP_NAME is not empty
if [ -z "$DO_APP_NAME" ]; then
  echo "No app name found"
  echo "Exiting..."
  exit 1
fi

# Prepare spec.yml using yq
yq -i '
  .name = strenv(DO_APP_NAME) |
  .services[0].image.tag = strenv(DO_APP_NAME) |
  .services[1].image.tag = strenv(DO_APP_NAME)
' ./.do/spec.yml

# Set project as default
doctl projects update $DO_PROJECT_ID --is_default

# Upsert app
doctl apps create --spec ./.do/spec.yml --upsert --output json --wait | jq