# syntax=docker/dockerfile:1.4

FROM node:18.9-alpine

# For sentry.release. Git is not installed in the node-alpine image.
ARG PUBLIC_COMMIT_HASH
ENV PUBLIC_COMMIT_HASH=${PUBLIC_COMMIT_HASH}

WORKDIR /app

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