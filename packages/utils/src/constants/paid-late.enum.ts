export const PAID_LATE = {
	LATE: 'late',
	ON_TIME: 'on-time',
	ADVANCED: 'advanced',
	ALL: 'all',
} as const;

export type PaidLate = (typeof PAID_LATE)[keyof typeof PAID_LATE];
