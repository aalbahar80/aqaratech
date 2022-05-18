import { Reminder } from '$lib/models/classes/reminder.class';
import { eligibleTrxs } from '$lib/server/cron/blast-sms';
import { strToDate } from '$lib/zodTransformers';
import type { RequestHandler } from '@sveltejs/kit';
import { z, ZodError } from 'zod';

/**
 * Grabs eligible transactions and sends them a sms.
 */
export const post: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const Options = z.object({
			mode: z.enum(['email', 'sms']),
			rangeEnd: z
				.preprocess(strToDate, z.date())
				.optional()
				.default(new Date()),
			duration: z.number().optional().default(20),
		});
		console.log({ body }, 'notify-all.ts ~ 12');
		const { mode, duration, rangeEnd } = Options.parse(body);
		const options = Options.parse(body);
		console.log({ options }, 'notify-all.ts ~ 20');

		let trxs = await eligibleTrxs(duration, rangeEnd);

		// Remove in prod
		trxs = trxs.slice(0, 1);

		const reminders = trxs.map((id) => new Reminder(id));
		console.log({ reminders }, 'notify-all.ts ~ 32');

		const promises = reminders.map((r) => r.sendEmail());
		const results = await Promise.all(promises);
		console.log({ results }, 'notify-all.ts ~ 41');

		return {
			status: 200,
			body: {
				success: true,
				results: JSON.parse(JSON.stringify(results)),
			},
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
