import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data }) => {
	return {
		...data,
		apiConfig: {
			token: data.accessToken,
			roleId: data.user?.role?.id,
		},
	};
};
