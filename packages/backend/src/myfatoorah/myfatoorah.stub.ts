/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import path from 'node:path';

import JSONdb from 'simple-json-db';
import * as sinon from 'sinon';

import { MyfatoorahService } from './myfatoorah.service';

// Path may be resolved from dist/..
const LEVELDB_PATH = path.resolve(__dirname, '../../../test/downloads/leveldb');

export function createStubMyfatoorah() {
	const myfatoorah = sinon.createStubInstance(MyfatoorahService);

	myfatoorah.createPaymentLink.callsFake(async (params) => {
		console.log({ params });
		// return a url, but add each key/value pair as a query parameter
		const url = new URL('https://stubbed-myfatoorah.com');
		url.searchParams.append('organizationId', params.organizationId);
		url.searchParams.append('invoiceId', params.reference);
		// url.searchParams.append('redirectTo', params.callbackUrl);
		url.searchParams.append('amount', params.amount.toString());
		url.searchParams.append('name', params.name);
		return await Promise.resolve(url.toString());
	});

	// myfatoorah.getPaymentStatus.callsFake(async (params) => {
	// 	// use the `paymentId` as both `paymentId` and `CustomerReference`. Easy to test.
	// 	return await Promise.resolve({
	// 		isPaid: true,
	// 		leaseInvoiceId: params.paymentId,
	// 		paymentId: params.paymentId,
	// 		json: SAMPLE_GET_PAYMENT_STATUS,
	// 	});
	// });

	myfatoorah.getPaymentStatus.callsFake(async (params) => {
		const db = new JSONdb(LEVELDB_PATH);

		// get the value of the key `paymentId` from the db
		// @ts-ignore
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const value = db.get(params.paymentId);

		// @ts-ignore
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return await Promise.resolve(value);
	});
	return myfatoorah;
}

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SAMPLE_EXECUTE_PAYMENT = {
	IsSuccess: true,
	Message: 'Invoice Created Successfully!',
	ValidationErrors: null,
	Data: {
		InvoiceId: 2006790,
		IsDirectPayment: false,
		PaymentURL:
			'https://demo.MyFatoorah.com/En/KWT/PayInvoice/Checkout?invoiceKey=01072200679041&paymentGatewayId=20',
		CustomerReference: '46f58054-a303-4fbe-9e13-5a6485ded537',
		UserDefinedField: null,
		RecurringId: '',
	},
};

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SAMPLE_GET_PAYMENT_STATUS = {
	IsSuccess: true,
	Message: '',
	ValidationErrors: null,
	Data: {
		InvoiceId: 2006790,
		InvoiceStatus: 'Paid',
		InvoiceReference: '2023035841',
		CustomerReference: '46f58054-a303-4fbe-9e13-5a6485ded537',
		CreatedDate: '2023-01-26T04:11:24.103',
		ExpiryDate: 'January 29, 2023',
		ExpiryTime: '04:11:24.103',
		InvoiceValue: 2200,
		Comments: null,
		CustomerName: 'Jalon Nathaniel Nienow',
		CustomerMobile: '+965',
		CustomerEmail: null,
		UserDefinedField: null,
		InvoiceDisplayValue: '2,200.000 KD',
		DueDeposit: 2194.75,
		DepositStatus: 'Not Deposited',
		InvoiceItems: [],
		InvoiceTransactions: [
			{
				TransactionDate: '2023-01-26T04:11:26.4333333',
				PaymentGateway: 'KNET',
				ReferenceId: '302610000046',
				TrackId: '26-01-2023_1434700',
				TransactionId: '202302652257856',
				PaymentId: '100202302647741791',
				AuthorizationId: 'B41175',
				TransactionStatus: 'Succss',
				TransationValue: '2,200.000',
				CustomerServiceCharge: '0.000',
				TotalServiceCharge: '5.000',
				DueValue: '2,200.000',
				PaidCurrency: 'KD',
				PaidCurrencyValue: '2,200.000',
				IpAddress: '188.236.117.199',
				Country: 'Kuwait',
				Currency: 'KD',
				Error: null,
				CardNumber: null,
				ErrorCode: '',
			},
		],
		Suppliers: [],
	},
};
