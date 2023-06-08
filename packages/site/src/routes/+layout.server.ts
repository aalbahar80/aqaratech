import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals: { user, locale } }) => {
	return {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		user: user!,
		locale,
	};
};
