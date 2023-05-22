export const PAY_PHASE = {
	LATE: 'LATE',
	ON_TIME: 'ON_TIME',
	ADVANCED: 'ADVANCED',
	ALL: 'ALL',
} as const;

export type PayPhase = (typeof PAY_PHASE)[keyof typeof PAY_PHASE];
