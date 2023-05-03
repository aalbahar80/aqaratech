export interface InvoiceSendData {
	id: string;
	amount: number;
	postAt: Date;
	portfolioId: string;
	organizationId: string;
	lease: {
		tenant: {
			id: string;
			phone: string | null;
			roles: { user: { email: string } }[];
		};
	};
}

export interface InvoiceSendInput {
	method: 'SMS' | 'EMAIL';
	invoice: InvoiceSendData;
}

export interface InvoiceSendSMSPayload {
	invoice: InvoiceSendData;
	paymentLink: string;
	method: 'SMS';
	phone: string;
}

export interface InvoiceSendEmailPayload {
	invoice: InvoiceSendData;
	paymentLink: string;
	method: 'EMAIL';
	emails: string[];
}

export type InvoiceSendPayload =
	| InvoiceSendSMSPayload
	| InvoiceSendEmailPayload;
