import type { AqaratechEnv } from '@self/utils';

// eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
export const apiURL = process.env
	.PUBLIC_API_URL as AqaratechEnv['PUBLIC_API_URL'];
