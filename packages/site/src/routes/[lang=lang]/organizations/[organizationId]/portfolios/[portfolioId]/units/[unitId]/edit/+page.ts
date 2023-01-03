import type { PageLoad } from './$types';

import { createApi } from '$api';

export const load: PageLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	const unit = await api.units.findOne({ id: params.unitId });

	return { unit };
};
