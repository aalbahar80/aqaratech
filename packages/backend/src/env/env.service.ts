import { Injectable } from '@nestjs/common';

import { authConfig } from 'src/config/auth.config';
import { sentryConfig } from 'src/config/sentry.config';
import { winstonConfig } from 'src/config/winston.config';
import { backendEnvSchema } from 'src/env/env.schema';

@Injectable()
export class EnvService {
	readonly e = backendEnvSchema.parse(process.env);
	readonly auth = authConfig(backendEnvSchema.parse(process.env)); // TODO: dedupe schema parse
	readonly sentry = sentryConfig;
	readonly winston = winstonConfig;
}
