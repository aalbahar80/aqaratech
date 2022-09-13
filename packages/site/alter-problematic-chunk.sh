#!/bin/bash

# bash script that inserts the following snippet into the problematic chunk:

# Snippet:
# import { createRequire } from "module";
# const require = createRequire(import.meta.url);

# Start of script

file="./build/server/chunk-BHN6OJC3.js"

# Check if the file exists
if [ -f $file ]; then
  echo "File exists"
else
  echo "File does not exist"
  exit 1
fi

# Check if the snippet is already in the file

if grep -q "import { createRequire } from \"module\";" $file; then
  echo "Snippet already exists"
  exit 0
else
  echo "Snippet does not exist"
fi

# Add the snippet to the file

sed -i 's/var __require =/\/\/ START OF SNIPPET\nimport { createRequire } from "module";\nconst require = createRequire(import.meta.url);\n\/\/ END OF SNIPPET\nvar __require =/g' $file

# End of script