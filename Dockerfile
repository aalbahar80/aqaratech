FROM mcr.microsoft.com/playwright:v1.21.0-focal

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
WORKDIR /app
COPY pnpm-lock.yaml ./
RUN pnpm fetch 
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