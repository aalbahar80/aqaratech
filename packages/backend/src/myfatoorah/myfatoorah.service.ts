/// <reference lib="dom" />

import {
	BadRequestException,
	Inject,
	Injectable,
	LoggerService,
} from '@nestjs/common';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { jsonSchema } from '@self/utils';
import { EnvService } from 'src/env/env.service';

import { MYFATOORAH_CALLBACK_PATHNAME } from './myfatoorah-callback.const';
import {
	myfatoorahExecutePaymentSchema,
	myfatoorahGetPaymentStatusSchema,
} from './types/myfatoorah-response.schema';
import {
	CreatePaymentLinkParams,
	GetPaymentStatusParams,
	GetPaymentStatusResult,
	MyfatoorahInvoiceData,
} from './types/myfatoorah.types';
import { MF_PAY_METHOD } from './types/pay-method.enum';

@Injectable()
export class MyfatoorahService {
	constructor(
		private readonly env: EnvService,
		@Inject(WINSTON_MODULE_NEST_PROVIDER)
		private readonly logger: LoggerService,
		// @ts-expect-error until update to ts 5.0
		@InjectSentry() private readonly sentry: SentryService,
	) {
		this.EXECUTE_PAYMENT_URL = `${this.env.e.MYFATOORAH_URL}/v2/ExecutePayment`;
		this.GET_PAYMENT_STATUS_URL = `${this.env.e.MYFATOORAH_URL}/v2/GetPaymentStatus`;
		this.HEADERS = {
			Authorization: `Bearer ${this.env.e.MYFATOORAH_KEY}`,
			'Content-Type': 'application/json',
		};
	}

	HEADERS: Record<string, string>;
	EXECUTE_PAYMENT_URL: string;
	GET_PAYMENT_STATUS_URL: string;

	async createPaymentLink(params: CreatePaymentLinkParams) {
		const isAuthorized = this.isAuthorized({
			organizationId: params.organizationId,
		});

		if (!isAuthorized) {
			throw new BadRequestException(
				'Myfatoorah integration is not enabled for this organization',
				{
					// @ts-expect-error valid type
					cause: params,
				},
			);
		}

		this.logger.log({
			level: 'debug',
			message: 'Creating payment link',
			params,
		});

		const body = {
			PaymentMethodId: MF_PAY_METHOD.KNET,
			...this.toMyfatoorahObject(params),
		};

		const req = new Request(this.EXECUTE_PAYMENT_URL, {
			method: 'POST',
			headers: this.HEADERS,
			body: JSON.stringify(body),
		});

		const res = await fetch(req);

		const json: unknown = await res.json();

		if (!res.ok) {
			throw new Error('Failed to create payment link', {
				cause: {
					params,
					req: {
						method: req.method,
						url: req.url,
						body,
					},
					res: json,
				},
			});
		}

		this.logger.log({
			level: 'debug',
			message: 'Created payment link',
			json,
		});

		const data = myfatoorahExecutePaymentSchema({
			leaseInvoiceId: params.reference,
			organizationId: params.organizationId,
		}).safeParse(json);

		if (!data.success) {
			throw new Error('Failed to parse response from myfatoorah', {
				cause: {
					params,
					req: {
						method: req.method,
						url: req.url,
						body,
					},
					res: json,
				},
			});
		}

		return data.data.Data.PaymentURL;
	}

	/** Gets the payment status from myfatoorah.
	 *  Used to verify callbacks. */
	async getPaymentStatus(params: GetPaymentStatusParams) {
		this.logger.log({
			level: 'debug',
			message: 'Getting payment status',
			params,
		});

		const res = await fetch(this.GET_PAYMENT_STATUS_URL, {
			method: 'POST',
			headers: this.HEADERS,
			body: JSON.stringify({
				Key: params.paymentId,
				KeyType: 'PaymentId',
			}),
		});

		const raw: unknown = await res.json();

		const data = myfatoorahGetPaymentStatusSchema.parse(raw);

		const result = {
			isPaid: data.Data.InvoiceStatus === 'Paid',
			leaseInvoiceId: data.Data.CustomerReference,
			organizationId: data.Data.UserDefinedField,
			paymentId: params.paymentId,
			json: jsonSchema.parse(raw),
		} satisfies GetPaymentStatusResult;

		this.logger.log({
			level: 'debug',
			message: 'Got payment status',
			result,
		});

		return result;
	}

	/** Converts data to the format myfatoorah expects. */
	toMyfatoorahObject(data: CreatePaymentLinkParams) {
		const obj: MyfatoorahInvoiceData = {
			CallBackUrl: data.callbackUrl,
			InvoiceValue: data.amount,
			CustomerReference: data.reference,
			CustomerName: data.name,
			UserDefinedField: data.organizationId,
		} satisfies MyfatoorahInvoiceData;

		if (data.email) {
			obj.CustomerEmail = data.email;
		}

		if (data.phone) {
			obj.CustomerMobile = data.phone;
		}

		return obj;
	}

	/** Myfatoorah prevents us from using localhost as a callback URL. Instead,
	 * we use 127.0.0.1 */
	getCallbackURL() {
		const url = new URL(
			MYFATOORAH_CALLBACK_PATHNAME,
			this.env.e.PUBLIC_API_URL,
		);

		if (url.hostname === 'localhost') {
			url.hostname = '127.0.0.1';
		}

		return url.toString();
	}

	/** Check if an organization is authorized to use myfatoorah. */
	isAuthorized({ organizationId }: { organizationId: string }) {
		if (this.env.e.PUBLIC_AQARATECH_ENV !== 'production') {
			return true;
		}

		const ALLOWED_ORGANIZATIONS = [
			'24726f18-450b-466c-8a74-cc2112889d16', // Altaef
			'74b72ca5-72f8-48e3-a995-6ad299400b54', // Aqaratech
		];

		return ALLOWED_ORGANIZATIONS.includes(organizationId);
	}

	// TODO: how to get correct invoice URL?
	// 'https://demo.myfatoorah.com/En/KWT/PayInvoice/Details/01072121063737';
	// 'https://demo.myfatoorah.com/En/KWT/PayInvoice/Result?paymentId=100202210635345720';
}
