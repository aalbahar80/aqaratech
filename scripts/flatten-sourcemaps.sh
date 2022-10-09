#!/bin/bash

echo PWD: $PWD

# clear out old files
rm -rf build-temp

# copy the build directory to a temporary directory
cp -r build build-temp

# remove the client directory from the build-temp directory
rm -rf build-temp/client

# flatten sourcemaps using sorcery
find build-temp -type f -name '*.js' -exec echo {} \; | xargs -I % /bin/bash -c 'echo flattening sourcemap: %; pnpm sorcery -i % || echo ERROR FLATTENING SOURCEMAP %'
