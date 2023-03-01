import type { PageLoad } from './$types';

import { createApi } from '$api';

export const load: PageLoad = async ({ fetch, params }) => {
	const api = createApi(fetch);

	const files = await api.files.findAll({
		relationKey: 'lease',
		relationValue: params.leaseId,
		organizationId: params.organizationId,
	});

	return {
		files,
	};
};
