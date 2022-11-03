import type { GetRouteInput } from '$lib/utils/route-helpers/route-helpers.type';
import { z } from 'zod';

export const getPortfolioRoute = (params: GetRouteInput['params']): string => {
	const { organizationId, portfolioId } = schema.parse(params);

	return `/organizations/${organizationId}/portfolios/${portfolioId}`;
};

const schema = z.object({
	organizationId: z.string(),
	portfolioId: z.string(),
});
