import type { Json } from '@self/utils';

export interface CreatePaymentLinkParams {
	callbackUrl: string;

	amount: number;

	/** LeaseInvoiceId. Our reference for the invoice. */
	reference: string;

	/** OrganizationId. To be stored in `UserDefinedField`. */
	organizationId: string;

	/** Customer name */
	name: string;

	/** Customer email */
	email?: string;

	/** Customer 8-digit phone number */
	phone?: string;
}

export interface GetPaymentStatusParams {
	paymentId: string;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type GetPaymentStatusResult = {
	organizationId: string;
	leaseInvoiceId: string;
	isPaid: boolean;
	paymentId: string;
	/** Raw json response from myfatoorah `/v2/GetPaymentStatus` */
	json: Json;
};

/** Shape of the invoice data object to be sent to myfatoorah */
export interface MyfatoorahInvoiceData {
	/** OraganizationId. Used to store our organizationId for easier tracking */
	UserDefinedField: string;

	/** LeaseInvoiceId */
	CustomerReference: string;
	InvoiceValue: number;

	CustomerName: string;
	CustomerEmail?: string;
	/** 8-digit phone number */
	CustomerMobile?: string;

	CallBackUrl: string;
}
