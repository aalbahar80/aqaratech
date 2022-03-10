import type { RequestHandler } from '@sveltejs/kit';
import Twilio from 'twilio';

// TODO protect this route with _
export const post: RequestHandler = async ({ request }) => {
	const { phone, message, trxId } = await request.json();

	if (
		typeof phone !== 'string' ||
		(typeof message !== 'string' && typeof trxId !== 'string')
	) {
		throw new Error('Missing required params');
	}

	let smsBody = '';
	if (typeof message === 'string') {
		smsBody = message;
	} else if (typeof trxId === 'string') {
		const paymentUrl = `${import.meta.env.VITE_DOMAIN}/p/transactions/${trxId}`;
		smsBody = paymentUrl;
	}
	console.log(`Attempting to send SMS: ${phone} ${smsBody}`);

	const twilioId = import.meta.env.VITE_TWILIO_ACCOUNT_SID;
	const token = import.meta.env.VITE_TWILIO_AUTH_TOKEN;
	const from = import.meta.env.VITE_TWILIO_FROM_NUMBER;
	const twilioClient = Twilio(twilioId, token);

	try {
		const sms = await twilioClient.messages.create({
			to: phone,
			from,
			body: smsBody,
		});
		console.log(sms);
		return {
			status: 200,
			body: {
				success: true,
				message: 'SMS sent successfully',
			},
		};
	} catch (err) {
		console.error(err);
		if (err instanceof Error) {
			return {
				status: 500,
				body: {
					error: err.name,
					// message: err.message,
				},
			};
		}
		return {
			status: 500,
			body: {
				error: 'Unknown error',
				// message: 'Unable to send SMS',
			},
		};
	}
};
