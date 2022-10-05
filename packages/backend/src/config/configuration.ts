import { sentryConfig } from 'src/config/sentry.config';
import { developmentEnvironment } from './configuration.dev';
import { productionEnvironment } from './configuration.prod';

// TODO: log config at startup (except for secrets)
export default () => {
	const config =
		process.env.PUBLIC_AQARATECH_ENV === 'production'
			? productionEnvironment()
			: developmentEnvironment();

	return {
		...config,
		sentry: sentryConfig,
	};
};
