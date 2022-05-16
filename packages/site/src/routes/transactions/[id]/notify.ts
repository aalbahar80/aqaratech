import { environment } from '$environment';
import prismaClient from '$lib/server/prismaClient';
import type { RequestHandler } from './notify.d';

const {
	twilioConfig: {
		TWILIO_ACCOUNT_SID,
		TWILIO_AUTH_TOKEN,
		TWILIO_MESSAGING_SERVICE_SID,
	},
	callbackDomain,
} = environment;

export const post: RequestHandler = async ({ params }) => {
	try {
		const trxId = params.id;
		const trx = await prismaClient.transaction.findUnique({
			where: { id: trxId },
			select: {
				lease: {
					select: {
						tenant: {
							select: {
								phone: true,
							},
						},
					},
				},
			},
			rejectOnNotFound: true,
		});
		const phone = trx.lease.tenant.phone;
		if (!phone) {
			throw new Error('Missing phone number');
		}
		console.log(`Notifying ${trxId}...`);

		const paymentUrl = `${callbackDomain}/p/transactions/${trxId}`;

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
					Body:
						'Your rent is due! \n Please use this link to pay: \n' + paymentUrl,
					MessagingServiceSid: TWILIO_MESSAGING_SERVICE_SID,
					// From: '+15005550006',
					To: phone, // TODO: normalize phone number
				}),
			},
		);
		const sms = await res.json();
		console.log({ sms }, 'notify.ts ~ 64');
		return {
			status: 200,
			body: { sms },
		};
	} catch (e) {
		console.error(e);
		if (e instanceof Error) {
			return {
				status: 500,
				body: {
					message: e.message,
				},
			};
		} else {
			return {
				status: 500,
				body: {
					message: 'Unknown error',
				},
			};
		}
	}
};
