import { Logtail } from '@logtail/node';

import { addEnvLabel, isLiveEnv } from '@self/utils';

import { environment } from '$aqenvironment';
import { privateEnvironment } from '$lib/server/config/private-environment';

/**
 * Only enable logtail in production & staging.
 */
const shouldEnableLogtail = () => {
	const result = isLiveEnv(environment.PUBLIC_AQARATECH_ENV);

	console.log(
		`Logtail enabled: ${result}, env: ${environment.PUBLIC_AQARATECH_ENV}`,
	);

	return result;
};

const createLogtailClient = () => {
	if (shouldEnableLogtail() && privateEnvironment.LOGTAIL_TOKEN) {
		console.log('Creating Logtail client');

		const client = new Logtail(privateEnvironment.LOGTAIL_TOKEN);

		client.use(addEnvLabel(environment.PUBLIC_AQARATECH_ENV));

		return client;
	} else {
		console.log('Logtail token not found in environment.');

		return undefined;
	}
};

export const logtail = createLogtailClient();
