import { env } from '$env/dynamic/public';
import {
	devAuthConfig,
	prodAuthConfig,
} from '$lib/environment/auth/auth-config';
import type { AuthConfigType } from '$lib/models/types/auth.type';

export const authConfig: AuthConfigType =
	env.PUBLIC_AQARATECH_ENV === 'production' ? prodAuthConfig : devAuthConfig;
