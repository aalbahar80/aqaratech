import type { ITriggerPayloadOptions } from '@novu/node';

export interface SMSTemplate extends ITriggerPayloadOptions {
	to: {
		subscriberId: string;
		phone: string;
	};
}

export interface InvoiceReminderTemplate extends SMSTemplate {
	payload: {
		link: string;
	};
}
