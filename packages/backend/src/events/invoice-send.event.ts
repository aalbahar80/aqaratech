export interface InvoiceSendPayload {
	email: string;
	invoice: {
		id: string;
		amount: number;
		postAt: Date;
		portfolioId: string;
		organizationId: string;
	};
}
