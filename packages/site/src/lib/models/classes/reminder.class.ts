import { environment } from '$lib/environment';
import prismaClient from '$lib/server/prismaClient';
import { kwdFormat } from '$lib/utils/common';
import { format } from 'date-fns';

const {
	urlOrigin,
	twilioConfig: { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER },
} = environment;

interface ReminderData {
	email: string | null;
	phone: string | null;
	name: string;
	amount: number;
	date: Date;
}

interface EmailModel {
	email: string;
	name: string;
	amount: string;
	date: string;
	trxUrl: string;
}

export class Reminder {
	constructor(public trxId: string, public data?: ReminderData) {}

	public get trxUrl(): string {
		return `${urlOrigin}/p/transactions/${this.trxId}`;
	}

	async getSmsBody(): Promise<string> {
		const info = await this.getContactInfo();
		return `Use this link to pay your ${format(info.date, 'MMM')} : \n ${
			this.trxUrl
		}`;
	}

	private async getContactInfo() {
		if (!this.data) {
			const trx = await prismaClient.transaction.findUnique({
				where: { id: this.trxId },
				select: {
					amount: true,
					postAt: true,
					lease: {
						select: {
							tenant: {
								select: {
									phone: true,
									email: true,
									firstName: true,
									lastName: true,
								},
							},
						},
					},
				},
				rejectOnNotFound: true, // TODO: reconsider
			});
			this.data = {
				email: trx.lease.tenant.email,
				phone: trx.lease.tenant.phone,
				// amount: kwdFormat(trx.amount),
				// date: format(trx.postAt, 'MMM yyyy'),
				amount: trx.amount,
				date: trx.postAt,
				name: `${trx.lease.tenant.firstName} ${trx.lease.tenant.lastName}`,
			};
		}
		return this.data;
	}

	async sendSms() {
		const info = await this.getContactInfo();
		const smsBody = await this.getSmsBody();
		if (!info.phone) {
			return {
				success: false,
				errorMsg: 'No phone number found',
			};
		}
		const res = await fetch(
			`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
			{
				method: 'POST',
				redirect: 'follow',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: `Basic ${Buffer.from(
						`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`,
					).toString('base64')}`,
				},
				body: new URLSearchParams({
					Body: smsBody,
					// MessagingServiceSid: TWILIO_MESSAGING_SERVICE_SID,
					From: TWILIO_FROM_NUMBER,
					To: info.phone,
				}),
			},
		);
		const sms = await res.json();
		console.log(sms);
		return {
			success: true, // true here refers to fetch not throwing, still need to handle status >= 400
			sms,
			errorMsg: 'No phone number found',
		};
	}

	async sendEmail() {
		// TODO: handle res.ok/notok
		const info = await this.getContactInfo();
		const res = await fetch('https://api.postmarkapp.com/email/withTemplate', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'X-Postmark-Server-Token': 'cd6245ee-08c5-44ff-bfe0-5e4c4361ab70',
			},
			body: JSON.stringify({
				From: 'Aqaratech <notifications@aqaratech.com>',
				To: info.email,
				// To: 'dev@aqaratech.com',
				TemplateAlias: 'invoice',
				TemplateModel: {
					email: info.email,
					phone: info.phone,
					amount: kwdFormat(info.amount),
					date: format(info.date, 'MMM yyyy'),
					name: info.name,
					trxUrl: this.trxUrl,
				} as EmailModel,
			}),
		});
		const data = await res.json();
		console.log(data);
		if (data.Message === 'OK') {
			return {
				success: true,
				data,
			};
		} else {
			return {
				success: false, // true here refers to fetch not throwing, still need to handle status >= 400
				data,
				errorMsg: 'Failed to send email',
			};
		}
	}
}
