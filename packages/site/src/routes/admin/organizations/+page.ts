import { fancy } from '$lib/client/ho-load';
import type { PageLoad } from './$types';

export const load: PageLoad = fancy(async ({ api }) => {
	const organizations = await api.organizations.findAll();
	return { organizations };
});
