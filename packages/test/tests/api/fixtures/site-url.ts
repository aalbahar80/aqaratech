import type { AqaratechEnv } from '@self/utils';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
export const siteURL = process.env
	.PUBLIC_SITE_URL as AqaratechEnv['PUBLIC_SITE_URL'];
