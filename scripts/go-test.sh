#!/usr/bin/env bash

# A script to orchestrate building and testing in seprate tmux panes.

tmux send -t dev.2 'pb && tmux wait -S buildsignal && pp' 'C-m' &&
	tmux wait buildsignal &&
	echo "Build complete. Starting preview..." &&
	sleep 3 &&
	pnpm run test &&
	tmux send -t dev.2 'C-c'
