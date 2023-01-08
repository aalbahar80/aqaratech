# syntax=docker/dockerfile:1.4

FROM node:18.9-alpine

# For sentry.release. Git is not installed in the node-alpine image.
ARG PUBLIC_COMMIT_SHA
ENV PUBLIC_COMMIT_SHA=${PUBLIC_COMMIT_SHA}

WORKDIR /app

ENV NODE_ENV=production

# Allow larger uploads. Defaults to 512kb.
# Docs: https://github.com/sveltejs/kit/tree/master/packages/adapter-node#body_size_limit
# GOTCHA: The limit (and any overrides) are only in effect when running app with node build/index.js.
# Running app with `vite dev/preview` has no limit.
ENV BODY_SIZE_LIMIT=100000000

COPY ./pruned .

# Don't run production as root
RUN addgroup --system --gid 1001 sveltejs
RUN adduser --system --uid 1001 sveltejs
USER sveltejs

EXPOSE 3000

# ORIGIN & PORT env vars should be available at runtime for adapter-node. 
# More info: https://github.com/sveltejs/kit/blob/master/packages/adapter-node/README.md#environment-variables
CMD node build/index.js
