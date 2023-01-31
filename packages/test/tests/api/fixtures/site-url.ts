import type { AqaratechEnv } from '@self/utils';

// eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
export const siteURL = process.env
	.PUBLIC_SITE_URL as AqaratechEnv['PUBLIC_SITE_URL'];
