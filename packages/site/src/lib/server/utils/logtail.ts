import { environment } from '$aqenvironment';
import { privateEnvironment } from '$lib/server/config/private-environment';
import { Logtail } from '@logtail/node';
import { addEnvLabel, liveEnvs } from '@self/utils';

/**
 * Only enable logtail in production & staging.
 */
const shouldEnableLogtail = () => {
	const result = liveEnvs.includes(environment.PUBLIC_AQARATECH_ENV);

	console.log(
		`Logtail enabled: ${result}, env: ${environment.PUBLIC_AQARATECH_ENV}`,
	);

	return result;
};

const createLogtailClient = () => {
	if (shouldEnableLogtail() && privateEnvironment.LOGTAIL_TOKEN) {
		const client = new Logtail(privateEnvironment.LOGTAIL_TOKEN);

		client.use(addEnvLabel(environment.PUBLIC_AQARATECH_ENV));
		return client;
	} else {
		console.warn('Logtail token not found in environment.');

		return undefined;
	}
};

export const logtail = createLogtailClient();
