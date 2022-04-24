# Temporal

# Test

```bash
pnpm test

# Single test
pnpm exec vitest run test/notificationWF.test.ts
```

# 1. Deploy the server

https://www.youtube.com/watch?v=2oNsjyaCIrI
https://github.com/TomDoesTech/caddy-nodejs-docker-tutorial

```
git config --global credential.helper store
git clone https://github.com/ambiguous48/temporal-docker-test.git
chmod +x deploy.sh
```

# To run

```bash
cd /var/temporal-docker-test/
git pull # optional
docker-compose up -d

# to view logs: f=follow, t=timestamps
docker-compose logs -f -t
```

# 2. Deploy Worker

```bash
cd /var/
git config --global credential.helper store
git clone aqtech
cd aqtech

# install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
# Restart terminal to use nvm (or use displayed hint command)
nvm install 16.4.0
# nvm use 16.4.0

# install pnpm
npm install -g pnpm@next-7

# git pull
pnpm i

# set dburl env var
pnpm run build
pnpm run start
# OR USE PM2
pm2 start start.sh --name myTemporalWorker
pm2 ls # list
pm2 monit # monitor

```

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
# in repo directory:
# checkout temporal branch (optional)
# find way to not need yarn run build
# set env_var
export DATABASE_URL=VALUE

# dev
export DATABASE_URL='mysql://alavwhwsetxe:pscale_pw_WoU9XU0gR_C45USoI8JWiJhg6_8CrbH3or9KIuUWjqI@t1cp4lkeutv3.eu-central-2.psdb.cloud/aqaratechdb?sslaccept=strict'
# test
export DATABASE_URL='mysql://aki0pn3ea7cw:pscale_pw_gehwA1CETeGqhpnYoV3uR0u1Xk4UdMUMv4Ck8dU5uUA@z3p18h1dgra9.eu-central-1.psdb.cloud/aqaratechdb?sslaccept=strict'
yarn install
yarn run build:temporal # in watch mode?
yarn run start:worker.watch

# to run in background
nohup yarn run start:worker.watch &
# to view output
tail -f nohup.out # in same directory


```

```bash
# this should be enough, if start:worker.watch uses nodemon to restart and pick up the changes
# TODO figure out why DATABASE_URL env var not persisting
```

```bash
# to view all running processes
ps -df
# to quit
kill 124961
```

```zsh
## Removing ignorePatterns: ['*.cjs'] from temporal/.eslintrc.cjs causes an error in vscode, but not when running eslint in command line?
```

# Security (TLS)

Material:

https://docs.temporal.io/docs/typescript/security/#local-mtls-sample-tutorial

https://github.com/temporalio/samples-server/tree/main/tls/tls-simple

https://github.com/temporalio/samples-typescript/tree/main/hello-world-mtls

1. Clone https://github.com/temporalio/samples-server/tree/main/tls/tls-simple

- don't forget to run `docker exec -it tls-simple_temporal-admin-tools_1 tctl n re --retention 1 default`

Use the generated certificates (client.pem, client.key, ca.cert)
Use the other env vars (address=localhost, namespace=default, serverNameOverride=tls-sample)

Make sure a connection is suplied to both worker and client. Worker uses `NativeConnection`

# Troubleshooting

- Is worker running?
- Is server running?
- Which connection is client using
- Which connection is worker using?
- Are app and temporal using same DB branch?
- Was worker build with the --schema flag? (and rebuilt if there were any changes)
- Did you run npx prisma generate --schema=blah/blah before pnpm run build?
