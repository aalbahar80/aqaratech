FROM mcr.microsoft.com/playwright:v1.21.1-focal

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
WORKDIR /app
COPY pnpm-lock.yaml ./
RUN pnpm fetch 
ENV DOCKER=true
ENV TEST_DB=1

ADD . ./
RUN pnpm install -r --offline
RUN ["pnpm", "run", "--filter=@self/site", "prisma:gen"]
EXPOSE 9323

# CMD ["bash"]
CMD [ "pnpm", "test", "--filter=@self/site-test" ]
# CMD cd packages/site/tests && npx playwright test && npx playwright show-report