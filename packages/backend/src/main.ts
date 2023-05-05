import '@sentry/tracing';

import { bootstrap } from './create-app';

async function main() {
	const app = await bootstrap();
	await app.listen(3002);
}

void main();
