import { getAuthConfig } from '$lib/server/config/auth/auth-config';

import type { AuthConfigType } from '$lib/models/types/auth.type';

export const authConfig: AuthConfigType = getAuthConfig();
