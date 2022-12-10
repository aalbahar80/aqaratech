import { createApi } from '$api';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	const payout = await api.payouts.findOne({ id: params.payoutId });

	return {
		payout,
	};
};
