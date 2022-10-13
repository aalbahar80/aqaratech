import type { PredefinedPayout } from '$lib/models/interfaces/predefined.interface';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

// eslint-disable-next-line @typescript-eslint/require-await
export const load: PageLoad = async ({ url: { searchParams } }) => {
	const predefined: PredefinedPayout = {
		portfolioId: searchParams.get('portfolioId'),
	};

	if (!predefined.portfolioId) {
		throw error(400, {
			status: 400,
			message: 'Insufficient parameters',
		});
	}

	return { predefined };
};
