import { dev } from '$app/env';
import type { EnvironmentConfig } from '$models/interfaces/environment.interface';

import { developmentEnvironment } from './environment.dev';
import { stagingEnvironment } from './environment.stage';
// import { productionEnvironment } from './environment.prod';

// TODO: use vercel env vars to set the environment
export const environment: EnvironmentConfig = dev
	? developmentEnvironment
	: stagingEnvironment;
