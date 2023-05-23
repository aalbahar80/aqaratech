import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals: { user, locale } }) => {
	return {
		user: user,
		locale,
	};
};
