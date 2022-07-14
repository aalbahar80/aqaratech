FROM mcr.microsoft.com/playwright:v1.22.0-focal

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
WORKDIR /app
COPY pnpm-lock.yaml ./
RUN pnpm fetch 

ADD . ./
RUN pnpm install -r --offline
EXPOSE 9323

# CMD ["bash"]
CMD [ "pnpm", "test"]