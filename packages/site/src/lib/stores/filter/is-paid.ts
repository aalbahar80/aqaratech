import { writable } from '$lib/utils/sandboxed';

export const isPaid = writable<true | false | undefined>(undefined);

export const PAID_STATUS = {
	PAID: 'Paid',
	UNPAID: 'Unpaid',
	ALL: 'All',
} as const;

export type PaidStatus = (typeof PAID_STATUS)[keyof typeof PAID_STATUS];
