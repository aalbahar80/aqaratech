import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
	const parentStuff = await parent();
	const unit = await parentStuff.api.units.findOne({ id: params.id });

	return { unit };
};
