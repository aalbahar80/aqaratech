# syntax=docker/dockerfile:1.4

FROM node:18.16-alpine

# For sentry.release. Git is not installed in the node-alpine image.
ARG PUBLIC_COMMIT_SHA
ENV PUBLIC_COMMIT_SHA=${PUBLIC_COMMIT_SHA}

# Allow larger uploads. Defaults to 512kb.
# More info: See definition in packages/utils/src/config/env/aqaratech-env.ts
ARG BODY_SIZE_LIMIT
ENV BODY_SIZE_LIMIT=${BODY_SIZE_LIMIT}

WORKDIR /app

# Install tier cli
RUN apk update && apk add wget tar
ARG TIER_CLI_VERSION=0.11.1
RUN wget --verbose https://github.com/tierrun/tier/releases/download/v${TIER_CLI_VERSION}/tier_${TIER_CLI_VERSION}_linux_amd64.tar.gz \
    && tar -xzvf tier_${TIER_CLI_VERSION}_linux_amd64.tar.gz \
    && rm tier_${TIER_CLI_VERSION}_linux_amd64.tar.gz

# Add tier to PATH
ENV PATH="${PATH}:/app"

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
