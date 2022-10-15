import { environment } from '$aqenvironment';
import { Logtail } from '@logtail/node';
import type { Middleware } from '@logtail/types';

export const logtail = new Logtail('qsYDfRpM2TXqyGeYhUNFReag');

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

logtail.use(enrichLogs);

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

export const logtailEnabled = shouldEnableLogtail();
