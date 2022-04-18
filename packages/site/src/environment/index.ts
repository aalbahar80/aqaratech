import { dev } from '$app/env';
import type { EnvironmentConfig } from '$models/interfaces/environment.interface';

import { developmentEnvironment } from './environment.dev';
import { productionEnvironment } from './environment.prod';
// import { productionEnvironment } from './environment.prod';

// TODO: use vercel env vars to set the environment
export const environment: EnvironmentConfig =
	dev || import.meta.env.VITE_VERCEL_ENV !== 'production'
		? developmentEnvironment
		: productionEnvironment;
