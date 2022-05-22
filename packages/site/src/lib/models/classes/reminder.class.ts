import { environment } from '$lib/environment';
import prismaClient from '$lib/server/prismaClient';
import { kwdFormat } from '$lib/utils/common';
import { format } from 'date-fns';

const {
	urlOrigin,
	twilioConfig: { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER },
} = environment;

interface EmailModel {
	trxUrl: string;
	name: string;
	amount: string;
	date: string;
}

export class Reminder {
	constructor(
		public trxId: string,
		public phone?: string | null,
		public email?: string | null,
		public emailModel?: EmailModel | null,
	) {}

	async sendSms() {
		if (!this.phone) {
			await this.getContactInfo();
		}
		if (this.phone) {
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
						Body: this.url,
						// MessagingServiceSid: TWILIO_MESSAGING_SERVICE_SID,
						From: TWILIO_FROM_NUMBER,
						To: this.phone,
					}),
				},
			);
			const sms = await res.json();
			console.log(sms);
			return sms;
		} else {
			throw new Error('No phone number');
		}
	}

	async sendEmail() {
		if (!this.email) {
			await this.getContactInfo();
		}
		if (this.email) {
			// handle res.ok/notok
			const res = await fetch(
				'https://api.postmarkapp.com/email/withTemplate',
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						'X-Postmark-Server-Token': 'cd6245ee-08c5-44ff-bfe0-5e4c4361ab70',
					},
					body: JSON.stringify({
						From: 'Aqaratech <notifications@aqaratech.com>',
						// To: this.email,
						To: 'dev@aqaratech.com',
						TemplateAlias: 'invoice',
						TemplateModel: this.getEmailModel(),
					}),
				},
			);
			const data = await res.json();
			console.log(data);
			if (data.Message === 'OK') {
				return true;
			} else {
				return false;
			}
		} else {
			throw new Error('No email');
		}
	}

	public get url(): string {
		return `${urlOrigin}/p/transactions/${this.trxId}`;
	}

	get body(): string {
		return `Please use this link to pay your monthly rent: \n ${this.url}`;
	}

	getEmailModel() {
		if (!this.emailModel) {
			const trx = {
				id: 'a1145396-0e06-4e26-8891-e0ee0ec97902',
				amount: 2826,
				postAt: new Date(),
				// address: '' // TODO: add
			};
			const body = {
				name: 'John Doe',
				amount: kwdFormat(trx.amount),
				date: format(trx.postAt, 'MMM yyyy'),
				trxUrl: this.url,
			};
			this.emailModel = body;
		}
		return this.emailModel;
	}

	private async getContactInfo() {
		try {
			if (!this.email || !this.phone) {
				const trx = await prismaClient.transaction.findUnique({
					where: { id: this.trxId },
					select: {
						lease: {
							select: {
								tenant: {
									select: {
										phone: true,
										email: true,
									},
								},
							},
						},
					},
					rejectOnNotFound: true,
				});
				this.email = trx.lease.tenant.email;
				this.phone = trx.lease.tenant.phone;
			}
		} catch (e) {
			console.error(e);
		}
	}
}
