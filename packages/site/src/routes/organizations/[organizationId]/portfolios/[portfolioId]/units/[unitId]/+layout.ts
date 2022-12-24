import type { LayoutLoad } from './$types';

import { createApi } from '$api';

export const load: LayoutLoad = async ({ fetch, params }) => {
	const { unitId } = params;

	const api = createApi(fetch);

	const unit = await api.units.findOne({ id: unitId });

	return {
		unit,
	};
};
