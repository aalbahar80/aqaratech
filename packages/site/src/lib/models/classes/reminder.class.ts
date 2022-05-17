import { environment } from '$lib/environment';
import prismaClient from '$lib/server/prismaClient';
import { createTransport } from 'nodemailer';

const {
	callbackDomain,
	gsuiteConfig: { GSUITE_EMAIL, GSUITE_PASSWORD },
	twilioConfig: { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER },
} = environment;

export class Reminder {
	constructor(
		public trxId: string,
		// public url?: string,
		public phone?: string | null,
		public email?: string | null,
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
			console.log({ sms }, 'notify.ts ~ 64');
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
			const transporter = createTransport({
				service: 'gmail',
				auth: {
					user: GSUITE_EMAIL,
					pass: GSUITE_PASSWORD,
				},
			});

			const mailOptions = {
				from: GSUITE_EMAIL,
				to: this.email,
				subject: 'Node test',
				text: this.body,
			};

			const info = await transporter.sendMail(mailOptions);
			console.log({ info }, 'reminder.class.ts ~ 46');
			return info;
		} else {
			throw new Error('No email');
		}
	}

	public get url(): string {
		return `${callbackDomain}/p/transactions/${this.trxId}`;
	}

	get body(): string {
		return `Your rent is due! \n Please use this link to pay: \n ${this.url}`;
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
