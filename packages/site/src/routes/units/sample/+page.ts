import { fancy } from '$lib/client/ho-load';
import type { PageLoad } from './$types';

export const load: PageLoad = fancy(async ({ api }) => {
	const units = await api.units.findAll();
	return { units };
});
