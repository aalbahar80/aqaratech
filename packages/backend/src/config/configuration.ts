import { schema } from 'src/config/config-schema';
import { sentryConfig } from 'src/config/sentry.config';
import { winstonConfig } from 'src/config/winston.config';
import { EnvironmentConfig } from 'src/interfaces/environment.interface';

import { developmentEnvironment } from './configuration.dev';
import { productionEnvironment } from './configuration.prod';

// TODO: log config at startup (except for secrets)
export default (): EnvironmentConfig => {
	const config =
		process.env.PUBLIC_AQARATECH_ENV === 'production'
			? productionEnvironment()
			: developmentEnvironment();

	const environment = schema.parse(process.env);

	return {
		...config,
		PUBLIC_AQARATECH_ENV: environment.PUBLIC_AQARATECH_ENV,
		PUBLIC_AQ_DEBUG_LEVEL: environment.PUBLIC_AQ_DEBUG_LEVEL,
		LOGTAIL_TOKEN: environment.LOGTAIL_TOKEN,
		sentry: sentryConfig,
		winston: winstonConfig,
	};
};
