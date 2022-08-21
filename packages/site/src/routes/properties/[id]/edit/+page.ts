import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
	const parentStuff = await parent();
	const property = await parentStuff.api!.properties.findOne({ id: params.id });

	return { property };
};
