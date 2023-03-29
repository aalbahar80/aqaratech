import { isLiveEnv } from '@self/utils';

import type { CookieSerializeOptions } from 'cookie';

import { environment } from '$lib/environment';

/** Explicitly disable httpOnly and secure cookies for local development.
 * Otherwise won't work when origin is not localhost. For example, when using
 * another device on local network. */
export const COOKIE_OPTIONS: CookieSerializeOptions = {
	httpOnly: isLiveEnv(environment.PUBLIC_AQARATECH_ENV),
	secure: isLiveEnv(environment.PUBLIC_AQARATECH_ENV),
};
