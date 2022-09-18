# syntax=docker/dockerfile:1.4

FROM node:16-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY ./pruned .

# generate prisma client & install engine
RUN ./node_modules/.bin/prisma2 generate

EXPOSE 3002

CMD ["npm", "run", "start:prod"]