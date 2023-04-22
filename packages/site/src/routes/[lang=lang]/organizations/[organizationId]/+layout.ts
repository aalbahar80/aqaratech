import type { LayoutLoad } from './$types';

import { assertRole } from '$lib/assertions/user-role';
import { getPortfolios } from '$lib/components/portfolio/get-portfolios';

export const load: LayoutLoad = async ({ fetch, parent }) => {
	const { queryClient, user } = await parent();

	assertRole(user);

	if (user.role.roleType === 'ORGADMIN') {
		// Used in nav-tree
		await queryClient.prefetchQuery({
			queryKey: ['portfolios'],
			queryFn: async () => await getPortfolios({ fetch }),
			// only for admins
		});
	}
};
