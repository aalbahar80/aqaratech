import { parseParams } from '$lib/utils/parse-params';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url: { searchParams }, parent }) => {
	const parentStuff = await parent();

	const { page, take, sortOrder, orderBy } = parseParams(searchParams);
	const payouts = await parentStuff.api.payouts.findAll({
		page,
		take,
		sortOrder,
		orderBy,
	});

	return { payouts };
};
