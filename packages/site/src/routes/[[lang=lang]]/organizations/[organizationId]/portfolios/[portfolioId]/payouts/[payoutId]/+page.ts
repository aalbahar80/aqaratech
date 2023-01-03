import type { PageLoad } from './$types';

import { createApi } from '$api';

export const load: PageLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	const payout = await api.payouts.findOne({ id: params.payoutId });

	return {
		payout,
	};
};
