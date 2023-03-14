#!/usr/bin/env bash

echo "Flattening sourcemaps..."

# flatten sourcemaps using sorcery
find build/server -type f -name '*.js' -exec echo {} \; | xargs -I % /bin/bash -c 'echo flattening sourcemap: %; pnpm sorcery -i % || echo ERROR FLATTENING SOURCEMAP %'
