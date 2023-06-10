import { z } from 'zod';

import { MESSAGE_TAG } from 'src/postmark/tags';

export interface SMSTemplateBase {
	subscriberId: string;
	phone: string;
}

export interface InvoiceReminderTemplate extends SMSTemplateBase {
	tag: typeof MESSAGE_TAG.INVOICE_REMINDER;
	payload: {
		link: string;
	};
}

export interface PhoneVerificationTemplate extends SMSTemplateBase {
	tag: typeof MESSAGE_TAG.PHONE_VERIFICATION;
	payload: {
		code: string;
	};
}

export type SMSTemplate = InvoiceReminderTemplate | PhoneVerificationTemplate;

export const messageSchema = z.object({
	id: z.string(),
	status: z.string(),
	phone: z.string().optional(),
	updatedAt: z.string(),
	subscriber: z.object({
		subscriberId: z.string(),
	}),
});

export const messagesSchema = z.array(messageSchema);

export const messagesResponseSchema = z.object({
	data: messagesSchema,
	page: z.number(),
	totalCount: z.number(),
	hasMore: z.boolean(),
	pageSize: z.number(),
});
