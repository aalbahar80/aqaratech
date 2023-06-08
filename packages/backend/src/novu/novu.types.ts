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
