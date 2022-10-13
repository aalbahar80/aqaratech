import type { LayoutServerLoad } from './$types';

// eslint-disable-next-line @typescript-eslint/require-await
export const load: LayoutServerLoad = async ({ locals }) => {
	return {
		user: locals.user,
	};
};
