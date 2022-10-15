import { environment } from '$aqenvironment';
import { privateEnvironment } from '$lib/server/config/private-environment';
import { Logtail } from '@logtail/node';
import type { Middleware } from '@logtail/types';

/*
 * Middleware to add `environment` info to logtail logs.
 */
// eslint-disable-next-line @typescript-eslint/require-await
export const enrichLogs: Middleware = async (log) => {
	return {
		...log,
		environment: environment.PUBLIC_AQARATECH_ENV,
	};
};

/**
 * Only enable logtail in production & staging.
 */
const shouldEnableLogtail = () => {
	const liveEnvs = ['production', 'staging'];

	const result = liveEnvs.includes(environment.PUBLIC_AQARATECH_ENV);

	console.log(
		`Logtail enabled: ${result}, env: ${environment.PUBLIC_AQARATECH_ENV}`,
	);

	return result;
};

const createLogtailClient = () => {
	if (shouldEnableLogtail() && privateEnvironment.LOGTAIL_TOKEN) {
		const client = new Logtail(privateEnvironment.LOGTAIL_TOKEN);

		client.use(enrichLogs);
		return client;
	} else {
		console.warn('Logtail token not found in environment.');

		return undefined;
	}
};

export const logtail = createLogtailClient();
