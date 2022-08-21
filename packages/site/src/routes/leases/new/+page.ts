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
	const [portfolios, properties, units, tenants] = await Promise.all([
		parentStuff.api.portfolios.findAll({ take: 1000 }),
		parentStuff.api.properties.findAll({ take: 1000 }),
		parentStuff.api.units.findAll({ take: 1000 }),
		parentStuff.api.tenants.findAll({ take: 1000 }),
	]);

	return { portfolios, properties, units, tenants, predefined };
};
