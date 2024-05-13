#!/usr/bin/env bash

# Scaffold a new worktree
# Example: https://chrisdicarlo.ca/blog/working-with-git-worktrees-part-2/

set -e

# Check if we're in a git worktree
if [ ! -e "./.git" ]; then
	echo "This is not a git worktree, aborting..."
	exit 1
fi

# Create .env files
OP_ACCOUNT=aqaratech.1password.com op inject -i .env.example -o .env
cp ./packages/backend/prisma/.env.example ./packages/backend/prisma/.env

# Install dependencies
pnpm install

# Run svelete-kit sync
pnpm -F @self/site exec svelte-kit sync

# Setup Turborepo
# Docs: https://turbo.build/repo/docs/ci/github-actions#remote-caching
if [ -z "$TURBO_TEAM" ] || [ -z "$TURBO_TOKEN" ]; then
	echo "Either TURBO_TEAM or TURBO_TOKEN is not set. To enable remote caching manually, run:"
	echo "pnpm turbo login"
	echo "pnpm turbo link"
else
	echo "TURBO_TEAM and TURBO_TOKEN environment variables are set, turborepo remote caching should be enabled."
	echo "TURBO_TEAM: $TURBO_TEAM"
fi
