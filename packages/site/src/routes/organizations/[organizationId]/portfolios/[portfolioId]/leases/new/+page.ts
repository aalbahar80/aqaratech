import { createApi } from '$api';
import type { PredefinedLease } from '$lib/models/interfaces/predefined.interface';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url: { searchParams }, fetch }) => {
	const api = createApi(fetch);
	const predefined: PredefinedLease = {
		portfolioId: searchParams.get('portfolioId'),
		propertyId: searchParams.get('propertyId'),
		unitId: searchParams.get('unitId'),
		tenantId: searchParams.get('tenantId'),
	};

	const [tenants, portfolios, properties, units] = await Promise.all([
		api.tenants.findAll({ take: 1000 }),
		api.portfolios.findAll({ take: 1000 }),

		predefined.portfolioId
			? api.portfolios.findProperties({
					id: predefined.portfolioId,
					take: 1000,
			  })
			: undefined,

		predefined.propertyId
			? api.properties.findUnits({
					id: predefined.propertyId,
					take: 1000,
			  })
			: undefined,
	]);

	return { predefined, tenants, portfolios, properties, units };
};
