#!/bin/bash

# Scaffold a new worktree

# Check if we're in a git repo
if [ ! -f "./.git" ]; then
	echo "This is not a git repository, aborting..."
	return
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

# TODO: Enable turbo remote caching
