#!/bin/bash

# First argument is the source .env file
# Second argument is the destination .env file
# (OPTIONAL) Remaining rest arguments are the key names of environment variables taken from the current environment then appended to the destination .env file

# Options:
#   --force: Overwrite existing variables in the destination .env file

# Script uses getopt to parse options

# Example usage:
# ./set-env.sh .env .env PUBLIC_SITE_URL

# Example usage with options:
# ./set-env.sh .env .env PUBLIC_SITE_URL --force

# Example with options and multiple keys:
# ./set-env.sh .env .env PUBLIC_SITE_URL PUBLIC_API_URL --force

# Example without keys:
# ./set-env.sh .env .env

# Start

# Set the default values
FORCE=false

# Parse options
TEMP=$(getopt -o f --long force -n 'set-env.sh' -- "$@")
eval set -- "$TEMP"
while true; do
	case "$1" in
	-f | --force)
		FORCE=true
		shift
		;;
	--)
		shift
		break
		;;
	*)
		break
		;;
	esac
done

# Set the source .env file
SOURCE_ENV_FILE=$1

# Set the destination .env file
DESTINATION_ENV_FILE=$2

# Set the keys
KEYS=("${@:3}")

# Check if the source .env file exists
if [ ! -f "$SOURCE_ENV_FILE" ]; then
	echo "Source .env file does not exist: $SOURCE_ENV_FILE"
	echo "Exiting..."
	exit 1
fi

# Check if the destination .env file exists
if [ ! -f "$DESTINATION_ENV_FILE" ]; then
	echo "Destination .env file does not exist: $DESTINATION_ENV_FILE"
fi

# If the destination file exists and the force option is not set, exit
if [ -f "$DESTINATION_ENV_FILE" ] && [ "$FORCE" = false ]; then
	echo "Destination .env file already exists: $DESTINATION_ENV_FILE"
	echo "Use the --force option to overwrite the destination .env file"
	echo "Exiting..."
	exit 1
fi

# Check if the keys are of existing environment variables
for KEY in "${KEYS[@]}"; do
	if [ -z "${!KEY}" ]; then
		echo "Key does not exist: $KEY"
		echo "Exiting..."
		exit 1
	fi
done

# Copy the source .env file to the destination .env file
echo "Copying $SOURCE_ENV_FILE to $DESTINATION_ENV_FILE"
cp "$SOURCE_ENV_FILE" "$DESTINATION_ENV_FILE"

echo "Setting environment variables..."

# Append a blank line to the destination .env file
echo "" >>"$DESTINATION_ENV_FILE"
echo "# Variables set by set-env.sh:" >>"$DESTINATION_ENV_FILE"

# Set the environment variables
for KEY in "${KEYS[@]}"; do
	echo "$KEY=${!KEY}" >>"$DESTINATION_ENV_FILE"
done
