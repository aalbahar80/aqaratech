#!/bin/bash

JAR_FILE="openapi-generator-cli-6.2.0.jar"

# check if openapi-generator-cli.jar exists in the current directory
if [ ! -f "$JAR_FILE" ]; then
  echo "Downloading $JAR_FILE..."
  # download openapi-generator-cli.jar
  # wget https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/6.1.0/openapi-generator-cli-6.1.0.jar -O ./openapi-generator-cli-6.1.0.jar
  wget https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/6.2.0/$JAR_FILE -O ./$JAR_FILE
else
  echo "$JAR_FILE already exists. Skipping download..."
fi

