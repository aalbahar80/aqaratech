import type { AuthConfigType } from '$lib/models/types/auth.type';
import { getAuthConfig } from '$lib/server/config/auth/auth-config';

export const authConfig: AuthConfigType = getAuthConfig();
