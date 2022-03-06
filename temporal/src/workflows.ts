import * as wf from '@temporalio/workflow';
import * as activities from './activities';
import type { Customer } from './types';

const acts = wf.proxyActivities<typeof activities>({
	startToCloseTimeout: '1 minute',
});

// add type
export const cancelSubscription = wf.defineSignal('cancelSignal');
export const hike = wf.defineSignal<number[]>('hike');
export const getBp = wf.defineQuery<number>('bpVal');
export const getCustomer = wf.defineQuery<Customer>('getCustomer');

export async function SubscriptionWorkflow(customer: Customer) {
	let trialCancelled = false;
	wf.setHandler(cancelSubscription, () => void (trialCancelled = true));
	wf.setHandler(
		hike,
		(newPrice) => void (customer.billingPeriodCharge = newPrice),
	);
	wf.setHandler(getCustomer, () => customer);

	// sendWelcome
	await acts.sendWelcomeEmail(customer);

	if (await wf.condition(() => trialCancelled, customer.trialPeriod)) {
		// cancelled
		await acts.sendCancellationEmailDuringTrialPeriod(customer);
	} else {
		// trial ended
		await billingCycle(customer);
	}
}

async function billingCycle(customer: Customer) {
	let isCancelled = false;
	wf.setHandler(cancelSubscription, () => void (isCancelled = true));

	await acts.chargeCustomerForBillingPeriod(
		customer,
		customer.initialBillingPeriodCharge,
	);
	for (let bp = 0; bp < customer.maxBillingPeriods; bp++) {
		wf.setHandler(getBp, () => bp);

		if (await wf.condition(() => isCancelled, customer.billingPeriod)) {
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
