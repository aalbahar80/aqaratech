export const MESSAGE_TAG = {
	INVOICE_REMINDER: 'INVOICE_REMINDER',
	ROLE_INVITE: 'ROLE_INVITE',
} as const;

export type MessageTag = (typeof MESSAGE_TAG)[keyof typeof MESSAGE_TAG];
