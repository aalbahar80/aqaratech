FROM mcr.microsoft.com/playwright:v1.21.0-focal

RUN npm install -g pnpm@next-7
WORKDIR /app

COPY ./ ./

RUN pnpm install --filter=@self/site-test... --frozen-lockfile
RUN pnpm run --filter=@self/site-test build
RUN pnpm run --filter=@self/temporal build

EXPOSE 9323
ENV DATABASE_URL=mysql://3343qb8mt0tn:pscale_pw_MBUYXD9fBxF2356mqzI6tIknIaHYWiro0zvq6FLDSPo@afyacyvnp26i.eu-central-1.psdb.cloud/aqaratechdb?sslaccept=strict

# CMD ["bash"]
CMD [ "pnpm", "test", "--filter=@self/site-test" ]