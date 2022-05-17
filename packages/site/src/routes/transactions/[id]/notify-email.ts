import { Reminder } from '$lib/models/classes/reminder.class';
import type { RequestHandler } from './notify-email.d';

/**
 * Sends a payment link to tenant.
 */
export const post: RequestHandler = async ({ params }) => {
	try {
		const reminder = new Reminder(params.id);
		const info = await reminder.sendEmail();
		return {
			status: 200,
			body: JSON.stringify(info),
		};
	} catch (e) {
		console.error(e);
		return {
			status: 500,
			body: e instanceof Error ? e.message : '',
		};
	}
};
