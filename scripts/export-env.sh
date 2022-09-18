#!/bin/bash

# A script to set & export environment variables from a .env file
# Usage: ./export-env.sh .env

# NOTE: To export into the current shell, run the following command:
# source ./export-env.sh .env

# https://stackoverflow.com/a/13702462/9689661
# When running from package.json, replace source with . (dot), like this:
# . ./scripts/export-env.sh .env
#
# Sveltekit preview command:
# "preview": ". ../../scripts/export-env.sh ../../.env && PORT=3000 ORIGIN=$PUBLIC_SITE_URL node build/index.js",

# Start

ENV_FILE=$1

# warn if running without source
if [ "$BASH_SOURCE" = "$0" ]; then
  echo "WARNING: This script should be run with 'source' to export the environment variables into the current shell."
  echo "Example: source ./export-env.sh .env"
fi

# Check if the .env file exists
if [ ! -f "$ENV_FILE" ]; then
  echo "Environment file does not exist: $ENV_FILE"
  echo "Exiting..."
  exit 1
fi

# Set, log, and export the environment variables so they are available to subsequent commands
echo "Setting environment variables..."
while IFS= read -r LINE; do
  if [[ $LINE =~ ^[A-Za-z0-9_]+=.+$ ]]; then
    KEY=$(echo "$LINE" | cut -d '=' -f 1)
    VALUE=$(echo "$LINE" | cut -d '=' -f 2-)
    echo "$KEY=$VALUE"
    export "$KEY=$VALUE"
  fi
done < "$ENV_FILE"