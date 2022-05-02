FROM mcr.microsoft.com/playwright:v1.21.0-focal

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
WORKDIR /app
COPY pnpm-lock.yaml ./
RUN pnpm fetch 
# ENV DATABASE_URL=mysql://3343qb8mt0tn:pscale_pw_MBUYXD9fBxF2356mqzI6tIknIaHYWiro0zvq6FLDSPo@afyacyvnp26i.eu-central-1.psdb.cloud/aqaratechdb?sslaccept=strict
ENV DATABASE_URL=mysql://u4x3ta31vxc4:pscale_pw_y0XAHqm9CjiB3GaJaUYZ92-Ids3-bpkdRtYt_f2FVUA@9x0wz4ri6ydp.eu-central-1.psdb.cloud/aqaratechdb?sslaccept=strict
ENV DOCKER=true
ENV REUSE_PRISMA=true

ADD . ./
RUN pnpm install --filter=@self/site-test... --offline
RUN ["pnpm", "run", "--filter=@self/site", "prisma:gen"]
RUN ["pnpm", "run", "--filter=@self/temporal", "prisma:gen"]
RUN pnpm run --filter=@self/temporal build
EXPOSE 9323

# CMD ["bash"]
CMD [ "pnpm", "test", "--filter=@self/site-test" ]