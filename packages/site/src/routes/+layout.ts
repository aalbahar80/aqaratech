import { api } from '$api';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, data }) => {
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
