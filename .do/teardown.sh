#!/usr/bin/env bash

SPEC_NAME=$1
PROJECT_ID=$2

# Check SPEC_NAME is not empty
if [ -z "$SPEC_NAME" ]; then
	echo "No spec name provided"
	echo "Exiting..."
	exit 1
fi

# Check PROJECT_ID is not empty
if [ -z "$PROJECT_ID" ]; then
	echo "No project ID provided"
	echo "Exiting..."
	exit 1
fi

# List all apps
doctl apps list --output json | tee apps.json | jq

# Sample output: {["id": "1", "spec": {"name": "master"}], ["id": "2", "spec": {"name": "feature-1"}]}

# Get app ID
APP_ID=$(jq -r '.[] | select(.spec.name == "'$SPEC_NAME'") | .id' apps.json)

echo "App found. App ID: $APP_ID"

# Check APP_ID is not empty
if [ -z "$APP_ID" ]; then
	echo "No app ID found"
	echo "Exiting..."
	# don't exit with error code because sometimes the app was never created to begin with
	exit 0
fi

# Check that app belongs to the provided project before deleting
# Get a project's apps, then check if "do:app:$APP_ID" is in the list
echo "Checking if app belongs to specified project..."
doctl projects resources list $PROJECT_ID --output json | tee project-resources.json | jq

# Sample output: {["urn": "do:app:1", "status": "ok"], ["urn": "do:app:2", "status": "ok"]}

# Check if "do:app:$APP_ID" is in the list
if [[ $(jq -r '.[] | select(.urn == "do:app:'$APP_ID'") | .urn' project-resources.json) == "do:app:$APP_ID" ]]; then
	echo "Deleting app..."
	doctl apps delete $APP_ID --force
else
	echo "APP DOES NOT BELONG TO SPECIFIED PROJECT!"
	echo "Aborting..."
	exit 1
fi
