#!/bin/bash

# A script that take a path as argument, then searches recursively for any file that contains the string string_decoder/ and replaces it with string_decoder:
# More info: https://github.com/sveltejs/kit/pull/7031

# Usage: ./remove-slash.sh /path/to/your/project

if [ -z "$1" ]; then
    echo "Please provide a path to your project"
    exit 1
fi

# For each file:
# 1. Check if it contains the string string_decoder/
# 2. If it does, print the file name
# 3. Replace string_decoder/ with string_decoder:
echo "Replacing string_decoder/ with string_decoder in the following files:"
find $1 -type f -exec grep -l 'string_decoder/' {} \; | xargs -I % /bin/bash -c 'echo %; sed -i "s/string_decoder\//string_decoder/g" %'
