import type { AuthConfigType } from '$models/types/auth.type';

export type EnvironmentType = 'DEVELOPMENT' | 'PRODUCTION';

export interface EnvironmentConfig {
	type: EnvironmentType;
	envName: 'dev' | 'prod';
	urlOrigin: string;
	authConfig: AuthConfigType;
	debug: boolean;
}
