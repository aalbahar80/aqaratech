import type { AqaratechEnv } from '@self/utils';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
export const apiURL = process.env
	.PUBLIC_API_URL as AqaratechEnv['PUBLIC_API_URL'];
