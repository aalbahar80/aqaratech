#!/usr/bin/env bash

set -e

VERSION="6.6.0"
JAR_FILE="openapi-generator-cli-$VERSION.jar"
CACHE_DIR="${XDG_CACHE_HOME:-$HOME/.cache}/openapi-generator"
mkdir -p "$CACHE_DIR"

# check if openapi-generator-cli.jar exists in the cache directory
if [ ! -f "$CACHE_DIR/$JAR_FILE" ]; then
	echo "Downloading $JAR_FILE..."
	# download openapi-generator-cli.jar
	# wget https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/6.1.0/openapi-generator-cli-6.1.0.jar -O ./openapi-generator-cli-6.1.0.jar
	wget https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/$VERSION/$JAR_FILE -O "$CACHE_DIR/$JAR_FILE"
else
	echo "$JAR_FILE already exists. Skipping download..."
fi

# Save without version number. Makes it simple for openapitools.json to refer to it.
# openapitools.json will always refer to the BASE_NAME, so make sure it points to the specific version.
BASE_NAME="openapi-generator-cli.jar"

ln -sf "$CACHE_DIR/$JAR_FILE" $BASE_NAME
