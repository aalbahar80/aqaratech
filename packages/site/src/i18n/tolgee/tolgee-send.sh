#!/bin/bash

echo "Sending translations to Tolgee..."

TOLGEE_KEY=$(grep TOLGEE_KEY ../../../../../.env | cut -d '=' -f2 | tr -d '"')

url="https://app.tolgee.io/v2/projects/import"

# Set the list of files to include in the request body
files="-F files=@./sample.json"

curl -X POST -H "X-API-Key: $TOLGEE_KEY" "$files" $url | jq
