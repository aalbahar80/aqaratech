import { environment } from '$lib/environment';
import prismaClient from '$lib/server/prismaClient';
import { createTransport } from 'nodemailer';

const {
	callbackDomain,
	gsuiteConfig: { GSUITE_EMAIL, GSUITE_PASSWORD },
} = environment;

export class Reminder {
	constructor(
		public trxId: string,
		// public url?: string,
		public phone?: string | null,
		public email?: string | null,
	) {}

	async sendSMS() {
		if (!this.email || !this.phone) {
			await this.getContactInfo();
		}
		throw new Error('Method not implemented.');
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
