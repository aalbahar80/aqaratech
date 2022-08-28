import { parseParams } from '$lib/utils/parse-params';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({
	params,
	url: { searchParams },
	parent,
}) => {
	const parentStuff = await parent();

	const sParams = parseParams(searchParams);
	const id = params.id;

	const [portfolio, properties, roles, payouts, balance] = await Promise.all([
		parentStuff.api!.portfolios.findOne({ id }),
		parentStuff.api!.portfolios.findProperties({ id, ...sParams }),
		// TODO handle pagination & default limit
		parentStuff.api!.portfolios.findRoles({ id }),
		// TODO handle pagination & default limit
		parentStuff.api!.portfolios.findPayouts({ id }),
		parentStuff.api!.portfolios.findBalance({ id }),
	]);

	return { portfolio, properties, roles, payouts, balance };
};
