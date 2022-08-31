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

	const [portfolio, properties, roles, balance] = await Promise.all([
		parentStuff.api!.portfolios.findOne({ id }),
		parentStuff.api!.portfolios.findProperties({ id, ...sParams }),
		// TODO handle pagination & default limit
		parentStuff.api!.portfolios.findRoles({ id }),
		// TODO handle pagination & default limit
		parentStuff.api!.portfolios.getBalance({ id }),
	]);

	return { portfolio, properties, roles, balance };
};
