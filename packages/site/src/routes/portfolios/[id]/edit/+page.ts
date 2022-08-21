import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
	const parentStuff = await parent();

	const portfolio = await parentStuff.api!.portfolios.findOne({
		id: params.id,
	});

	return { portfolio };
};
