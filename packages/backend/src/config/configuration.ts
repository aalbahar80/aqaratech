import { authConfig } from 'src/config/auth.config';
import { backendEnvSchema } from 'src/config/config-schema';
import { sentryConfig } from 'src/config/sentry.config';
import { winstonConfig } from 'src/config/winston.config';
import { EnvironmentConfig } from 'src/interfaces/environment.interface';

// TODO: log config at startup (except for secrets)
export default () => {
	const environment = backendEnvSchema.parse(process.env);

	return {
		...environment,
		auth: authConfig(environment),
		sentry: sentryConfig,
		winston: winstonConfig,
	} satisfies EnvironmentConfig;
};
