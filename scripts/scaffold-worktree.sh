#!/bin/bash

# Scaffold a new worktree
# Example: https://chrisdicarlo.ca/blog/working-with-git-worktrees-part-2/

set -e

# Check if we're in a git worktree
if [ ! -f "./.git" ]; then
	echo "This is not a git worktree, aborting..."
	exit 1
fi

# Setup .env files

# Check if .env file exists in root
if [ -f "./.env" ]; then
	echo "A .env file already exists, aborting..."
	exit 1
fi

# Check if .env exists in ./packages/backend/prisma
if [ -f "./packages/backend/prisma/.env" ]; then
	echo "A .env file already exists in ./packages/backend/prisma, aborting..."
	exit 1
fi

# Create .env files
cp .env.example .env
cp ./packages/backend/prisma/.env.example ./packages/backend/prisma/.env

# Install dependencies
pnpm install

# Setup Turborepo
# Docs: https://turbo.build/repo/docs/ci/github-actions#remote-caching
if [ -z "$TURBO_TEAM" ] || [ -z "$TURBO_KEY" ]; then
	echo "Either TURBO_TEAM or TURBO_KEY is not set. To enable remote caching manually, run:"
	echo "pnpm turbo login"
	echo "pnpm turbo link"
else
	echo "TURBO_TEAM and TURBO_KEY environment variables are set, turborepo remote caching should be enabled."
	echo "TURBO_TEAM: $TURBO_TEAM"
fi
