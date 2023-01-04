#!/bin/bash

echo "Getting latest translations from Tolgee..."

SCRIPT_DIR=$(dirname "$0")

ENV_FILE="$SCRIPT_DIR/../../../../../.env"

TOLGEE_KEY=$(grep TOLGEE_KEY "$ENV_FILE" | cut -d '=' -f2 | tr -d '"')

ZIP_FILE="$SCRIPT_DIR/generated/data.zip"

curl "https://app.tolgee.io/api/project/export/jsonZip?ak=$TOLGEE_KEY" --output "$ZIP_FILE"
unzip -o "$ZIP_FILE" -d "$SCRIPT_DIR/generated"
rm "$ZIP_FILE"
