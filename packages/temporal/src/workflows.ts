import {
	defineQuery,
	proxyActivities,
	setHandler,
	sleep,
} from "@temporalio/workflow";
import { addDays, differenceInMilliseconds } from "date-fns";
import type * as activities from "./activities";

async function sleepUntil({
	futureDate,
	fromDate = new Date(),
	timeMultiplier = 1,
}: {
	futureDate: string | Date;
	fromDate?: Date;
	timeMultiplier?: number;
}) {
	const timeUntilDate = differenceInMilliseconds(
		new Date(futureDate),
		fromDate
	);
	return sleep(timeUntilDate * timeMultiplier);
}

const acts = proxyActivities<ReturnType<typeof activities["createActivities"]>>(
	{
		// TODO increase timeout
		startToCloseTimeout: "1 minute",
		// scheduleToCloseTimeout: "1000000",
	}
);

export const getNextReminder = defineQuery<string>("getNextReminder");

export async function trxNotificationWF(trxId: string, timeMultiplier = 1) {
	const notifications = [];
	const originalTrx = await acts.getTrx(trxId);

	let nextReminder = new Date(originalTrx.postAt);
	setHandler(getNextReminder, () => nextReminder.toISOString());
	await prepareNextReminder({ id: trxId, nextReminder, timeMultiplier });

	for (let count = 0; count < 4; count++) {
		try {
			const trx = await acts.getTrx(trxId);
			if (trx.isPaid) {
				console.log("Transaction paid. Stopping workflow.");
				return notifications;
			}
			if (trx.lease.shouldNotify && trx.lease.active) {
				const notification = await acts.notify(trxId);
				notifications.push(notification);
			} else {
				console.log(
					"Either lease is not active or shouldNotify is false. Skipping notification.",
					trx
				);
			}
			nextReminder = addDays(nextReminder, 2);
			await prepareNextReminder({ id: trxId, nextReminder, timeMultiplier });
		} catch (e) {
			console.error("Error refreshing trx: ", e);
		}
	}
	console.log("Done.");
	console.log({ notifications }, "workflows.ts ~ 67");
	return notifications;
}

async function prepareNextReminder({
	id,
	nextReminder,
	timeMultiplier = 1,
}: {
	id: string;
	nextReminder: Date;
	timeMultiplier?: number;
}) {
	await acts.setReminderAt(id, nextReminder.toISOString());
	console.log(`Sleeping until ${nextReminder}`);
	await sleepUntil({ futureDate: nextReminder, timeMultiplier });
}
