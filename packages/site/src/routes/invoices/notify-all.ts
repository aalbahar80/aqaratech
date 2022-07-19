import { Reminder } from '$lib/models/classes/reminder.class';
import { eligibleTrxs } from '$lib/server/cron/blast-sms';
import { validateAccessToken } from '$lib/server/utils/validate';
import { strToDate } from '$lib/zodTransformers';
import type { RequestHandler } from '@sveltejs/kit';
import { z, ZodError } from 'zod';

/**
 * Grabs eligible transactions and sends them a payment reminder.
 * @augments mode: `sms` or `email`
 * @augments duration: How many days before `rangeEnd` to to consider a transaction eligible.
 * @augments rangeEnd: The end of the range to consider transactions.
 *
 */
export const POST: RequestHandler = async ({ request }) => {
	try {
		// Validate bearer token
		const authHeader = request.headers.get('authorization');
		const token = authHeader?.split(' ')[1];
		if (!token) {
			return {
				status: 401,
				body: { message: 'Missing bearer token' },
			};
		}
		await validateAccessToken(token, 'accessToken');

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

		const trxs = await eligibleTrxs(duration, rangeEnd);

		const reminders = trxs.map((id) => new Reminder(id));
		console.log({ reminders }, 'notify-all.ts ~ 32');

		const promises = reminders.map((r) =>
			mode === 'sms' ? r.sendSms() : r.sendByEmail(),
		);
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
		const msg =
			e instanceof ZodError
				? JSON.parse(e.toString())
				: e instanceof Error
				? e.message
				: 'Unknown error';
		return {
			status: 500,
			body: {
				error: msg,
			},
		};
	}
};
