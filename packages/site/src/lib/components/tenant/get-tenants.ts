import { createApi } from '$api';
import { tenantsToOptions } from '$lib/components/form/inputs/to-options';

export const searchTenants = async (query: string) => {
	const tenants = await createApi().tenants.findAll({
		filter: { fullName: { contains: query, mode: 'insensitive' } },
		take: 50,
	});

	const options = tenantsToOptions(tenants);

	return options;
};
