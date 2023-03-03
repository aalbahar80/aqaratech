export const MESSAGE_TAG = {
	INVOICE_REMINDER: 'INVOICE_REMINDER',
} as const;

export type MessageTag = (typeof MESSAGE_TAG)[keyof typeof MESSAGE_TAG];
