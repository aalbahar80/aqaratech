import type { LayoutLoad } from './$types';

import { getPortfolios } from '$lib/components/portfolio/get-portfolios';

export const load: LayoutLoad = async ({ fetch, parent }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['portfolios'],
		queryFn: async () => await getPortfolios({ fetch }),
	});
};
