import { hasFileSupport } from '$lib/utils/file';

import type { PageLoad } from './$types';
export const load: PageLoad = async ({ url: { searchParams } }) => {
	const relationKey = searchParams.get('relationKey');
	const relationValue = searchParams.get('relationValue');

	if (!relationKey || !relationValue) {
		throw new Error('Insufficient URL parameters');
	}

	if (!hasFileSupport(relationKey)) {
		throw new Error('Invalid URL parameters');
	}

	return { relationKey, relationValue };
};
