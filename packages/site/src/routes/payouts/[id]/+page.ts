import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
	const id = params.id;

	const parentStuff = await parent();

	const payout = await parentStuff.api.payouts.findOne({ id });

	return {
		payout,
	};
};
