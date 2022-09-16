#!/bin/bash

# Script that creates a new deployment for a DigitalOcean App Platform app using doctl

# Get app name from arguments
# APP_ID=$1
# DO_APP_NAME="master"

DO_PROJECT_ID="95f2e61f-f483-4518-89ae-79b1d9200dd9"

echo "Project ID: $DO_PROJECT_ID"

# If the project ID is empty, exit
if [ -z "$DO_PROJECT_ID" ]; then
  echo "Project ID is empty"
  echo "Exiting..."
  exit 1
fi

# Check DO_APP_NAME is not empty
if [ -z "$DO_APP_NAME" ]; then
  echo "App name is empty"
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

# Create new app deployment
doctl apps create --spec ./.do/spec.yml --upsert --output json --wait