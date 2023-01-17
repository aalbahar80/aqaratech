#!/bin/bash

# tsc --noEmit outputs file names in a relative path to sub-repo directory
# This scripts maps the file names to the monorepo root directory
# so that VSCode can properly find the files in the `problems` tab

# Helpful:
# .vscode/tasks.json
# https://regex101.com/r/b0olch/1
# https://regex101.com/r/Ad250Y/1

# TODO:
# map /site which uses svelte-check (use the machine readable output option)
# map root directory

# Groups
# 1: @self/
# 2: package name
# 3: :check:
# 4: relative path
# 5: rest of the line
pnpm run check:all | sed -E 's/^(@self\/)(.*)(.*:check: )(.*)(\(.*)$/\1\2\3packages\/\2\/\4\5/g'
