#!/bin/bash

echo "Verifying Tolgee key..."

# Set TOLGEE_KEY to the value in the .env file
echo "Getting TOLGEE_KEY..."

TOLGEE_KEY=$(grep TOLGEE_KEY ../../../../../.env | cut -d '=' -f2 | tr -d '"')

# Run the curl command
echo "Calling Tolgee API..."

curl "https://app.tolgee.io/v2/api-keys/current" -H "X-API-Key: $TOLGEE_KEY" | jq
