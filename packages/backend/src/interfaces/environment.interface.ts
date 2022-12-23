import { NodeOptions } from '@sentry/node';
import { LoggerOptions } from 'winston';

import { BackendEnvSchema } from 'src/config/config-schema';

import type { AuthConfigType } from '../types/auth.type';

export interface EnvironmentConfig extends BackendEnvSchema {
	auth: AuthConfigType;
	winston: LoggerOptions;
	sentry: NodeOptions;
}
