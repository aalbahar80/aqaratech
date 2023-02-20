import { inspect } from 'node:util';

import { redirect } from '@sveltejs/kit';
import Stripe from 'stripe';
import tier, { isTierError } from 'tier';

import type { Actions, PageServerLoad } from './$types';
import { tierid } from '@self/utils';

import { createApi } from '$api';
import { assertRole } from '$lib/assertions/user-role';
import { environment } from '$lib/environment';
import { privateEnvironment } from '$lib/server/config/private-environment';
import { logger } from '$lib/server/logger';

export const load: PageServerLoad = async ({ locals: { user }, fetch }) => {
	assertRole(user);

	const id = tierid(user.role.organizationId);
	let existsInStripe = true;

	// If organization.isActive is false, fetch the latest subscription status using
	// tier, as it may have been reactivated.

	if (!user.role.organization.isActive) {
		const active = await tier.can(id, 'feature:unit').catch(() => null);

		// eslint-disable-next-line @typescript-eslint/prefer-optional-chain
		if (active !== null && active.ok && !active.err) {
			// This means that the organization has been reactivated since the last
			// time we checked. We should update the organization's status in the
			// database.
			await createApi(fetch).organizations.statusRefresh({ id });
		}
	}

	const phase = await tier.lookupPhase(id).catch((e) => {
		if (isTierError(e) && e.code === 'org_not_found') {
			existsInStripe = false;
		}

		return null;
	});

	return { existsInStripe, tierData: { phase } };
};

export const actions: Actions = {
	unsubscribe: async (event) => {
		assertRole(event.locals.user);

		const role = event.locals.user.role;

		logger.info('unsubscribe', {
			message: JSON.stringify({
				user: { id: event.locals.user.id, email: role.email },
				organization: role.organization,
			}),
		});

		try {
			const c = await tier.cancel(tierid(role.organizationId));

			logger.info('unsubscribed', {
				message: JSON.stringify(c),
			});
		} catch (e) {
			logger.error(e);

			if (isTierError(e)) {
				console.log(inspect(e, false, null, true));
			}
		}

		// WARN: reload page/data
	},

	// Redirect to stripe checkout to enter card details and resubscribe.
	resubscribe: async (event) => {
		assertRole(event.locals.user);

		const role = event.locals.user.role;

		const checkout = await tier.checkout(
			tierid(role.organizationId),
			event.url.toString(),
			{
				features: environment.PUBLIC_TIER_PLAN_ID_1,
			},
		);

		throw redirect(303, checkout.url);
	},

	// Redirect to stripe billing portal for managing payment methods and viewing
	// invoices.
	manage: async (event) => {
		assertRole(event.locals.user);

		const role = event.locals.user.role;

		// Init stripe
		const stripe = new Stripe(privateEnvironment.STRIPE_API_KEY, {
			typescript: true,
			apiVersion: '2022-11-15',
		});

		// Get CUSTOMER_ID
		const whois = await tier.whois(tierid(role.organizationId));

		// TODO: Handle renewing expired subscriptions
		const session = await stripe.billingPortal.sessions.create({
			customer: whois.stripe_id,
			return_url: event.url.toString(),
		});

		const location = session.url;

		if (location) {
			throw redirect(303, location);
		} else {
			throw new Error('Stripe session url not available');
		}
	},
};
