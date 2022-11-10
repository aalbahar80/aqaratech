import type { GetRoute } from 'src/route-helpers/types/route-helpers.type';
import { z } from 'zod';

export const getOrganizationRoute = (params: GetRoute['params']): string => {
	const { organizationId } = schema
		.pick({ organizationId: true })
		.parse(params);

	return `/organizations/${organizationId}`;
};

export const getPortfolioRoute = (params: GetRoute['params']): string => {
	const organization = getOrganizationRoute(params);

	const { portfolioId } = schema.parse(params);

	return `${organization}/portfolios/${portfolioId}`;
};

const schema = z.object({
	organizationId: z.string(),
	portfolioId: z.string(),
});
