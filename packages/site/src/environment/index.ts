import { dev } from '$app/env';
import type { EnvironmentConfig } from '$models/interfaces/environment.interface';

import { developmentEnvironment } from './environment.dev';
import { productionEnvironment } from './environment.prod';

export const environment: EnvironmentConfig =
	dev || import.meta.env.VITE_VERCEL_ENV !== 'production'
		? developmentEnvironment
		: productionEnvironment;
