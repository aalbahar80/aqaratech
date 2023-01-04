#!/bin/bash

echo "Verifying Tolgee key..."

SCRIPT_DIR=$(dirname "$0")

ENV_FILE="$SCRIPT_DIR/../../../../../.env"

TOLGEE_KEY=$(grep TOLGEE_KEY "$ENV_FILE" | cut -d '=' -f2 | tr -d '"')

curl "https://app.tolgee.io/v2/api-keys/current" -H "X-API-Key: $TOLGEE_KEY" | jq
