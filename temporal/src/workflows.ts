import {
	proxyActivities,
	setHandler,
	condition,
	defineQuery,
	defineSignal,
} from '@temporalio/workflow';
import type * as activities from './activities';
import type { Customer } from './types';

const acts = proxyActivities<ReturnType<typeof activities['createActivities']>>(
	{
		startToCloseTimeout: '1 minute',
	},
);
export async function dependencyWF(): Promise<string> {
	const english = await acts.greet('Hello');
	const spanish = await acts.greet_es('Hola');
	return `${english}\n${spanish}`;
}
// add type
export const cancelSubscription = defineSignal('cancelSignal');
export const hike = defineSignal<number[]>('hike');
export const getBp = defineQuery<number>('bpVal');
export const getCustomer = defineQuery<Customer>('getCustomer');

export async function SubscriptionWorkflow(customer: Customer) {
	let trialCancelled = false;
	setHandler(cancelSubscription, () => void (trialCancelled = true));
	setHandler(
		hike,
		(newPrice) => void (customer.billingPeriodCharge = newPrice),
	);
	setHandler(getCustomer, () => customer);

	// sendWelcome
	await acts.sendWelcomeEmail(customer);

	if (await condition(() => trialCancelled, customer.trialPeriod)) {
		// cancelled
		await acts.sendCancellationEmailDuringTrialPeriod(customer);
	} else {
		// trial ended
		await billingCycle(customer);
	}
}

async function billingCycle(customer: Customer) {
	let isCancelled = false;
	setHandler(cancelSubscription, () => void (isCancelled = true));

	await acts.chargeCustomerForBillingPeriod(
		customer,
		customer.initialBillingPeriodCharge,
	);
	for (let bp = 0; bp < customer.maxBillingPeriods; bp++) {
		setHandler(getBp, () => bp);

		if (await condition(() => isCancelled, customer.billingPeriod)) {
			// cancelled
			await acts.sendCancellationEmailDuringActiveSubscription(customer);
			break;
		} else {
			await acts.chargeCustomerForBillingPeriod(
				customer,
				customer.billingPeriodCharge,
			);
		}
	}

	if (!isCancelled) await acts.sendSubscriptionOverEmail(customer);
}
