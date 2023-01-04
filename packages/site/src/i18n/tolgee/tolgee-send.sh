#!/bin/bash

echo "Sending translations to Tolgee..."

SCRIPT_DIR=$(dirname "$0")

ENV_FILE="$SCRIPT_DIR/../../../../../.env"

TOLGEE_KEY=$(grep TOLGEE_KEY "$ENV_FILE" | cut -d '=' -f2 | tr -d '"')

url="https://app.tolgee.io/v2/projects/import"

# Set the list of files to include in the request body
OUTPUT_FILE="$SCRIPT_DIR/i18n-output.json"

files="-F files=@$OUTPUT_FILE"

curl -X POST -H "X-API-Key: $TOLGEE_KEY" "$files" $url | jq
