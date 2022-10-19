import { createApi } from '$api';
import { parseParams } from '$lib/utils/parse-params';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({
	params,
	url: { searchParams },
	fetch,
}) => {
	const api = createApi(fetch);

	const { page, take, sortOrder, orderBy } = parseParams(searchParams);
	const payouts = await api.portfolios.findPayouts({
		page,
		take,
		sortOrder,
		orderBy,
		id: params.id,
	});

	return { payouts };
};
