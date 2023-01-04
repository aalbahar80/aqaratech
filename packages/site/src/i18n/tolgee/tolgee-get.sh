#!/bin/bash

echo "Getting latest translations from Tolgee..."

SCRIPT_DIR=$(dirname "$0")

ENV_FILE="$SCRIPT_DIR/../../../../../.env"

TOLGEE_KEY=$(grep TOLGEE_KEY "$ENV_FILE" | cut -d '=' -f2 | tr -d '"')

curl "https://app.tolgee.io/api/project/export/jsonZip?ak=$TOLGEE_KEY" --output data.zip
unzip data.zip
rm data.zip
