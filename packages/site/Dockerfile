# syntax=docker/dockerfile:1.4

FROM node:18.9-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY ./pruned .

# Don't run production as root
RUN addgroup --system --gid 1001 sveltejs
RUN adduser --system --uid 1001 sveltejs
USER sveltejs

EXPOSE 3000

# ORIGIN & PORT env vars should be available at runtime for adapter-node. 
# More info: https://github.com/sveltejs/kit/blob/master/packages/adapter-node/README.md#environment-variables
CMD node build/index.js
