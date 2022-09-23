export class InvoiceSendEvent {
	constructor(
		public readonly email: string,
		public readonly invoice: { id: string; amount: number; postAt: Date },
	) {}
}
