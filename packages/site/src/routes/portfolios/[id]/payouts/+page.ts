import { parseParams } from '$lib/utils/parse-params';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({
	params,
	url: { searchParams },
	parent,
}) => {
	const parentStuff = await parent();

	const { page, take, sortOrder, orderBy } = parseParams(searchParams);
	const payouts = await parentStuff.api.portfolios.findPayouts({
		page,
		take,
		sortOrder,
		orderBy,
		id: params.id,
	});

	return { payouts };
};
