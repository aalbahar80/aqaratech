import { env } from '$env/dynamic/public';
import type { EnvironmentConfig } from '$models/interfaces/environment.interface';
import { developmentEnvironment } from './environment.dev';
import { productionEnvironment } from './environment.prod';

export const environment: EnvironmentConfig =
	env.PUBLIC_AQARATECH_ENV === 'production'
		? productionEnvironment
		: developmentEnvironment;
