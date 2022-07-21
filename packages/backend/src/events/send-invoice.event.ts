export class SendInvoiceEvent {
  constructor(
    public readonly email: string,
    public readonly invoice: { id: string; amount: number; postAt: Date },
  ) {}
}
