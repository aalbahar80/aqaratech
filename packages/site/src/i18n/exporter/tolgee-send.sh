#!/bin/bash

echo "Sending translations to Tolgee..."

# Set TOLGEE_KEY to the value in the .env file
echo "Getting TOLGEE_KEY..."

TOLGEE_KEY=$(grep TOLGEE_KEY ../../../../.env | cut -d '=' -f2 | tr -d '"')

# Run the curl command
echo "Calling Tolgee API..."

curl "https://app.tolgee.io/v2/api-keys/current" -H "X-API-Key: $TOLGEE_KEY"
# https://app.tolgee.io/v2/projects/import
# curl "https://app.tolgee.io/v2/projects/import" -H "X-API-Key: $TOLGEE_KEY" -H "Content-Type: application/json" -d '{}'

# file_path: ../../myfile.json
# file_format: JSON

curl -X POST -H "X-API-Key: $TOLGEE_KEY" -H "Content-Type: application/json" -d @./myfile.json https://app.tolgee.io/v2/projects/import
