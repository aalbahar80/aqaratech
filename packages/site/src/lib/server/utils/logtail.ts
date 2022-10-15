import { environment } from '$aqenvironment';
import { Logtail } from '@logtail/node';

export const logtail = new Logtail('qsYDfRpM2TXqyGeYhUNFReag');

const shouldEnableLogtail = () => {
	const liveEnvs = ['production', 'staging'];

	const result = liveEnvs.includes(environment.PUBLIC_AQARATECH_ENV);

	console.log(
		`Logtail enabled: ${result}, env: ${environment.PUBLIC_AQARATECH_ENV}`,
	);

	return result;
};

export const logtailEnabled = shouldEnableLogtail();
