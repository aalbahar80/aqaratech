#!/bin/bash

# A script that take a path as argument, then searches recursively for any file that contains the string string_decoder/ and replaces it with string_decoder:

# Usage: ./remove-slash.sh /path/to/your/project

if [ -z "$1" ]; then
    echo "Please provide a path to your project"
    exit 1
fi

find $1 -type f -exec sed -i 's/string_decoder\//string_decoder/g' {} \;
