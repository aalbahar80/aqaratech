#!/bin/bash

# tsc --noEmit outputs file names in a relative path to sub-repo directory
# This scripts maps the file names to the monorepo root directory
# so that VSCode can properly find the files in the `problems` tab

# Groups
# 1: @self/
# 2: package name
# 3: :check:
# 4: relative path
# 5: rest of the line
pnpm run check:all --filter !\\@self/site | sed -E 's/^(@self\/)(.*)(.*:check: )(.*)(\(.*)$/\1\2\3packages\/\2\/\4\5/g'
