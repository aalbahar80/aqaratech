import { writable } from '$lib/utils/sandboxed';

export const isPaidLate = writable<boolean | undefined>(undefined);

export const PAID_LATE = {
	LATE: 'late',
	NOT_LATE: 'not-late',
	ALL: 'all',
} as const;

export type PaidLate = (typeof PAID_LATE)[keyof typeof PAID_LATE];
