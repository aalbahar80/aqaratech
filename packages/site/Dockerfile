# syntax=docker/dockerfile:1.4

FROM node:18.9-alpine as production

WORKDIR /app

ENV NODE_ENV=production

COPY  ./packages/site/package.json ./package.json

# In package.json, remove any line that contains "workspace:"
# This is a workaround to avoid having to install pnpm.
# Note: Check that we don't actually need any of the workspace packages in production.
RUN  sed -i '/workspace:/d' package.json
RUN npm install --omit=dev

# Don't run production as root
RUN addgroup --system --gid 1001 sveltejs
RUN adduser --system --uid 1001 sveltejs
USER sveltejs

COPY  ./packages/site/build ./build

EXPOSE 3000

# ORIGIN, PORT are for adapter-node: https://github.com/sveltejs/kit/blob/master/packages/adapter-node/README.md#environment-variables
CMD PORT=3000 node build/index.js
