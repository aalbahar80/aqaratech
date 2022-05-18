import type { EnvironmentConfig } from '$models/interfaces/environment.interface';
import { developmentEnvironment } from './environment.dev';
import { productionEnvironment } from './environment.prod';

export const environment: EnvironmentConfig =
	process.env.VERCEL_ENV !== 'production'
		? developmentEnvironment
		: productionEnvironment;
