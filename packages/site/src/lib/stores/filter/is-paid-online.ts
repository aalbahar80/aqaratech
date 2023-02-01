import { writable } from '$lib/utils/sandboxed';

export const isPaidOnline = writable<boolean | undefined>(undefined);

export const PAY_METHOD = {
	ONLINE: 'online',
	MANUAL: 'manual',
	ALL: 'all',
} as const;

export type PayMethod = (typeof PAY_METHOD)[keyof typeof PAY_METHOD];
