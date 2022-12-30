#!/bin/bash

set -x
# set -e

session_name="check-watcher-session"
window_name="check-watcher-window"

trap "echo 'Killing session ${session_name}'; tmux kill-session -t ${session_name}" EXIT

# create session and set the initial window name
tmux new-session -d -s "${session_name}" -n "${window_name}"

# Commands for debugging
# command_1="sleep 2"
# command_2="sleep 3"

command_1="pnpm run --filter @self/site check:watch"
command_2="pnpm run --filter @self/backend check:watch"

# run command_1 in a temporary pane that automatically closes when the command exits
tmux split-window -t "${session_name}":"${window_name}" -P "${command_1}"

# run command_2 in a temporary pane that automatically closes when the command exits
tmux split-window -t "${session_name}":"${window_name}" -P "${command_2}"

# close the initial default pane
tmux kill-pane -t "${session_name}":"${window_name}.1"

# evenly distribute the panes
tmux select-layout -t "${session_name}":"${window_name}" tiled

# attach to the session
tmux attach-session -t "${session_name}"

# kill session
tmux kill-session -t "${session_name}"
