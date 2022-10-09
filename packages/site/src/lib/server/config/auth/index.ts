import { env } from '$env/dynamic/public';
import type { AuthConfigType } from '$lib/models/types/auth.type';
import {
	devAuthConfig,
	prodAuthConfig,
} from '$lib/server/config/auth/auth-config';

export const authConfig: AuthConfigType =
	env.PUBLIC_AQARATECH_ENV === 'production' ? prodAuthConfig : devAuthConfig;
