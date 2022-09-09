import { parseParams } from '$lib/utils/parse-params';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url: { searchParams }, parent }) => {
	const parentStuff = await parent();

	const { page, take } = parseParams(searchParams);
	const portfolios = await parentStuff.api!.portfolios.findAll({
		page,
		take,
	});

	return { portfolios };
};
