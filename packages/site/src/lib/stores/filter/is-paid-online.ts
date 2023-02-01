import { writable } from '$lib/utils/sandboxed';

export const isPaidOnline = writable<boolean>(false);

export const PAY_METHOD = {
	ONLINE: 'Online',
	MANUAL: 'Manual',
} as const;

export type PayMethod = (typeof PAY_METHOD)[keyof typeof PAY_METHOD];
