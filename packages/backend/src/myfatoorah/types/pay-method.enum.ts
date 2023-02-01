export const MF_PAY_METHOD = {
	KNET: 1,
	VISA: 20,
	VISA2: 9,
} as const;

export type MfPayMethod = (typeof MF_PAY_METHOD)[keyof typeof MF_PAY_METHOD];
