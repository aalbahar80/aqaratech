import util from 'util';

import { error, json } from '@sveltejs/kit';
import tier from 'tier';

import { tierid } from '@self/utils';

import type { RequestHandler } from '@sveltejs/kit';

import { assertRole } from '$lib/assertions/user-role';
import { isProd } from '$lib/server/config/is-production';

export const GET: RequestHandler = async (event) => {
	if (isProd) {
		throw error(404);
	}

	assertRole(event.locals.user);

	const id = tierid(event.locals.user.role.organizationId);
	const feature = 'feature:unit';

	// await tier.report(id, feature, 3000);

	const can = tier.can(id, feature);
	const limit = tier.lookupLimit(id, feature);
	const limits = tier.lookupLimits(id);
	const phase = tier.lookupPhase(id);
	const lookupOrg = tier.lookupOrg(id);
	const whois = tier.whois(id);

	const promises = [
		[can, 'can'],
		[limit, 'limit'],
		[limits, 'limits'],
		[phase, 'phase'],
		[lookupOrg, 'lookupOrg'],
		[whois, 'whois'],
	] as const;

	// await all then print them using util.inspect. use promise.settled to catch errors.
	const results = await Promise.allSettled(
		promises.map(
			async ([promise, name]) =>
				await promise
					.then((value) => ({ name, status: 'fulfilled', value }))
					.catch((error: unknown) => ({
						name,
						status: 'rejected',
						error,
					})),
		),
	);

	console.log(util.inspect(results, { colors: true, depth: 10 }));

	return json(results);
};
