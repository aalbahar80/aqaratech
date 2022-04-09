import {
	defineQuery,
	proxyActivities,
	setHandler,
	sleep,
} from '@temporalio/workflow';
import { addDays, differenceInMilliseconds } from 'date-fns';
import type * as activities from './activities';

async function sleepUntil(futureDate: string | Date, fromDate = new Date()) {
	const timeUntilDate = differenceInMilliseconds(
		new Date(futureDate),
		fromDate,
	);
	return sleep(timeUntilDate);
}

const acts = proxyActivities<ReturnType<typeof activities['createActivities']>>(
	{
		// TODO increase timeout
		startToCloseTimeout: '1 minute',
	},
);

export const getNextReminder = defineQuery<string>('getNextReminder');

export async function trxNotificationWF(trxId: string) {
	const originalTrx = await acts.getTrx(trxId);

	let nextReminder = new Date(originalTrx.dueDate);
	setHandler(getNextReminder, () => nextReminder.toISOString());
	await prepareNextReminder(trxId, nextReminder);

	for (let count = 0; count < 4; count++) {
		try {
			const trx = await acts.getTrx(trxId);
			if (trx.isPaid) {
				console.log('Transaction paid. Stopping workflow.');
				return trx;
			}
			if (trx.lease.shouldNotify && trx.lease.active) {
				await acts.notify(trxId);
			} else {
				console.log(
					'Either lease is not active or shouldNotify is false. Skipping notification.',
					trx,
				);
			}
			nextReminder = addDays(nextReminder, 2);
			await prepareNextReminder(trxId, nextReminder);
		} catch (e) {
			console.error('Error refreshing trx: ', e);
		}
	}
	console.log('Done.');
	return;
}

async function prepareNextReminder(id: string, nextReminder: Date) {
	await acts.setReminderAt(id, nextReminder.toISOString());
	console.log(`Sleeping until ${nextReminder}`);
	await sleepUntil(nextReminder);
}
