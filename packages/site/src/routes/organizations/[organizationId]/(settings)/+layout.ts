import type { LayoutLoad } from './$types';

import { createApi } from '$api';

export const load: LayoutLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	const id = params.organizationId;

	const organization = await api.organizations.findOne({ id });

	return { organization };
};
