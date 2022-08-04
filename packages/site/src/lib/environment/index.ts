import type { EnvironmentConfig } from '$models/interfaces/environment.interface';
import { developmentEnvironment } from './environment.dev';
import { productionEnvironment } from './environment.prod';

export const environment: EnvironmentConfig =
	// use import.meta.env.VERCEL_ENV?
	// Docs say VITE_VERCEL_ENV is only available in build step
	process.env.VERCEL_ENV === 'production'
		? productionEnvironment
		: developmentEnvironment;
