import {
	condition,
	defineQuery,
	defineSignal,
	proxyActivities,
	setHandler,
	sleep,
} from '@temporalio/workflow';
import { addMonths, differenceInMilliseconds } from 'date-fns';
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

export const cancelLease = defineSignal('cancelLeaseSignal');
export const setIsNotify = defineSignal<boolean[]>('setIsNotify');
export const setIsPaid = defineSignal<boolean[]>('setIsPaid');
export const getBillingPeriod = defineQuery<number>('getBillingPeriod');

export async function leaseWF(leaseId: string) {
	const lease = await acts.getLease(leaseId);

	// TODO replace throw with temporalio error or retries
	if (!lease) throw new Error('Lease not found');

	let { active } = lease;

	// get the date of the 1st day of the next month
	const start = new Date(lease.start);
	const nextMonth = new Date(start.getFullYear(), start.getMonth() + 1, 1);
	console.log('nextMonth: ', nextMonth);

	// sleepUntil(nextMonth);

	for (let bp = 0; bp < lease.cycleCount; bp++) {
		setHandler(getBillingPeriod, () => bp);

		// TODO change to 1 month
		if (await condition(() => !active, 5000)) {
			// cancelled
			console.log('Lease no longer active. Stopping workflow.');
			break;
		} else {
			const dueDate = addMonths(nextMonth, bp);
			const trx = await acts.generateTransaction(lease, dueDate.toISOString());
			let isPaid = trx.isPaid;
			let shouldNotify = trx.lease.shouldNotify;
			let reminderCount = 0;

			while (shouldNotify && !isPaid && reminderCount < 3) {
				console.log('Reminder Count: ', reminderCount);
				await acts.notify(trx.id);
				reminderCount++;
				await sleep(1000);
				({
					isPaid,
					lease: { active, shouldNotify },
				} = await acts.getTrx(trx.id));
				// trx = await acts.getTrx(trx.id);
				// isPaid = trx.isPaid;
				// shouldNotify = trx.lease.shouldNotify;
				// active = trx.lease.active;
			}
		}
	}
}

export async function trxNotificationWF(trxId: string) {
	const originalTrx = await acts.getTrx(trxId);

	// TODO change to postDate
	await sleepUntil(originalTrx.dueDate);

	for (let count = 0; count < 4; count++) {
		try {
			const trx = await acts.getTrx(trxId);
			if (trx.isPaid) {
				console.log('Transaction paid. Stopping workflow.');
				return;
			}
			if (trx.lease.shouldNotify && trx.lease.active) {
				await acts.notify(trxId);
			} else {
				console.log(
					'Either lease is not active or shouldNotify is false. Skipping notification.',
					trx,
				);
			}
		} catch (e) {
			console.error('Error refreshing trx: ', e);
		}
		await sleep('5s');
	}
}
