# syntax=docker/dockerfile:1.4

FROM mcr.microsoft.com/playwright:v1.25.2-focal

RUN npm install -g pnpm

WORKDIR /app

ADD . ./

RUN pnpm install -F @self/test...

# Prisma shenanigans
COPY ./packages/backend/prisma ./packages/seed/prisma
RUN cd packages/seed && pnpm dlx prisma generate

RUN pnpm -F @self/test... run build

CMD pnpm run test