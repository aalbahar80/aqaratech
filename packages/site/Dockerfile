FROM node:18.9-alpine as production

WORKDIR /app

ENV NODE_ENV=production

# Don't run production as root
RUN addgroup --system --gid 1001 sveltejs
RUN adduser --system --uid 1001 sveltejs
USER sveltejs

COPY  ./packages/site/build ./build
COPY  ./packages/site/package.json ./package.json

EXPOSE 3000

# ORIGIN, PORT are for adapter-node: https://github.com/sveltejs/kit/blob/master/packages/adapter-node/README.md#environment-variables
CMD PORT=3000 node build/index.js
