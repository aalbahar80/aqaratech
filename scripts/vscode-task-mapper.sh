# pnpm run check:all --filter @self/utils | sed -E "s/^@self\/(?'name'.*):check: (?'relpath'[^\s].*)\((\d+|\d+,\d+|\d+,\d+,\d+,\d+)\):\s+(error|warning|info)\s+(TS\d+)\s*:\s*(.*)$/\1\1\2\2/g"
#pnpm run check:all --filter @self/utils | sed -E 's/^.*check: ([^\\s].*)\\((\\d+|\\d+,\\d+|\\d+,\\d+,\\d+,\\d+)\\):\\s+(error|warning|info)\\s+(TS\\d+)\\s*:\\s*(.*)$/\1\1\1\1/g'

# ^@self\/(?'name'.*):check: (?'relpath'[^\s].*)\((\d+|\d+,\d+|\d+,\d+,\d+,\d+)\):\s+(error|warning|info)\s+(TS\d+)\s*:\s*(.*)$

# pnpm run check:all --filter @self/utils | sed -E 's/^.*check: ([^\\s].*)$/\1/g'
# pnpm run check:all --filter @self/utils | sed -E 's/^.*check: ([\s].*)$/aaaaaaaaaaaaaaaaaaaaaa/g'

# kinda works:
# pnpm run check:all --filter @self/utils | sed -E 's/^.*check: ([^\s].*)$/\1/g'

#pnpm run check:all --filter @self/utils | sed -E 's/^(.*check: )([^\s].*)$/\1\n\1/g'

# ^.*check: ([^\s].*)(\(.*)$

# pnpm run check:all --filter @self/utils | sed -E 's/^(.*check: )([^\s].*)(\(.*)$/\1MYPACKAGEEEEEEEEEEEEEE\2\3/g'


# pnpm run check:all --filter @self/utils | sed -E 's/^(.*check:)([^\s].*)(\(.*)$/======1=\1=======2=\2=========3=\3============/g'
# pnpm run check:all --filter @self/utils | sed -E 's/^(.*check:)([^\s].*)(\(.*)$/======1=\1=======2=\2=========3=\3============/g'
# pnpm run check:all --filter @self/test | sed -E 's/^(.*check: )(.*)(\(.*)$/======1=\1=======2=\2=========3=\3=========/g'

# pnpm run check:all --filter @self/test | sed -E 's/^(.*check: )(.*)(\(.*)$/======1=\1=======2=\2=========3=\3=====proper===\1packages\/\1\2\3=======/g'

# pnpm run check:all --filter @self/test | sed -E 's/^(@self\/)(.*)(.*:check: )(.*)(\(.*)$/======1=\1=======2=\2=========3=\3========/g'

# Groups
# 1: @self/
# 2: package name
# 3: :check:
# 4: relative path
# 5: rest of the line
pnpm run check:all --filter @self/test | sed -E 's/^(@self\/)(.*)(.*:check: )(.*)(\(.*)$/\1\2\3packages\/\2\/\4\5/g'
