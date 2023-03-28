export const PAID_LATE = {
	LATE: 'LATE',
	ON_TIME: 'ON_TIME',
	ADVANCED: 'ADVANCED',
	ALL: 'ALL',
} as const;

export type PaidLate = (typeof PAID_LATE)[keyof typeof PAID_LATE];
