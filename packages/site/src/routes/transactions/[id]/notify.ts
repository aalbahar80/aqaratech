import { Reminder } from '$lib/models/classes/reminder.class';
import { z, ZodError } from 'zod';
import type { RequestHandler } from './__types/notify';

/**
 * Sends a payment link to tenant.
 */
export const post: RequestHandler = async ({ params, request }) => {
	try {
		const body = await request.json();
		const Options = z.object({
			mode: z.enum(['email', 'sms']),
		});
		const { mode } = Options.parse(body);

		const reminder = new Reminder(params.id);

		let result: any;
		if (mode === 'email') {
			result = await reminder.sendEmail();
		} else if (mode === 'sms') {
			result = await reminder.sendSms();
		}
		return {
			status: 200,
			body: JSON.stringify(result),
		};
	} catch (e) {
		console.error(e);
		return {
			status: 500,
			body: {
				error:
					e instanceof ZodError ? JSON.parse(e.toString()) : 'Unknown error',
			},
		};
	}
};
