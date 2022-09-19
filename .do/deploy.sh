#!/bin/bash

# Script that creates a new deployment for a DigitalOcean App Platform app using doctl

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
  .services[1].image.tag = strenv(DO_APP_NAME) |
  .jobs[0].image.tag = strenv(DO_APP_NAME) |
  .jobs[0].envs[2].value = strenv(DO_APP_NAME)
' ./.do/spec.yml

# Pretty print spec.yml using yq
yq . ./.do/spec.yml

# Set project as default
doctl projects update $DO_PROJECT_ID --is_default

# Check if app exists
echo "Checking if app exists..."
doctl apps list --output json | tee apps.json | jq

# Get app ID
APP_ID=$(jq -r '.[] | select(.spec.name == "'$DO_APP_NAME'") | .id' apps.json)

# If app exists, create a new deployment
if [ -z "$APP_ID" ]; then
  echo "App does not exist. Creating app..."
  doctl apps create --spec ./.do/spec.yml --upsert --output json | tee deployment.json | jq
  APP_ID=$(jq -r '.id' app.json)
else
  # Update app, then create a new deployment
  echo "App exists. Updating app..."
  doctl apps update $APP_ID --spec ./.do/spec.yml --output json | jq
  # Create a new deployment because it's the only way to "Force rebuild".
  # Otherwise, sometimes the new image is not pulled. Could be because the image tag is the same (e.g. "latest").
  echo "Forcing new deployment..."
  doctl apps create-deployment $APP_ID --force-rebuild --output json | jq
fi

# Check for errors in deployment
if [ $(jq '.errors | length' deployment.json) -gt 0 ]; then
  echo "Error deploying app"
  echo "Exiting..."
  exit 1
else
  echo "App deployed successfully"
fi