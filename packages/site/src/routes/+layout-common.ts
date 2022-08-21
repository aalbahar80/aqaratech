import { api } from '$lib/client/api';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad.common = async ({ fetch, data }) => {
	const apiClient = api({
		loadFetch: fetch,
		token: data.accessToken,
		roleId: data.user?.role?.id,
	});
	return {
		api: apiClient,
		...data,
		apiConfig: {
			token: data.accessToken,
			roleId: data.user?.role?.id,
		},
	};
};
