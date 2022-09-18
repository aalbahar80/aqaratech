# syntax=docker/dockerfile:1.4

# https://github.com/mhart/alpine-node#example-dockerfile-for-your-own-nodejs-project
# TODO optimize production build: https://towardsdev.com/nestjs-app-in-docker-47239ca0545c
# Optimize: https://docs.docker.com/get-started/09_image_best/

FROM node:16 as builder

# Blocked by https://github.com/stalniy/casl/issues/621

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /app

COPY pnpm-lock.yaml ./

RUN pnpm fetch 

ADD . ./

# ENV PRISMA_SKIP_POSTINSTALL_GENERATE=1

# Frozen lockfile here?
RUN pnpm --filter=. --filter=@self/backend... install --offline

RUN pnpm run build:backend


FROM builder as pruned

RUN pnpm --filter @self/backend --prod deploy pruned


FROM node:16-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=pruned /app/pruned .

# generate prisma client & install engine
RUN ./node_modules/.bin/prisma2 generate

# NO-OP, for convenience only
EXPOSE 3002

CMD ["npm", "run", "start:prod"]