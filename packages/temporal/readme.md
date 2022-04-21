# Temporal

# 1. Deploy the server

https://www.youtube.com/watch?v=2oNsjyaCIrI
https://github.com/TomDoesTech/caddy-nodejs-docker-tutorial

git config --global credential.helper store
git clone https://github.com/ambiguous48/temporal-docker-test.git
chmod +x deploy.sh

# To run

```bash
cd /var/temporal-docker-test/
git pull # optional
docker-compose up -d

# to view logs: f=follow, t=timestamps
docker-compose logs -f -t
```

# 2. Deploy Worker

2. yarn run dev:temporal
3. yarn run start:workflow
   Both temporal workers and clients need to connect to a Temporal server.
   https://docs.temporal.io/docs/typescript/nextjs-tutorial#deploying-your-temporal--nextjs-app

- Workers can connect like so:

```ts
await Core.install({
	serverOptions: {
		address: "temporal.letand.be",
	},
});
```

- Clients can connect like so:

```ts
const connection = new Connection({
	address: "temporal.letand.be",
});
const client = new WorkflowClient(connection.service);
```

Temporal worker:

```bash
git clone this repo
# install node 16.4.0 using nvm
nvm install 16.4.0
nvm use 16.4.0
install yarn
# in repo directory:
# checkout temporal branch (optional)
# find way to not need yarn run build
# set env_var
export DATABASE_URL=VALUE
yarn install
yarn run build:temporal # in watch mode?
yarn run start:worker.watch

# to run in background
nohup yarn run start:worker.watch &
# to view output
tail -f nohup.out # in same directory
```

```bash
# updating code workflow
git pull
yarn run build:temporal
# this should be enough, if start:worker.watch uses nodemon to restart and pick up the changes
# TODO figure out why DATABASE_URL env var not persisting
```

```bash
# to view all running processes
ps -df
# to quit
kill 124961
```
