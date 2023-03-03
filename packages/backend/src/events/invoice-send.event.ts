export interface InvoiceSendPayload {
	emails: string[];
	invoice: {
		id: string;
		amount: number;
		postAt: Date;
		portfolioId: string;
		organizationId: string;
	};
}
