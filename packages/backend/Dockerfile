# syntax=docker/dockerfile:1.4

FROM node:18.16-alpine

# For sentry.release. Git is not installed in the node-alpine image.
ARG PUBLIC_COMMIT_SHA
ENV PUBLIC_COMMIT_SHA=${PUBLIC_COMMIT_SHA}

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

# generate prisma client & install engine
# consider deleting auto-installed debian prisma engine (and remove postinstall script)
RUN ./node_modules/.bin/prisma2 generate

# Don't run production as root
RUN addgroup --system --gid 1001 nestjs
RUN adduser --system --uid 1001 nestjs
USER nestjs

EXPOSE 3002

CMD ["npm", "run", "start:prod"]
