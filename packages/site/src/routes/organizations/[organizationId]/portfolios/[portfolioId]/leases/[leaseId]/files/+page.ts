import { createApi } from '$api';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const api = createApi(fetch);

	const files = await api.files.findAll({
		relationKey: 'lease',
		relationValue: params.leaseId,
	});

	return {
		files,
	};
};
