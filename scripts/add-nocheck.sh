#!/usr/bin/env bash

# @ts-nocheck
sed -i '1 s/^/\/\/ @ts-nocheck\
/' packages/site/src/api/openapi/runtime.ts

# // eslint-disable-next-line @typescript-eslint/ban-ts-comment
sed -i '1 s/^/\/\/ eslint-disable-next-line @typescript-eslint\/ban-ts-comment\
/' packages/site/src/api/openapi/runtime.ts

# Remove unused eslint-disable directives
sed -i '/\/\* eslint-disable \*\//d' packages/site/src/api/openapi/index.ts

sed -i '/\/\* eslint-disable \*\//d' packages/site/src/api/openapi/apis/index.ts
