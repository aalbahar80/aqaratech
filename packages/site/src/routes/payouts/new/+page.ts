import type { PredefinedPayout } from '$lib/models/interfaces/predefined.interface';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url: { searchParams } }) => {
	const predefined: PredefinedPayout = {
		portfolioId: searchParams.get('portfolioId'),
	};

	if (!predefined.portfolioId) {
		throw error(400, {
			code: '400',
			message: 'Insufficient parameters',
		});
	}

	return { predefined };
};
