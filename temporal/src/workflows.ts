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

	let isCancelled = false;
	setHandler(cancelLease, () => {
		isCancelled = true;
	});

	let isNotify = true;

	// get the date of the 1st day of the next month
	const start = new Date(lease.start);
	const nextMonth = new Date(start.getFullYear(), start.getMonth() + 1, 1);
	console.log('nextMonth: ', nextMonth);

	// sleepUntil(nextMonth);

	for (let bp = 0; bp < 2; bp++) {
		setHandler(getBillingPeriod, () => bp);

		// TODO change to 1 month
		if (await condition(() => isCancelled, 5000)) {
			// cancelled
			break;
		} else {
			const dueDate = addMonths(nextMonth, bp);
			const trx = await acts.generateTransaction(lease, dueDate.toISOString());
			let isPaid = trx.isPaid;
			let reminderCount = 0;

			while (isNotify && !isPaid && reminderCount < 3) {
				console.log('Reminder Count: ', reminderCount);
				await acts.notify(trx.id);
				reminderCount++;
				await sleep(1000);
				// TODO add notifications to lease model
				// ({ isPaid, notify } = await acts.getTrx(trx.id));
				({ isPaid } = await acts.getTrx(trx.id));
			}
		}
	}
}
