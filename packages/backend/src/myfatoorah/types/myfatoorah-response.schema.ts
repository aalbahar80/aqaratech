import { z } from 'zod';

/**
 * The response from myfatoorah when requesting a payment URL.
 * `/v2/ExecutePayment`
 *
 * Sample response:
 *
 * ```
 * {
 * 	"IsSuccess": true,
 * 	"Message": "Invoice Created Successfully!",
 * 	"ValidationErrors": null,
 * 	"Data": {
 * 		"InvoiceId": 2004851,
 * 		"IsDirectPayment": false,
 * 		"PaymentURL": "https://demo.MyFatoorah.com/En/KWT/PayInvoice/Checkout?invoiceKey=01072200485140&paymentGatewayId=20",
 * 		"CustomerReference": "id123",
 * 		"UserDefinedField": null,
 * 		"RecurringId": ""
 * 	}
 * }
 * ```
 */
export const myfatoorahExecutePaymentSchema = ({
	organizationId,
	leaseInvoiceId,
}: {
	organizationId: string;
	leaseInvoiceId: string;
}) =>
	z.object({
		Data: z.object({
			PaymentURL: z.string().url(),

			// Verify our reference id's are present
			UserDefinedField: z.literal(organizationId),
			CustomerReference: z.literal(leaseInvoiceId),
		}),
	});

/**
 * The response from myfatoorah when requesting a payment status.
 * `/v2/GetPaymentStatus`
 *
 * Sample response:
 *
 * ```
 * {
 * 	"IsSuccess": true,
 * 	"Message": "",
 * 	"ValidationErrors": null,
 * 	"Data": {
 * 		"InvoiceId": 2004851,
 * 		"InvoiceStatus": "Pending",
 * 		"InvoiceReference": "2023034203",
 * 		"CustomerReference": "id123",
 * 		"CreatedDate": "2023-01-24T21:03:09.49",
 * 		"ExpiryDate": "January 27, 2023",
 * 		"ExpiryTime": "21:03:09.490",
 * 		"InvoiceValue": 100,
 * 		"Comments": null,
 * 		"CustomerName": "test",
 * 		"CustomerMobile": "+965",
 * 		"CustomerEmail": null,
 * 		"UserDefinedField": null,
 * 		"InvoiceDisplayValue": "100.000 KD",
 * 		"DueDeposit": 0,
 * 		"DepositStatus": "Not Deposited",
 * 		"InvoiceItems": [],
 * 		"InvoiceTransactions": [
 * 			{
 * 				"TransactionDate": "2023-01-24T21:14:04.8233333",
 * 				"PaymentGateway": "KNET",
 * 				"ReferenceId": "07072004851143379071",
 * 				"TrackId": "24-01-2023_1433790",
 * 				"TransactionId": "07072004851143379071",
 * 				"PaymentId": "07072004851143379071",
 * 				"AuthorizationId": "07072004851143379071",
 * 				"TransactionStatus": "InProgress",
 * 				"TransationValue": "100.000",
 * 				"CustomerServiceCharge": "0.000",
 * 				"TotalServiceCharge": "2.000",
 * 				"DueValue": "100.000",
 * 				"PaidCurrency": "KD",
 * 				"PaidCurrencyValue": "100.000",
 * 				"IpAddress": "188.236.117.199",
 * 				"Country": "Kuwait",
 * 				"Currency": "KD",
 * 				"Error": null,
 * 				"CardNumber": null,
 * 				"ErrorCode": ""
 * 			}
 * 		],
 * 		"Suppliers": []
 * 	}
 * }
 * ```
 */
export const myfatoorahGetPaymentStatusSchema = z.object({
	Data: z.object({
		InvoiceId: z.number(),
		CustomerReference: z.string(),
		InvoiceStatus: z.string(),
		UserDefinedField: z.string().uuid(),
	}),
});
