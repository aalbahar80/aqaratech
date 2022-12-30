#!/bin/bash

set -x
# set -e

session_name="mysession"
window_name="mywindow"

# TODO: avoid using -d detached flag. Instead, attach and kill the session in trap

# if session does not exist, create it and set the initial window name
tmux has-session -t "${session_name}" || tmux new-session -d -s "${session_name}" -n "${window_name}"

# if window does not exist, create it
# tmux new-window -t "${session_name}" -n "${window_name}"

# if window has more than one pane, exit with error indicating that the window has leftovers from a previous run
if [ "$(tmux list-panes -t "${session_name}":"${window_name}" | wc -l)" -gt 1 ]; then
	echo >&2 "Error: window has leftover panes from a previous run"
	exit 1
fi

# Commands for debugging
# command_1="sleep 2"
# command_2="sleep 3"

command_1="pnpm run --filter @self/site check:watch"
command_2="pnpm run --filter @self/backend check:watch"

# run command_1 in a temporary pane that automatically closes when the command exits
tmux split-window -t "${session_name}":"${window_name}" -P "${command_1}"

# run command_2 in a temporary pane that automatically closes when the command exits
tmux split-window -t "${session_name}":"${window_name}" -P "${command_2}"
