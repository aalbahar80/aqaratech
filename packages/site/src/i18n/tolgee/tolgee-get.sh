#!/bin/bash

echo "Getting latest translations from Tolgee..."

# Set TOLGEE_KEY to the value in the .env file
echo "Getting TOLGEE_KEY..."

TOLGEE_KEY=$(grep TOLGEE_KEY ../../../../.env | cut -d '=' -f2 | tr -d '"')

# Run the curl command
echo "Calling Tolgee API..."

curl "https://app.tolgee.io/api/project/export/jsonZip?ak=$TOLGEE_KEY" --output data.zip
unzip data.zip
rm data.zip
