import type { PredefinedLease } from '$lib/models/interfaces/predefined.interface';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url: { searchParams }, parent }) => {
	const predefined: PredefinedLease = {
		portfolioId: searchParams.get('portfolioId'),
		propertyId: searchParams.get('propertyId'),
		unitId: searchParams.get('unitId'),
		tenantId: searchParams.get('tenantId'),
	};

	const parentStuff = await parent();
	const [tenants, portfolios, properties, units] = await Promise.all([
		parentStuff.api.tenants.findAll({ take: 1000 }),
		parentStuff.api.portfolios.findAll({ take: 1000 }),

		predefined.portfolioId
			? parentStuff.api.portfolios.findProperties({
					id: predefined.portfolioId,
					take: 1000,
			  })
			: undefined,

		predefined.propertyId
			? parentStuff.api.properties.findUnits({
					id: predefined.propertyId,
					take: 1000,
			  })
			: undefined,
	]);

	return { predefined, tenants, portfolios, properties, units };
};
