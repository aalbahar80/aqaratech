import { createApi } from '$api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	// TODO handle pagination

	const roles = await api.portfolios.findRoles({ id: params.portfolioId });

	return { roles };
};
