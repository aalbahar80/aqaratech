# syntax=docker/dockerfile:1.4

FROM node:18.16-alpine

# For sentry.release. Git is not installed in the node-alpine image.
ARG PUBLIC_COMMIT_SHA
ENV PUBLIC_COMMIT_SHA=${PUBLIC_COMMIT_SHA}

WORKDIR /app

# Add tools required for installing tier cli
RUN apk update && apk add wget tar

# Download and extract the "tier" binary
RUN wget --verbose https://github.com/tierrun/tier/releases/download/v0.8.0/tier_0.8.0_linux_amd64.tar.gz \
    && tar -xzvf tier_0.8.0_linux_amd64.tar.gz \
    && rm tier_0.8.0_linux_amd64.tar.gz

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
