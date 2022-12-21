#!/bin/bash

# @ts-nocheck
sed -i '1 s/^/\/\/ @ts-nocheck\
/' packages/site/src/api/openapi/runtime.ts

# // eslint-disable-next-line @typescript-eslint/ban-ts-comment
sed -i '1 s/^/\/\/ eslint-disable-next-line @typescript-eslint\/ban-ts-comment\
/' packages/site/src/api/openapi/runtime.ts
