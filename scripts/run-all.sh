#!/bin/bash

set -x
set -e

session_name="mysession"
window_name="mywindow"

# Get the process ID of the current script
pid=$$

# Hook to exit running processes in tmux panes before our script is killed.
# Triggered by any of the kill commands below, or by the user pressing Ctrl+C.
trap "tmux send -t "${session_name}:${window_name}.1" 'C-c'; tmux send -t "${session_name}:${window_name}.2" 'C-c'; echo 'Cleanup complete'" EXIT

# Check if the tmux session already exists
if tmux has-session -t "${session_name}:${window_name}.1"; then
	# If the first pane exists, re-use it and clear its contents
	tmux clear-history -t "${session_name}:${window_name}.1"
	echo "Re-using pane 1"
else
	# If the session does not exist, create it and the panes
	tmux new-session -d -s "${session_name}" -n "${window_name}"
	echo "Creating session and panes"
fi

if tmux has-session -t "${session_name}:${window_name}.2"; then
	# If the second pane exists, re-use it and clear its contents
	# Exit any running process in the pane
	# tmux send-keys -t "${session_name}:${window_name}.2" 'C-c'
	tmux clear-history -t "${session_name}:${window_name}.2"
	echo "Re-using pane 2"
else
	# If the second pane does not exist, create it
	tmux split-window -v -t "${session_name}:${window_name}.1"
	echo "Creating pane 2"
fi

# Run pnpm run check in the first pane and wait for it to finish
tmux send -t "${session_name}:${window_name}.1" 'pnpm run check:all && tmux wait -S check || kill '"$pid"'' Enter
tmux wait check

# Run pnpm run lint in the first pane and wait for it to finish
tmux send -t "${session_name}:${window_name}.1" 'pnpm run lint:all && tmux wait -S lint || kill '"$pid"'' Enter
tmux wait lint

# Run pnpm run build in the first pane and wait for it to finish
tmux send -t "${session_name}:${window_name}.1" 'pnpm run build && tmux wait -S build || kill '"$pid"'' Enter
tmux wait build

# Run pnpm run preview in the second pane
tmux send -t "${session_name}:${window_name}.2" 'pnpm run preview || kill '"$pid"'' Enter

# Wait for servers to start using ./scripts/health-probe.sh
./scripts/health-probe.sh http://localhost:3002/health 10
./scripts/health-probe.sh http://localhost:3000/health 5

# Run pnpm run test in the first pane and wait for it to finish
tmux send -t "${session_name}:${window_name}.1" 'pnpm run test && tmux wait -S test || kill '"$pid"'' Enter
tmux wait test
