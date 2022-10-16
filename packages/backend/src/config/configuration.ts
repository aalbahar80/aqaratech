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

	return {
		...config,
		// TODO conf: remove type assertion after validating env config
		PUBLIC_AQARATECH_ENV: process.env.PUBLIC_AQARATECH_ENV!,
		LOGTAIL_TOKEN: process.env.LOGTAIL_TOKEN,
		sentry: sentryConfig,
		winston: winstonConfig,
	};
};
