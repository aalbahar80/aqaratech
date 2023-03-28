import type { OrganizationsApiSearchRequest } from '$api/openapi';

import { createApi } from '$api';

export const getSearch = async (options: OrganizationsApiSearchRequest) => {
	const search = await createApi().organizations.search({
		organizationId: options.organizationId,
		query: options.query,
	});

	return search;
};
